"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { type Patient, type ResourceItem, type AlertMessage, samplePatients, sampleResources } from "../demo-data"
import { type EmergencyScenario, type ScenarioEvent } from "../demo-scenarios"

interface SimulationState {
  patients: Patient[]
  resources: ResourceItem[]
  alerts: AlertMessage[]
  elapsedTime: number // in seconds
  isActive: boolean
  isDrill: boolean
  currentScenario: EmergencyScenario | null
  upcomingEvents: ScenarioEvent[]
  completedEvents: ScenarioEvent[]
  patientArrivalQueue: Patient[]
  statistics: {
    totalPatients: number
    criticalPatients: number
    dischargedPatients: number
    resourcesLow: number
    unreadAlerts: number
  }
}

export function useEnhancedSimulation() {
  const [state, setState] = useState<SimulationState>({
    patients: [],
    resources: sampleResources,
    alerts: [],
    elapsedTime: 0,
    isActive: false,
    isDrill: false,
    currentScenario: null,
    upcomingEvents: [],
    completedEvents: [],
    patientArrivalQueue: [],
    statistics: {
      totalPatients: 0,
      criticalPatients: 0,
      dischargedPatients: 0,
      resourcesLow: 0,
      unreadAlerts: 0
    }
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const eventCheckRef = useRef<NodeJS.Timeout | null>(null)
  const patientArrivalRef = useRef<NodeJS.Timeout | null>(null)

  // Start a scenario-based simulation
  const startScenario = useCallback((scenario: EmergencyScenario, isDrill: boolean = false) => {
    // Create patient arrival queue based on scenario
    const arrivalQueue = createPatientArrivalQueue(scenario)
    
    setState({
      patients: [],
      resources: resetResources(sampleResources, scenario),
      alerts: [
        {
          id: `A${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          message: `${isDrill ? 'DRILL' : 'EMERGENCY'} ACTIVATED: ${scenario.name}`,
          severity: "critical",
          sender: "Emergency Management",
          read: false,
        },
      ],
      elapsedTime: 0,
      isActive: true,
      isDrill,
      currentScenario: scenario,
      upcomingEvents: [...scenario.timeline],
      completedEvents: [],
      patientArrivalQueue: arrivalQueue,
      statistics: {
        totalPatients: 0,
        criticalPatients: 0,
        dischargedPatients: 0,
        resourcesLow: 0,
        unreadAlerts: 1
      }
    })

    // Add initial patients if specified
    if (scenario.initialPatients && scenario.initialPatients > 0) {
      setTimeout(() => {
        addPatientsFromQueue(scenario.initialPatients || 0)
      }, 5000) // Add initial patients after 5 seconds
    }
  }, [])

  // Create realistic patient arrival queue based on scenario
  const createPatientArrivalQueue = (scenario: EmergencyScenario): Patient[] => {
    const queue: Patient[] = []
    const availablePatients = [...samplePatients]
    
    // Adjust patient severity distribution based on scenario type
    const severityDistribution = getSeverityDistribution(scenario.type)
    
    for (let i = 0; i < scenario.expectedPatients && availablePatients.length > 0; i++) {
      const severity = getRandomSeverity(severityDistribution)
      
      // Find a patient matching this severity or closest
      let patientIndex = availablePatients.findIndex(p => p.triage === severity)
      if (patientIndex === -1) {
        patientIndex = Math.floor(Math.random() * availablePatients.length)
      }
      
      const basePatient = availablePatients.splice(patientIndex, 1)[0]
      
      // Create scenario-specific patient
      const scenarioPatient: Patient = {
        ...basePatient,
        id: `P${(1000 + i).toString()}`,
        triage: severity,
        chiefComplaint: getScenarioSpecificComplaint(scenario.type, severity),
        arrivalTime: "", // Will be set when patient arrives
      }
      
      queue.push(scenarioPatient)
    }
    
    return queue
  }

  // Get severity distribution based on scenario type
  const getSeverityDistribution = (type: EmergencyScenario['type']) => {
    switch (type) {
      case "mass-casualty":
        return { Red: 0.25, Yellow: 0.35, Green: 0.35, Black: 0.05 }
      case "active-shooter":
        return { Red: 0.4, Yellow: 0.3, Green: 0.25, Black: 0.05 }
      case "chemical":
        return { Red: 0.3, Yellow: 0.4, Green: 0.25, Black: 0.05 }
      case "building-collapse":
        return { Red: 0.35, Yellow: 0.4, Green: 0.2, Black: 0.05 }
      case "pandemic":
        return { Red: 0.2, Yellow: 0.3, Green: 0.45, Black: 0.05 }
      default:
        return { Red: 0.2, Yellow: 0.3, Green: 0.45, Black: 0.05 }
    }
  }

  // Get random severity based on distribution
  const getRandomSeverity = (distribution: Record<string, number>): "Red" | "Yellow" | "Green" | "Black" => {
    const rand = Math.random()
    let cumulative = 0
    
    for (const [severity, probability] of Object.entries(distribution)) {
      cumulative += probability
      if (rand <= cumulative) {
        return severity as "Red" | "Yellow" | "Green" | "Black"
      }
    }
    
    return "Green" // fallback
  }

  // Get scenario-specific chief complaints
  const getScenarioSpecificComplaint = (type: EmergencyScenario['type'], severity: string): string => {
    const complaints = {
      "mass-casualty": {
        Red: ["Multiple trauma", "Head injury", "Internal bleeding", "Crush injury"],
        Yellow: ["Fracture", "Laceration", "Chest pain", "Abdominal pain"],
        Green: ["Minor laceration", "Bruising", "Anxiety", "Minor fracture"],
        Black: ["Cardiac arrest", "Severe trauma", "Multiple organ failure"]
      },
      "active-shooter": {
        Red: ["Gunshot wound chest", "Gunshot wound abdomen", "Multiple GSW", "Head trauma"],
        Yellow: ["Gunshot wound extremity", "Laceration", "Fracture from fall"],
        Green: ["Anxiety", "Minor injury from escape", "Psychological trauma"],
        Black: ["Fatal gunshot wound", "Exsanguination"]
      },
      "chemical": {
        Red: ["Chemical burns", "Respiratory distress", "Chemical poisoning"],
        Yellow: ["Skin irritation", "Eye irritation", "Mild respiratory symptoms"],
        Green: ["Anxiety", "Minor exposure", "Precautionary evaluation"],
        Black: ["Severe chemical poisoning", "Respiratory failure"]
      },
      "natural-disaster": {
        Red: ["Crush injuries", "Head trauma", "Internal bleeding", "Severe lacerations"],
        Yellow: ["Fractures", "Moderate lacerations", "Dehydration", "Exhaustion"],
        Green: ["Minor injuries", "Anxiety", "Exposure", "Minor lacerations"],
        Black: ["Severe trauma", "Cardiac arrest", "Multiple organ failure"]
      },
      "building-collapse": {
        Red: ["Crush syndrome", "Internal injuries", "Respiratory compromise"],
        Yellow: ["Fracture", "Dust inhalation", "Contusions"],
        Green: ["Minor injuries", "Anxiety", "Dust exposure"],
        Black: ["Severe crush injury", "Multiple trauma"]
      },
      "pandemic": {
        Red: ["Severe respiratory distress", "ARDS", "Multi-organ failure"],
        Yellow: ["Pneumonia", "Moderate respiratory symptoms", "Dehydration"],
        Green: ["Mild symptoms", "Precautionary isolation", "Contact tracing"],
        Black: ["Respiratory failure", "Septic shock"]
      }
    }

    const typeComplaints = complaints[type] || complaints["mass-casualty"]
    const severityComplaints = typeComplaints[severity as keyof typeof typeComplaints] || typeComplaints.Green
    return severityComplaints[Math.floor(Math.random() * severityComplaints.length)]
  }

  // Reset resources based on scenario intensity
  const resetResources = (baseResources: ResourceItem[], scenario: EmergencyScenario): ResourceItem[] => {
    return baseResources.map(resource => {
      // Reduce initial resources for higher intensity scenarios
      const reductionFactor = scenario.resourceIntensity === "high" ? 0.7 : 
                             scenario.resourceIntensity === "medium" ? 0.85 : 1.0
      
      const newAvailable = Math.floor(resource.total * reductionFactor)
      
      return {
        ...resource,
        available: newAvailable,
        status: getResourceStatus(newAvailable, resource.total)
      }
    })
  }

  // Get resource status based on availability
  const getResourceStatus = (available: number, total: number): "Adequate" | "Limited" | "Critical" => {
    const ratio = available / total
    if (ratio <= 0.2) return "Critical"
    if (ratio <= 0.5) return "Limited"
    return "Adequate"
  }

  // Add patients from queue
  const addPatientsFromQueue = useCallback((count: number) => {
    setState(prev => {
      const newPatients = prev.patientArrivalQueue.slice(0, count).map(patient => ({
        ...patient,
        arrivalTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }))
      
      const remainingQueue = prev.patientArrivalQueue.slice(count)
      
      // Create alert for new arrivals
      const newAlert: AlertMessage = {
        id: `A${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        message: `${count} new patient${count > 1 ? 's' : ''} arrived`,
        severity: newPatients.some(p => p.triage === "Red") ? "critical" : "warning",
        sender: "Triage",
        read: false,
      }

      const updatedPatients = [...prev.patients, ...newPatients]
      const updatedAlerts = [newAlert, ...prev.alerts]
      
      return {
        ...prev,
        patients: updatedPatients,
        patientArrivalQueue: remainingQueue,
        alerts: updatedAlerts,
        statistics: {
          ...prev.statistics,
          totalPatients: updatedPatients.length,
          criticalPatients: updatedPatients.filter(p => p.triage === "Red").length,
          unreadAlerts: updatedAlerts.filter(a => !a.read).length
        }
      }
    })
  }, [])

  // Stop simulation
  const stopSimulation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: false,
      currentScenario: null
    }))
    
    // Clear all timers
    if (timerRef.current) clearInterval(timerRef.current)
    if (eventCheckRef.current) clearInterval(eventCheckRef.current)
    if (patientArrivalRef.current) clearInterval(patientArrivalRef.current)
  }, [])

  // Main timer effect
  useEffect(() => {
    if (!state.isActive) return

    timerRef.current = setInterval(() => {
      setState(prev => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1
      }))
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [state.isActive])

  // Scenario event checking effect
  useEffect(() => {
    if (!state.isActive || !state.currentScenario) return

    eventCheckRef.current = setInterval(() => {
      const currentTimeMinutes = Math.floor(state.elapsedTime / 60)
      
      setState(prev => {
        const eventsToTrigger = prev.upcomingEvents.filter(
          event => event.timeMinutes <= currentTimeMinutes
        )
        
        if (eventsToTrigger.length === 0) return prev

        // Process events
        let newAlerts = [...prev.alerts]
        let newPatients = [...prev.patients]
        let newResources = [...prev.resources]
        
        eventsToTrigger.forEach(event => {
          // Create alert for event
          const eventAlert: AlertMessage = {
            id: `A${Date.now()}_${event.timeMinutes}`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            message: `${event.title}: ${event.description}`,
            severity: event.severity,
            sender: "Emergency Management",
            read: false,
          }
          newAlerts = [eventAlert, ...newAlerts]
          
          // Handle specific event types
          if (event.type === "patient-arrival") {
            // Extract number from description if possible
            const patientCount = extractPatientCount(event.description)
            if (patientCount > 0 && prev.patientArrivalQueue.length > 0) {
              const arrivingPatients = prev.patientArrivalQueue.slice(0, patientCount).map(patient => ({
                ...patient,
                arrivalTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              }))
              newPatients = [...newPatients, ...arrivingPatients]
            }
          } else if (event.type === "resource-depletion") {
            // Randomly deplete a resource
            const resourceIndex = Math.floor(Math.random() * newResources.length)
            newResources[resourceIndex] = {
              ...newResources[resourceIndex],
              available: Math.max(0, Math.floor(newResources[resourceIndex].available * 0.6)),
              status: "Critical"
            }
          }
        })

        return {
          ...prev,
          alerts: newAlerts,
          patients: newPatients,
          resources: newResources,
          upcomingEvents: prev.upcomingEvents.filter(
            event => !eventsToTrigger.includes(event)
          ),
          completedEvents: [...prev.completedEvents, ...eventsToTrigger],
          patientArrivalQueue: prev.patientArrivalQueue.slice(
            eventsToTrigger.filter(e => e.type === "patient-arrival").length
          ),
          statistics: {
            ...prev.statistics,
            totalPatients: newPatients.length,
            criticalPatients: newPatients.filter(p => p.triage === "Red").length,
            resourcesLow: newResources.filter(r => r.status === "Critical" || r.status === "Limited").length,
            unreadAlerts: newAlerts.filter(a => !a.read).length
          }
        }
      })
    }, 5000) // Check events every 5 seconds

    return () => {
      if (eventCheckRef.current) clearInterval(eventCheckRef.current)
    }
  }, [state.isActive, state.currentScenario, state.elapsedTime])

  // Patient arrival automation
  useEffect(() => {
    if (!state.isActive || !state.currentScenario) return

    const getArrivalInterval = () => {
      if (!state.currentScenario) return 60000 // 1 minute default
      
      switch (state.currentScenario.patientArrivalPattern) {
        case "surge":
          return 15000 // 15 seconds
        case "steady":
          return 45000 // 45 seconds
        case "waves":
          return 30000 // 30 seconds
        case "frontloaded":
          return state.elapsedTime < 600 ? 20000 : 120000 // Fast first 10 minutes, then slow
        default:
          return 60000
      }
    }

    patientArrivalRef.current = setInterval(() => {
      if (state.patientArrivalQueue.length > 0 && Math.random() > 0.3) {
        addPatientsFromQueue(1)
      }
    }, getArrivalInterval())

    return () => {
      if (patientArrivalRef.current) clearInterval(patientArrivalRef.current)
    }
  }, [state.isActive, state.currentScenario, state.elapsedTime, state.patientArrivalQueue.length, addPatientsFromQueue])

  // Helper function to extract patient count from event description
  const extractPatientCount = (description: string): number => {
    const match = description.match(/(\d+)\s+patients?/)
    return match ? parseInt(match[1]) : 1
  }

  // Format elapsed time as HH:MM:SS
  const formatElapsedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return {
    ...state,
    startScenario,
    stopSimulation,
    addPatientsFromQueue,
    formatElapsedTime: formatElapsedTime(state.elapsedTime),
    rawElapsedTime: state.elapsedTime
  }
} 