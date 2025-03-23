"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ResourceItem } from "../demo-data"
import { Edit, MinusCircle, PlusCircle } from "lucide-react"

interface ResourceManagementProps {
  resources: ResourceItem[]
  onUpdateResource?: (resource: ResourceItem) => void
  onRequestResource?: (resource: ResourceItem, quantity: number) => void
  filter?: "Supply" | "Equipment" | "Medication" | "Blood" | "Staff" | "All"
}

export function ResourceManagement({
  resources,
  onUpdateResource,
  onRequestResource,
  filter = "All",
}: ResourceManagementProps) {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [requestQuantity, setRequestQuantity] = useState(1)

  const displayedResources = filter === "All" ? resources : resources.filter((resource) => resource.category === filter)

  const handleEditResource = (resource: ResourceItem) => {
    setSelectedResource(resource)
    setIsEditDialogOpen(true)
  }

  const handleUpdateResource = () => {
    if (selectedResource && onUpdateResource) {
      onUpdateResource(selectedResource)
    }
    setIsEditDialogOpen(false)
  }

  const handleRequestResource = (resource: ResourceItem) => {
    setSelectedResource(resource)
    setRequestQuantity(1)
    setIsRequestDialogOpen(true)
  }

  const handleSubmitRequest = () => {
    if (selectedResource && onRequestResource) {
      onRequestResource(selectedResource, requestQuantity)
    }
    setIsRequestDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Adequate":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Limited":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return ""
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Supply":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Equipment":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Medication":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Blood":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "Staff":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
      default:
        return ""
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Resources {filter !== "All" && <Badge className={getCategoryColor(filter)}>{filter}</Badge>}
        </h3>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedResources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No resources found
                </TableCell>
              </TableRow>
            ) : (
              displayedResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.id}</TableCell>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(resource.category)}>{resource.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {resource.available}/{resource.total}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
                  </TableCell>
                  <TableCell>{resource.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditResource(resource)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRequestResource(resource)}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Resource Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
            <DialogDescription>Update the resource information.</DialogDescription>
          </DialogHeader>
          {selectedResource && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedResource.name}
                    onChange={(e) => setSelectedResource({ ...selectedResource, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={selectedResource.category}
                    onValueChange={(value) =>
                      setSelectedResource({
                        ...selectedResource,
                        category: value as "Supply" | "Equipment" | "Medication" | "Blood" | "Staff",
                      })
                    }
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Supply">Supply</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Medication">Medication</SelectItem>
                      <SelectItem value="Blood">Blood</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-available">Available</Label>
                  <Input
                    id="edit-available"
                    type="number"
                    value={selectedResource.available}
                    onChange={(e) => {
                      const available = Number.parseInt(e.target.value)
                      let status: "Adequate" | "Limited" | "Critical" = "Adequate"
                      const ratio = available / selectedResource.total

                      if (ratio <= 0.2) status = "Critical"
                      else if (ratio <= 0.5) status = "Limited"

                      setSelectedResource({
                        ...selectedResource,
                        available,
                        status,
                      })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-total">Total</Label>
                  <Input
                    id="edit-total"
                    type="number"
                    value={selectedResource.total}
                    onChange={(e) =>
                      setSelectedResource({ ...selectedResource, total: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedResource.location}
                  onChange={(e) => setSelectedResource({ ...selectedResource, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedResource.status}
                  onValueChange={(value) =>
                    setSelectedResource({
                      ...selectedResource,
                      status: value as "Adequate" | "Limited" | "Critical",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adequate">Adequate</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateResource}>Update Resource</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Resource Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Resource</DialogTitle>
            <DialogDescription>Specify the quantity of resources to request.</DialogDescription>
          </DialogHeader>
          {selectedResource && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Resource</Label>
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(selectedResource.category)}>{selectedResource.category}</Badge>
                  <span className="font-medium">{selectedResource.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-quantity">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setRequestQuantity(Math.max(1, requestQuantity - 1))}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    id="request-quantity"
                    type="number"
                    value={requestQuantity}
                    onChange={(e) => setRequestQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="text-center"
                  />
                  <Button variant="outline" size="icon" onClick={() => setRequestQuantity(requestQuantity + 1)}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Current Availability</Label>
                <div className="flex items-center gap-2">
                  <span>
                    {selectedResource.available}/{selectedResource.total}
                  </span>
                  <Badge className={getStatusColor(selectedResource.status)}>{selectedResource.status}</Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

