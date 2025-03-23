"use client"

import { useState, useEffect, useCallback } from "react"
import { type Patient, type ResourceItem, type AlertMessage, samplePatients, sampleResources } from "../demo-data"

interface SimulationOptions {
  intensity: "low" | "medium" | "high"
  duration: number // in minutes
  scenarioType: "mass-casualty" | "active-shooter" | "chemical" | "natural-disaster"
}

interface SimulationState {
  patients: Patient[]
  resources: ResourceItem[]
  alerts: AlertMessage[]
  elapsedTime: number // in seconds
  isActive: boolean
}

export function useSimulation(options: SimulationOptions) {
  const [state, setState] = useState<SimulationState>({
    patients: [],
    resources: [],
    alerts: [],
    elapsedTime: 0,
    isActive: false,
  })

  const startSimulation = useCallback(() => {
    // Initialize with some data
    setState({
      patients: samplePatients.slice(0, 3), // Start with just a few patients
      resources: sampleResources,
      alerts: [
        {
          id: `A${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          message: `Emergency Mode Activated: ${options.scenarioType.replace("-", " ")}`,
          severity: "critical",
          sender: "System",
          read: false,
        },
      ],
      elapsedTime: 0,
      isActive: true,
    })
  }, [options.scenarioType])

  const stopSimulation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isActive: false,
    }))
  }, [])

  // Simulate time passing and events occurring
  useEffect(() => {
    if (!state.isActive) return

    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1,
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [state.isActive])

  // Simulate patient arrivals
  useEffect(() => {
    if (!state.isActive) return

    // Determine frequency of new patients based on intensity
    const patientArrivalInterval = options.intensity === "high" ? 30 : options.intensity === "medium" ? 60 : 120

    const patientTimer = setInterval(() => {
      // Don't add more patients if we've reached the end of our sample data
      if (state.patients.length >= samplePatients.length) return

      setState((prev) => {
        // Get the next patient from sample data
        const newPatient = {
          ...samplePatients[prev.patients.length],
          arrivalTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        // Add a new alert about the patient
        const newAlert: AlertMessage = {
          id: `A${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          message: `New ${newPatient.triage} patient arrived: ${newPatient.name}`,
          severity: newPatient.triage === "Red" ? "critical" : newPatient.triage === "Yellow" ? "warning" : "info",
          sender: "Triage",
          read: false,
        }

        return {
          ...prev,
          patients: [...prev.patients, newPatient],
          alerts: [newAlert, ...prev.alerts],
        }
      })
    }, patientArrivalInterval * 1000)

    return () => clearInterval(patientTimer)
  }, [state.isActive, options.intensity])

  // Simulate resource consumption
  useEffect(() => {
    if (!state.isActive) return

    const resourceTimer = setInterval(() => {
      setState((prev) => {
        // Update resources based on patient load and time
        const updatedResources = prev.resources.map((resource) => {
          // More patients = more resource consumption
          const consumptionRate = prev.patients.length * 0.01

          // Calculate new available amount
          let newAvailable = Math.max(0, resource.available - consumptionRate)

          // Randomly replenish some resources occasionally
          if (Math.random() > 0.8) {
            newAvailable = Math.min(resource.total, newAvailable + Math.random() * 2)
          }

          // Update status based on availability
          let status: "Adequate" | "Limited" | "Critical" = "Adequate"
          const ratio = newAvailable / resource.total

          if (ratio <= 0.2) status = "Critical"
          else if (ratio <= 0.5) status = "Limited"

          // If status changed to critical, add an alert
          let newAlerts = [...prev.alerts]
          if (status === "Critical" && resource.status !== "Critical") {
            const newAlert: AlertMessage = {
              id: `A${Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0")}`,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              message: `Resource critical: ${resource.name} (${Math.round(ratio * 100)}% remaining)`,
              severity: "critical",
              sender: "Resource Management",
              read: false,
            }
            newAlerts = [newAlert, ...newAlerts]
          }

          return {
            ...resource,
            available: Math.round(newAvailable),
            status,
          }
        })

        return {
          ...prev,
          resources: updatedResources,
        }
      })
    }, 10000) // Update resources every 10 seconds

    return () => clearInterval(resourceTimer)
  }, [state.isActive])

  // Simulate random events
  useEffect(() => {
    if (!state.isActive) return

    const eventTimer = setInterval(() => {
      // Only trigger events occasionally
      if (Math.random() > 0.3) return

      setState((prev) => {
        // Generate a random event
        const events = [
          {
            message: "Additional ambulances en route - ETA 5 minutes",
            severity: "info" as const,
            sender: "EMS Dispatch",
          },
          {
            message: `${Math.floor(Math.random() * 3) + 2} more patients expected in next 10 minutes`,
            severity: "warning" as const,
            sender: "EMS Dispatch",
          },
          {
            message: "Hospital capacity at 85% - consider patient transfers",
            severity: "warning" as const,
            sender: "Hospital Admin",
          },
          {
            message: "Additional staff arriving from other departments",
            severity: "info" as const,
            sender: "Staffing",
          },
          {
            message: "Power fluctuations detected - backup generators on standby",
            severity: "warning" as const,
            sender: "Facilities",
          },
        ]

        const randomEvent = events[Math.floor(Math.random() * events.length)]

        const newAlert: AlertMessage = {
          id: `A${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          ...randomEvent,
          read: false,
        }

        return {
          ...prev,
          alerts: [newAlert, ...prev.alerts],
        }
      })
    }, 45000) // Random events every ~45 seconds

    return () => clearInterval(eventTimer)
  }, [state.isActive])

  // Simulate patient status changes
  useEffect(() => {
    if (!state.isActive) return

    const patientUpdateTimer = setInterval(() => {
      setState((prev) => {
        if (prev.patients.length === 0) return prev

        // Randomly select a patient to update
        const patientIndex = Math.floor(Math.random() * prev.patients.length)
        const patient = prev.patients[patientIndex]

        // Possible status transitions
        const statusTransitions: Record<string, string[]> = {
          Waiting: ["In Treatment"],
          "In Treatment": ["Discharged", "Transferred"],
          Transferred: [],
          Discharged: [],
          Deceased: [],
        }

        // Only update if there are possible transitions
        if (statusTransitions[patient.status].length === 0) return prev

        // Select a random new status
        const newStatus = statusTransitions[patient.status][
          Math.floor(Math.random() * statusTransitions[patient.status].length)
        ] as "Waiting" | "In Treatment" | "Transferred" | "Discharged" | "Deceased"

        // Create updated patient
        const updatedPatient = {
          ...patient,
          status: newStatus,
        }

        // Create new alert about the status change
        const newAlert: AlertMessage = {
          id: `A${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          message: `Patient ${patient.name} status changed to ${newStatus}`,
          severity: "info",
          sender: "Patient Tracking",
          read: false,
        }

        // Update patients array
        const updatedPatients = [...prev.patients]
        updatedPatients[patientIndex] = updatedPatient

        return {
          ...prev,
          patients: updatedPatients,
          alerts: [newAlert, ...prev.alerts],
        }
      })
    }, 30000) // Update patient status every 30 seconds

    return () => clearInterval(patientUpdateTimer)
  }, [state.isActive])

  return {
    ...state,
    startSimulation,
    stopSimulation,
  }
}

