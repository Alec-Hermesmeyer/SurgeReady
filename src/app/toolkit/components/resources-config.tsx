"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText } from "lucide-react"

interface ResourcesConfigSectionProps {
  emergencyMode: boolean
  drillMode: boolean
  resourcesConfig: any
  setResourcesConfig: (config: any) => void
  onSave: () => void
}

export function ResourcesConfigSection({
  emergencyMode,
  drillMode,
  resourcesConfig,
  setResourcesConfig,
  onSave,
}: ResourcesConfigSectionProps) {
  return (
    <div className="space-y-6 w-full">
      <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
        <CardHeader
          className={
            emergencyMode
              ? "bg-red-600 text-white"
              : drillMode
                ? "bg-amber-500 text-white"
                : "bg-gray-100 dark:bg-gray-800"
          }
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-6 w-6" />
                Resources Configuration
              </CardTitle>
              <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                Configure resources and protocols for mass casualty events
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
            <div>
              <h3 className="text-lg font-medium mb-4">Critical Supplies</h3>
              <div className="space-y-3">
                {resourcesConfig.criticalSupplies.map((supply: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`supply-${index}-name`}>Name</Label>
                    <Input
                      id={`supply-${index}-name`}
                      value={supply.name}
                      onChange={(e) => {
                        const newSupplies = [...resourcesConfig.criticalSupplies]
                        newSupplies[index].name = e.target.value
                        setResourcesConfig({ ...resourcesConfig, criticalSupplies: newSupplies })
                      }}
                    />
                    <Label htmlFor={`supply-${index}-quantity`}>Quantity</Label>
                    <Input
                      id={`supply-${index}-quantity`}
                      type="number"
                      value={supply.quantity}
                      onChange={(e) => {
                        const newSupplies = [...resourcesConfig.criticalSupplies]
                        newSupplies[index].quantity = Number.parseInt(e.target.value)
                        setResourcesConfig({ ...resourcesConfig, criticalSupplies: newSupplies })
                      }}
                    />
                    <Label htmlFor={`supply-${index}-location`}>Location</Label>
                    <Input
                      id={`supply-${index}-location`}
                      value={supply.location}
                      onChange={(e) => {
                        const newSupplies = [...resourcesConfig.criticalSupplies]
                        newSupplies[index].location = e.target.value
                        setResourcesConfig({ ...resourcesConfig, criticalSupplies: newSupplies })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Equipment</h3>
              <div className="space-y-3">
                {resourcesConfig.equipment.map((equipment: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`equipment-${index}-name`}>Name</Label>
                    <Input
                      id={`equipment-${index}-name`}
                      value={equipment.name}
                      onChange={(e) => {
                        const newEquipment = [...resourcesConfig.equipment]
                        newEquipment[index].name = e.target.value
                        setResourcesConfig({ ...resourcesConfig, equipment: newEquipment })
                      }}
                    />
                    <Label htmlFor={`equipment-${index}-quantity`}>Quantity</Label>
                    <Input
                      id={`equipment-${index}-quantity`}
                      type="number"
                      value={equipment.quantity}
                      onChange={(e) => {
                        const newEquipment = [...resourcesConfig.equipment]
                        newEquipment[index].quantity = Number.parseInt(e.target.value)
                        setResourcesConfig({ ...resourcesConfig, equipment: newEquipment })
                      }}
                    />
                    <Label htmlFor={`equipment-${index}-location`}>Location</Label>
                    <Input
                      id={`equipment-${index}-location`}
                      value={equipment.location}
                      onChange={(e) => {
                        const newEquipment = [...resourcesConfig.equipment]
                        newEquipment[index].location = e.target.value
                        setResourcesConfig({ ...resourcesConfig, equipment: newEquipment })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Blood Bank</h3>
            <Label htmlFor="blood-bank-contact">Contact Information</Label>
            <Input
              id="blood-bank-contact"
              value={resourcesConfig.bloodBank.contact}
              onChange={(e) =>
                setResourcesConfig({
                  ...resourcesConfig,
                  bloodBank: { ...resourcesConfig.bloodBank, contact: e.target.value },
                })
              }
            />
            <Label htmlFor="emergency-release-protocol">Emergency Release Protocol</Label>
            <Textarea
              id="emergency-release-protocol"
              value={resourcesConfig.bloodBank.emergencyReleaseProtocol}
              onChange={(e) =>
                setResourcesConfig({
                  ...resourcesConfig,
                  bloodBank: { ...resourcesConfig.bloodBank, emergencyReleaseProtocol: e.target.value },
                })
              }
            />
            <h4 className="font-medium">Products Available</h4>
            <div className="flex flex-wrap gap-2">
              <Checkbox id="o-negative" />
              <Label htmlFor="o-negative">O-Negative</Label>
              <Checkbox id="o-positive" />
              <Label htmlFor="o-positive">O-Positive</Label>
              <Checkbox id="plasma" />
              <Label htmlFor="plasma">Plasma</Label>
              <Checkbox id="platelets" />
              <Label htmlFor="platelets">Platelets</Label>
              <Checkbox id="cryo" />
              <Label htmlFor="cryo">Cryo</Label>
            </div>
            <Label htmlFor="massive-transfusion-protocol">Massive Transfusion Protocol</Label>
            <Textarea
              id="massive-transfusion-protocol"
              value={resourcesConfig.bloodBank.massiveTransfusionProtocol}
              onChange={(e) =>
                setResourcesConfig({
                  ...resourcesConfig,
                  bloodBank: { ...resourcesConfig.bloodBank, massiveTransfusionProtocol: e.target.value },
                })
              }
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">External Resources</h3>
            <Label htmlFor="external-contacts">Contact Information</Label>
            <Textarea
              id="external-contacts"
              value={resourcesConfig.externalResources.contacts}
              onChange={(e) =>
                setResourcesConfig({
                  ...resourcesConfig,
                  externalResources: { ...resourcesConfig.externalResources, contacts: e.target.value },
                })
              }
            />
            <Label htmlFor="mutual-aid-agreements">Mutual Aid Agreements</Label>
            <Textarea
              id="mutual-aid-agreements"
              value={resourcesConfig.externalResources.mutualAid}
              onChange={(e) =>
                setResourcesConfig({
                  ...resourcesConfig,
                  externalResources: { ...resourcesConfig.externalResources, mutualAid: e.target.value },
                })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button className="bg-red-600 hover:bg-red-700" onClick={onSave}>
              Save Resources Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

