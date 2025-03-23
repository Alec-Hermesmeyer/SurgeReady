"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Printer, FileDown } from "lucide-react"
import type { Patient, ResourceItem, AlertMessage } from "../demo-data"

interface PrintReportsProps {
  patients: Patient[]
  resources: ResourceItem[]
  alerts: AlertMessage[]
  emergencyType?: string
  activationTime?: string
  elapsedTime?: number
}

export function PrintReports({
  patients,
  resources,
  alerts,
  emergencyType = "Mass Casualty Event",
  activationTime = "10:15 AM",
  elapsedTime = 3600, // 1 hour in seconds
}: PrintReportsProps) {
  const [reportType, setReportType] = useState("summary")
  const [includePatients, setIncludePatients] = useState(true)
  const [includeResources, setIncludeResources] = useState(true)
  const [includeAlerts, setIncludeAlerts] = useState(true)

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // Get patient counts
    const redCount = patients.filter((p) => p.triage === "Red").length
    const yellowCount = patients.filter((p) => p.triage === "Yellow").length
    const greenCount = patients.filter((p) => p.triage === "Green").length
    const blackCount = patients.filter((p) => p.triage === "Black").length

    // Get critical resources
    const criticalResources = resources.filter((r) => r.status === "Critical")

    // Create HTML content
    printWindow.document.write(`
      <html>
        <head>
          <title>Emergency Report - ${new Date().toLocaleString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2, h3 { margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .red { color: #dc2626; }
            .yellow { color: #ca8a04; }
            .green { color: #16a34a; }
            .black { color: #374151; }
            .critical { color: #dc2626; font-weight: bold; }
            .summary-box { border: 1px solid #ddd; padding: 15px; margin: 15px 0; }
            .header { display: flex; justify-content: space-between; }
            @media print {
              button { display: none; }
              body { margin: 0; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Emergency Response Report</h1>
            <button onclick="window.print()">Print Report</button>
          </div>
          
          <div class="summary-box">
            <h2>Event Summary</h2>
            <p><strong>Type:</strong> ${emergencyType}</p>
            <p><strong>Activated:</strong> ${activationTime}</p>
            <p><strong>Duration:</strong> ${formatTime(elapsedTime)}</p>
            <p><strong>Total Patients:</strong> ${patients.length}</p>
          </div>
          
          <h2>Patient Distribution</h2>
          <div class="summary-box">
            <p><span class="red"><strong>Red:</strong> ${redCount}</span> | 
               <span class="yellow"><strong>Yellow:</strong> ${yellowCount}</span> | 
               <span class="green"><strong>Green:</strong> ${greenCount}</span> | 
               <span class="black"><strong>Black:</strong> ${blackCount}</span></p>
          </div>
    `)

    // Add patient details if selected
    if (includePatients) {
      printWindow.document.write(`
        <h2>Patient Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Triage</th>
              <th>Location</th>
              <th>Chief Complaint</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
      `)

      patients.forEach((patient) => {
        printWindow.document.write(`
          <tr>
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td class="${patient.triage.toLowerCase()}">${patient.triage}</td>
            <td>${patient.location}</td>
            <td>${patient.chiefComplaint}</td>
            <td>${patient.status}</td>
          </tr>
        `)
      })

      printWindow.document.write(`
          </tbody>
        </table>
      `)
    }

    // Add resource details if selected
    if (includeResources) {
      printWindow.document.write(`
        <div class="page-break"></div>
        <h2>Resource Status</h2>
        <div class="summary-box">
          <p><strong>Critical Resources:</strong> ${criticalResources.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Available</th>
              <th>Total</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
      `)

      resources.forEach((resource) => {
        printWindow.document.write(`
          <tr>
            <td>${resource.id}</td>
            <td>${resource.name}</td>
            <td>${resource.category}</td>
            <td>${resource.available}</td>
            <td>${resource.total}</td>
            <td>${resource.location}</td>
            <td class="${resource.status === "Critical" ? "critical" : ""}">${resource.status}</td>
          </tr>
        `)
      })

      printWindow.document.write(`
          </tbody>
        </table>
      `)
    }

    // Add alert log if selected
    if (includeAlerts) {
      printWindow.document.write(`
        <div class="page-break"></div>
        <h2>Alert Log</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Message</th>
              <th>Severity</th>
              <th>Sender</th>
            </tr>
          </thead>
          <tbody>
      `)

      alerts.forEach((alert) => {
        printWindow.document.write(`
          <tr>
            <td>${alert.time}</td>
            <td>${alert.message}</td>
            <td class="${alert.severity === "critical" ? "critical" : ""}">${alert.severity}</td>
            <td>${alert.sender}</td>
          </tr>
        `)
      })

      printWindow.document.write(`
          </tbody>
        </table>
      `)
    }

    printWindow.document.write(`
        <div class="footer">
          <p>Report generated on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `)

    printWindow.document.close()
  }

  const handleExportCSV = () => {
    // Create CSV content based on selected data
    let csvContent = "data:text/csv;charset=utf-8,"

    if (includePatients) {
      csvContent += "PATIENTS\r\n"
      csvContent += "ID,Name,Age,Gender,Triage,Location,Chief Complaint,Arrival Time,Status\r\n"

      patients.forEach((patient) => {
        csvContent += `${patient.id},${patient.name},${patient.age},${patient.gender},${patient.triage},${patient.location},"${patient.chiefComplaint}",${patient.arrivalTime},${patient.status}\r\n`
      })

      csvContent += "\r\n"
    }

    if (includeResources) {
      csvContent += "RESOURCES\r\n"
      csvContent += "ID,Name,Category,Available,Total,Location,Status\r\n"

      resources.forEach((resource) => {
        csvContent += `${resource.id},${resource.name},${resource.category},${resource.available},${resource.total},${resource.location},${resource.status}\r\n`
      })

      csvContent += "\r\n"
    }

    if (includeAlerts) {
      csvContent += "ALERTS\r\n"
      csvContent += "ID,Time,Message,Severity,Sender\r\n"

      alerts.forEach((alert) => {
        csvContent += `${alert.id},${alert.time},"${alert.message}",${alert.severity},${alert.sender}\r\n`
      })
    }

    // Create download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `emergency_report_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Generate Reports
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Reports</DialogTitle>
          <DialogDescription>Create printable reports or export data for your emergency response.</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Report</SelectItem>
                <SelectItem value="csv">CSV Export</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="block mb-2">Include Data</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-patients"
                  checked={includePatients}
                  onCheckedChange={(checked) => setIncludePatients(!!checked)}
                />
                <Label htmlFor="include-patients">Patient Data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-resources"
                  checked={includeResources}
                  onCheckedChange={(checked) => setIncludeResources(!!checked)}
                />
                <Label htmlFor="include-resources">Resource Data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-alerts"
                  checked={includeAlerts}
                  onCheckedChange={(checked) => setIncludeAlerts(!!checked)}
                />
                <Label htmlFor="include-alerts">Alert Log</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          {reportType === "csv" ? (
            <Button onClick={handleExportCSV} className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export CSV
            </Button>
          ) : (
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Report
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

