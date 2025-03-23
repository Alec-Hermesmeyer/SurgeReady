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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Patient } from "../demo-data"
import { Edit, Eye, UserPlus } from "lucide-react"

interface PatientTableProps {
  patients: Patient[]
  onAddPatient?: (patient: Patient) => void
  onUpdatePatient?: (patient: Patient) => void
  filter?: "Red" | "Yellow" | "Green" | "Black" | "All"
}

export function PatientTable({ patients, onAddPatient, onUpdatePatient, filter = "All" }: PatientTableProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    id: `P${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    name: "",
    age: 0,
    gender: "Male",
    triage: "Yellow",
    location: "",
    chiefComplaint: "",
    arrivalTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    status: "Waiting",
  })

  const displayedPatients = filter === "All" ? patients : patients.filter((patient) => patient.triage === filter)

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsViewDialogOpen(true)
  }

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsEditDialogOpen(true)
  }

  const handleUpdatePatient = () => {
    if (selectedPatient && onUpdatePatient) {
      onUpdatePatient(selectedPatient)
    }
    setIsEditDialogOpen(false)
  }

  const handleAddPatient = () => {
    if (onAddPatient && newPatient.name && newPatient.chiefComplaint) {
      onAddPatient(newPatient as Patient)
      setNewPatient({
        id: `P${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        name: "",
        age: 0,
        gender: "Male",
        triage: "Yellow",
        location: "",
        chiefComplaint: "",
        arrivalTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Waiting",
      })
    }
    setIsAddDialogOpen(false)
  }

  const getTriageColor = (triage: string) => {
    switch (triage) {
      case "Red":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "Yellow":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Green":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Black":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return ""
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Treatment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Waiting":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Transferred":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Discharged":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Deceased":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return ""
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          Patients {filter !== "All" && <Badge className={getTriageColor(filter)}>{filter}</Badge>}
        </h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the details of the new patient.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={newPatient.gender}
                    onValueChange={(value) =>
                      setNewPatient({ ...newPatient, gender: value as "Male" | "Female" | "Other" })
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="triage">Triage</Label>
                  <Select
                    value={newPatient.triage}
                    onValueChange={(value) =>
                      setNewPatient({ ...newPatient, triage: value as "Red" | "Yellow" | "Green" | "Black" })
                    }
                  >
                    <SelectTrigger id="triage">
                      <SelectValue placeholder="Select triage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Red">Red</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newPatient.location}
                  onChange={(e) => setNewPatient({ ...newPatient, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                <Textarea
                  id="chiefComplaint"
                  value={newPatient.chiefComplaint}
                  onChange={(e) => setNewPatient({ ...newPatient, chiefComplaint: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newPatient.status}
                  onValueChange={(value) =>
                    setNewPatient({
                      ...newPatient,
                      status: value as "Waiting" | "In Treatment" | "Transferred" | "Discharged" | "Deceased",
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Waiting">Waiting</SelectItem>
                    <SelectItem value="In Treatment">In Treatment</SelectItem>
                    <SelectItem value="Transferred">Transferred</SelectItem>
                    <SelectItem value="Discharged">Discharged</SelectItem>
                    <SelectItem value="Deceased">Deceased</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPatient}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Triage</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              displayedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <Badge className={getTriageColor(patient.triage)}>{patient.triage}</Badge>
                  </TableCell>
                  <TableCell>{patient.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Patient Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Patient ID</h4>
                  <p>{selectedPatient.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Name</h4>
                  <p>{selectedPatient.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Age / Gender</h4>
                  <p>
                    {selectedPatient.age} / {selectedPatient.gender}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Triage</h4>
                  <Badge className={getTriageColor(selectedPatient.triage)}>{selectedPatient.triage}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p>{selectedPatient.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge className={getStatusColor(selectedPatient.status)}>{selectedPatient.status}</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Chief Complaint</h4>
                  <p>{selectedPatient.chiefComplaint}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Arrival Time</h4>
                  <p>{selectedPatient.arrivalTime}</p>
                </div>
                {selectedPatient.vitalSigns && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Vital Signs</h4>
                    <p>BP: {selectedPatient.vitalSigns.bloodPressure}</p>
                    <p>HR: {selectedPatient.vitalSigns.heartRate} bpm</p>
                    <p>RR: {selectedPatient.vitalSigns.respiratoryRate} /min</p>
                    <p>O2 Sat: {selectedPatient.vitalSigns.oxygenSaturation}%</p>
                    <p>Temp: {selectedPatient.vitalSigns.temperature}°C</p>
                  </div>
                )}
                {selectedPatient.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                    <p>{selectedPatient.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>Update the patient's information.</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedPatient.name}
                    onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={selectedPatient.age}
                    onChange={(e) => setSelectedPatient({ ...selectedPatient, age: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={selectedPatient.gender}
                    onValueChange={(value) =>
                      setSelectedPatient({ ...selectedPatient, gender: value as "Male" | "Female" | "Other" })
                    }
                  >
                    <SelectTrigger id="edit-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-triage">Triage</Label>
                  <Select
                    value={selectedPatient.triage}
                    onValueChange={(value) =>
                      setSelectedPatient({ ...selectedPatient, triage: value as "Red" | "Yellow" | "Green" | "Black" })
                    }
                  >
                    <SelectTrigger id="edit-triage">
                      <SelectValue placeholder="Select triage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Red">Red</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedPatient.location}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-chiefComplaint">Chief Complaint</Label>
                <Textarea
                  id="edit-chiefComplaint"
                  value={selectedPatient.chiefComplaint}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, chiefComplaint: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedPatient.status}
                  onValueChange={(value) =>
                    setSelectedPatient({
                      ...selectedPatient,
                      status: value as "Waiting" | "In Treatment" | "Transferred" | "Discharged" | "Deceased",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Waiting">Waiting</SelectItem>
                    <SelectItem value="In Treatment">In Treatment</SelectItem>
                    <SelectItem value="Transferred">Transferred</SelectItem>
                    <SelectItem value="Discharged">Discharged</SelectItem>
                    <SelectItem value="Deceased">Deceased</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedPatient.notes || ""}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, notes: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePatient}>Update Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

