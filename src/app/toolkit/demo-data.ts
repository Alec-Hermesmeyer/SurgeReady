// Sample patient data for demo purposes
export type Patient = {
    id: string
    name: string
    age: number
    gender: "Male" | "Female" | "Other"
    triage: "Red" | "Yellow" | "Green" | "Black"
    location: string
    chiefComplaint: string
    arrivalTime: string
    status: "Waiting" | "In Treatment" | "Transferred" | "Discharged" | "Deceased"
    vitalSigns?: {
      bloodPressure: string
      heartRate: number
      respiratoryRate: number
      oxygenSaturation: number
      temperature: number
    }
    notes?: string
  }
  
  export type ResourceItem = {
    id: string
    name: string
    category: "Supply" | "Equipment" | "Medication" | "Blood" | "Staff"
    available: number
    total: number
    location: string
    status: "Adequate" | "Limited" | "Critical"
  }
  
  export type AlertMessage = {
    id: string
    time: string
    message: string
    severity: "info" | "warning" | "critical"
    sender: string
    read: boolean
  }
  
  export type DrillScenario = {
    id: string
    name: string
    description: string
    type: "Mass Casualty" | "Active Shooter" | "Chemical Exposure" | "Natural Disaster"
    patientCount: number
    expectedDuration: string
    difficulty: "Easy" | "Moderate" | "Difficult"
  }
  
  // Sample patients for demo
  export const samplePatients: Patient[] = [
    {
      id: "P001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      triage: "Red",
      location: "ED Room 1",
      chiefComplaint: "Multiple trauma, chest pain",
      arrivalTime: "10:15 AM",
      status: "In Treatment",
      vitalSigns: {
        bloodPressure: "90/60",
        heartRate: 120,
        respiratoryRate: 24,
        oxygenSaturation: 92,
        temperature: 37.2,
      },
      notes: "MVA victim, possible internal bleeding",
    },
    {
      id: "P002",
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      triage: "Yellow",
      location: "ED Room 5",
      chiefComplaint: "Fractured arm, lacerations",
      arrivalTime: "10:18 AM",
      status: "In Treatment",
      vitalSigns: {
        bloodPressure: "125/85",
        heartRate: 95,
        respiratoryRate: 18,
        oxygenSaturation: 98,
        temperature: 37.0,
      },
    },
    {
      id: "P003",
      name: "Robert Johnson",
      age: 28,
      gender: "Male",
      triage: "Green",
      location: "Waiting Area",
      chiefComplaint: "Minor lacerations, bruising",
      arrivalTime: "10:20 AM",
      status: "Waiting",
      vitalSigns: {
        bloodPressure: "130/80",
        heartRate: 82,
        respiratoryRate: 16,
        oxygenSaturation: 99,
        temperature: 36.8,
      },
    },
    {
      id: "P004",
      name: "Maria Garcia",
      age: 67,
      gender: "Female",
      triage: "Red",
      location: "ED Room 2",
      chiefComplaint: "Respiratory distress, chest pain",
      arrivalTime: "10:22 AM",
      status: "In Treatment",
      vitalSigns: {
        bloodPressure: "160/95",
        heartRate: 115,
        respiratoryRate: 28,
        oxygenSaturation: 88,
        temperature: 38.1,
      },
      notes: "History of COPD, possible MI",
    },
    {
      id: "P005",
      name: "David Wilson",
      age: 8,
      gender: "Male",
      triage: "Yellow",
      location: "ED Room 6",
      chiefComplaint: "Head injury, disoriented",
      arrivalTime: "10:25 AM",
      status: "In Treatment",
      vitalSigns: {
        bloodPressure: "100/70",
        heartRate: 110,
        respiratoryRate: 22,
        oxygenSaturation: 97,
        temperature: 37.3,
      },
      notes: "Fell from playground equipment",
    },
    {
      id: "P006",
      name: "Sarah Brown",
      age: 42,
      gender: "Female",
      triage: "Green",
      location: "Waiting Area",
      chiefComplaint: "Ankle injury, pain",
      arrivalTime: "10:28 AM",
      status: "Waiting",
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: 78,
        respiratoryRate: 16,
        oxygenSaturation: 99,
        temperature: 36.7,
      },
    },
    {
      id: "P007",
      name: "Michael Lee",
      age: 55,
      gender: "Male",
      triage: "Black",
      location: "ED Room 8",
      chiefComplaint: "Unresponsive, severe trauma",
      arrivalTime: "10:30 AM",
      status: "Deceased",
      vitalSigns: {
        bloodPressure: "0/0",
        heartRate: 0,
        respiratoryRate: 0,
        oxygenSaturation: 0,
        temperature: 36.0,
      },
      notes: "Pronounced at scene, brought in for documentation",
    },
    {
      id: "P008",
      name: "Emily Davis",
      age: 23,
      gender: "Female",
      triage: "Yellow",
      location: "ED Room 7",
      chiefComplaint: "Smoke inhalation, coughing",
      arrivalTime: "10:32 AM",
      status: "In Treatment",
      vitalSigns: {
        bloodPressure: "110/75",
        heartRate: 100,
        respiratoryRate: 22,
        oxygenSaturation: 94,
        temperature: 37.0,
      },
    },
    {
      id: "P009",
      name: "James Wilson",
      age: 35,
      gender: "Male",
      triage: "Green",
      location: "Waiting Area",
      chiefComplaint: "Minor burns, anxiety",
      arrivalTime: "10:35 AM",
      status: "Waiting",
      vitalSigns: {
        bloodPressure: "135/85",
        heartRate: 88,
        respiratoryRate: 18,
        oxygenSaturation: 98,
        temperature: 36.9,
      },
    },
    {
      id: "P010",
      name: "Linda Martinez",
      age: 72,
      gender: "Female",
      triage: "Red",
      location: "ED Room 3",
      chiefComplaint: "Severe burns, shock",
      arrivalTime: "10:38 AM",
      status: "In Treatment",
      vitalSigns: {
        bloodPressure: "85/55",
        heartRate: 130,
        respiratoryRate: 26,
        oxygenSaturation: 90,
        temperature: 36.5,
      },
      notes: "30% body surface area burns, IV fluids started",
    },
  ]
  
  // Sample resources for demo
  export const sampleResources: ResourceItem[] = [
    {
      id: "R001",
      name: "Tourniquets",
      category: "Supply",
      available: 24,
      total: 30,
      location: "Supply Cabinet A",
      status: "Limited",
    },
    {
      id: "R002",
      name: "IV Kits",
      category: "Supply",
      available: 45,
      total: 60,
      location: "Supply Cabinet B",
      status: "Adequate",
    },
    {
      id: "R003",
      name: "Ventilators",
      category: "Equipment",
      available: 3,
      total: 10,
      location: "Equipment Room",
      status: "Critical",
    },
    {
      id: "R004",
      name: "Cardiac Monitors",
      category: "Equipment",
      available: 8,
      total: 15,
      location: "Equipment Room",
      status: "Limited",
    },
    {
      id: "R005",
      name: "O-Negative Blood",
      category: "Blood",
      available: 8,
      total: 20,
      location: "Blood Bank",
      status: "Limited",
    },
    {
      id: "R006",
      name: "Stretchers",
      category: "Equipment",
      available: 12,
      total: 20,
      location: "Hallway Storage",
      status: "Limited",
    },
    {
      id: "R007",
      name: "Nurses",
      category: "Staff",
      available: 12,
      total: 18,
      location: "ED",
      status: "Limited",
    },
    {
      id: "R008",
      name: "Physicians",
      category: "Staff",
      available: 4,
      total: 6,
      location: "ED",
      status: "Limited",
    },
    {
      id: "R009",
      name: "Morphine",
      category: "Medication",
      available: 25,
      total: 30,
      location: "Medication Cabinet",
      status: "Adequate",
    },
    {
      id: "R010",
      name: "Burn Kits",
      category: "Supply",
      available: 5,
      total: 15,
      location: "Supply Cabinet C",
      status: "Critical",
    },
  ]
  
  // Sample alerts for demo
  export const sampleAlerts: AlertMessage[] = [
    {
      id: "A001",
      time: "10:45 AM",
      message: "Additional ambulances en route - ETA 5 minutes",
      severity: "info",
      sender: "EMS Dispatch",
      read: false,
    },
    {
      id: "A002",
      time: "10:38 AM",
      message: "Red Zone at 80% capacity - consider expanding to overflow area",
      severity: "warning",
      sender: "Charge RN",
      read: false,
    },
    {
      id: "A003",
      time: "10:32 AM",
      message: "Blood bank notified of increased need for O-negative",
      severity: "info",
      sender: "Lab",
      read: true,
    },
    {
      id: "A004",
      time: "10:28 AM",
      message: "First wave of patients arrived - 15 total, 6 critical",
      severity: "info",
      sender: "Triage",
      read: true,
    },
    {
      id: "A005",
      time: "10:15 AM",
      message: "Emergency Mode activated - Mass Casualty Incident",
      severity: "critical",
      sender: "System",
      read: true,
    },
  ]
  
  // Sample drill scenarios
  export const sampleDrillScenarios: DrillScenario[] = [
    {
      id: "D001",
      name: "Multi-Vehicle Accident",
      description: "Simulation of a 10-car pileup on the highway with multiple casualties of varying severity.",
      type: "Mass Casualty",
      patientCount: 25,
      expectedDuration: "2 hours",
      difficulty: "Moderate",
    },
    {
      id: "D002",
      name: "School Shooting Response",
      description: "Simulation of an active shooter event at a local school with multiple injuries.",
      type: "Active Shooter",
      patientCount: 15,
      expectedDuration: "1.5 hours",
      difficulty: "Difficult",
    },
    {
      id: "D003",
      name: "Chemical Spill",
      description: "Simulation of a chemical spill at a local factory with exposure victims.",
      type: "Chemical Exposure",
      patientCount: 20,
      expectedDuration: "2.5 hours",
      difficulty: "Difficult",
    },
    {
      id: "D004",
      name: "Tornado Aftermath",
      description: "Simulation of casualties following a tornado that damaged residential areas.",
      type: "Natural Disaster",
      patientCount: 30,
      expectedDuration: "3 hours",
      difficulty: "Moderate",
    },
    {
      id: "D005",
      name: "Bus Accident",
      description: "Simulation of a school bus accident with multiple pediatric patients.",
      type: "Mass Casualty",
      patientCount: 18,
      expectedDuration: "2 hours",
      difficulty: "Moderate",
    },
  ]
  
  // Function to get patients by triage category
  export const getPatientsByTriage = (patients: Patient[], triage: "Red" | "Yellow" | "Green" | "Black") => {
    return patients.filter((patient) => patient.triage === triage)
  }
  
  // Function to get resources by status
  export const getResourcesByStatus = (resources: ResourceItem[], status: "Adequate" | "Limited" | "Critical") => {
    return resources.filter((resource) => resource.status === status)
  }
  
  // Function to get unread alerts
  export const getUnreadAlerts = (alerts: AlertMessage[]) => {
    return alerts.filter((alert) => !alert.read)
  }
  
  