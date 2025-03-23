"use client"

import { useState } from "react"
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
import type { AlertMessage } from "../demo-data"
import { AlertCircle, Bell, CheckCircle, MessageSquare } from "lucide-react"

interface AlertCenterProps {
  alerts: AlertMessage[]
  onSendAlert?: (alert: Omit<AlertMessage, "id" | "time" | "read">) => void
  onMarkAsRead?: (alertId: string) => void
  onMarkAllAsRead?: () => void
}

export function AlertCenter({ alerts, onSendAlert, onMarkAsRead, onMarkAllAsRead }: AlertCenterProps) {
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false)
  const [newAlert, setNewAlert] = useState<Omit<AlertMessage, "id" | "time" | "read">>({
    message: "",
    severity: "info",
    sender: "You",
  })

  const unreadAlerts = alerts.filter((alert) => !alert.read)

  const handleSendAlert = () => {
    if (onSendAlert && newAlert.message) {
      onSendAlert(newAlert)
      setNewAlert({
        message: "",
        severity: "info",
        sender: "You",
      })
    }
    setIsSendDialogOpen(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "warning":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return ""
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case "info":
        return <MessageSquare className="h-5 w-5 text-blue-600" />
      default:
        return <MessageSquare className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Alerts</h3>
          {unreadAlerts.length > 0 && <Badge className="bg-red-600">{unreadAlerts.length} unread</Badge>}
        </div>
        <div className="flex gap-2">
          {unreadAlerts.length > 0 && (
            <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Bell className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Alert</DialogTitle>
                <DialogDescription>Create a new alert to notify staff.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-message">Message</Label>
                  <Textarea
                    id="alert-message"
                    value={newAlert.message}
                    onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                    placeholder="Enter alert message"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-severity">Severity</Label>
                  <Select
                    value={newAlert.severity}
                    onValueChange={(value) =>
                      setNewAlert({
                        ...newAlert,
                        severity: value as "info" | "warning" | "critical",
                      })
                    }
                  >
                    <SelectTrigger id="alert-severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-sender">Sender</Label>
                  <Input
                    id="alert-sender"
                    value={newAlert.sender}
                    onChange={(e) => setNewAlert({ ...newAlert, sender: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendAlert}>Send Alert</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-4 max-h-[400px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No alerts to display</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex gap-3 p-3 rounded-lg border ${!alert.read ? "bg-gray-50 dark:bg-gray-800/50" : ""}`}
            >
              <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{alert.message}</p>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Badge>
                  {!alert.read && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">New</Badge>
                  )}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{alert.time}</span>
                  <span>From: {alert.sender}</span>
                </div>
              </div>
              {!alert.read && onMarkAsRead && (
                <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(alert.id)} className="self-start">
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

