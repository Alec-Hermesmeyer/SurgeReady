export interface EmergencyScenario {
  id: string
  name: string
  description: string
  type: "mass-casualty" | "active-shooter" | "chemical" | "natural-disaster" | "pandemic" | "building-collapse"
  severity: "low" | "medium" | "high" | "extreme"
  estimatedDuration: number // minutes
  expectedPatients: number
  resourceIntensity: "low" | "medium" | "high"
  briefing: string
  objectives: string[]
  initialPatients?: number
  patientArrivalPattern: "steady" | "surge" | "waves" | "frontloaded"
  resourceChallenges: string[]
  communicationChallenges: string[]
  timeline: ScenarioEvent[]
}

export interface ScenarioEvent {
  timeMinutes: number
  type: "patient-arrival" | "resource-depletion" | "external-communication" | "staff-change" | "medical-emergency"
  title: string
  description: string
  impact: string
  severity: "info" | "warning" | "critical"
}

export const emergencyScenarios: EmergencyScenario[] = [
  {
    id: "multi-vehicle-accident",
    name: "Multi-Vehicle Highway Accident",
    description: "Major highway accident involving a bus and multiple vehicles during rush hour",
    type: "mass-casualty",
    severity: "high",
    estimatedDuration: 180,
    expectedPatients: 35,
    resourceIntensity: "high",
    briefing: "A tour bus collided with multiple vehicles on Interstate 95 during morning rush hour. Initial reports indicate 35+ casualties with multiple critical injuries. The accident has blocked traffic, complicating EMS response. Weather conditions are poor with heavy rain.",
    objectives: [
      "Establish incident command structure within 5 minutes",
      "Triage all patients within 30 minutes",
      "Achieve 90% bed occupancy management",
      "Coordinate with 3+ receiving hospitals",
      "Maintain resource availability above critical levels",
      "Complete family notification process"
    ],
    initialPatients: 8,
    patientArrivalPattern: "surge",
    resourceChallenges: [
      "Blood bank depletion (O-negative)",
      "OR capacity constraints",
      "Trauma surgeon availability",
      "Ventilator shortage",
      "ICU bed availability"
    ],
    communicationChallenges: [
      "Multiple ambulance services coordinating",
      "Family member inquiries overwhelming phone lines",
      "Media management required",
      "Translation services needed for tour group"
    ],
    timeline: [
      {
        timeMinutes: 0,
        type: "external-communication",
        title: "Initial Emergency Alert",
        description: "EMS dispatch reports major MVA with multiple casualties",
        impact: "Emergency activation triggered",
        severity: "critical"
      },
      {
        timeMinutes: 5,
        type: "patient-arrival",
        title: "First Wave Arrivals",
        description: "8 patients arrive via ambulance, 3 critical",
        impact: "Immediate trauma bay activation needed",
        severity: "critical"
      },
      {
        timeMinutes: 15,
        type: "patient-arrival",
        title: "Second Wave",
        description: "12 additional patients, including 2 pediatric",
        impact: "Pediatric trauma team activation",
        severity: "warning"
      },
      {
        timeMinutes: 30,
        type: "resource-depletion",
        title: "Blood Bank Alert",
        description: "O-negative blood dropping to critical levels",
        impact: "Blood bank emergency protocol initiated",
        severity: "critical"
      },
      {
        timeMinutes: 45,
        type: "external-communication",
        title: "Media Arrival",
        description: "News crews arriving, families gathering",
        impact: "PIO activation needed, family coordination required",
        severity: "warning"
      },
      {
        timeMinutes: 60,
        type: "patient-arrival",
        title: "Final Wave",
        description: "Last 15 patients from scene, mostly walking wounded",
        impact: "Fast track processing needed",
        severity: "info"
      },
      {
        timeMinutes: 90,
        type: "staff-change",
        title: "Additional Staff Arrival",
        description: "Call-back staff reporting for duty",
        impact: "Staffing levels improving",
        severity: "info"
      }
    ]
  },
  {
    id: "active-shooter-hospital",
    name: "Active Shooter in Medical District",
    description: "Active shooter situation at nearby medical plaza with casualties and security concerns",
    type: "active-shooter",
    severity: "extreme",
    estimatedDuration: 240,
    expectedPatients: 18,
    resourceIntensity: "high",
    briefing: "Active shooter situation at the medical plaza across the street. Law enforcement responding. Multiple victims with gunshot wounds expected. Hospital must maintain security protocols while treating casualties. Potential for additional threats.",
    objectives: [
      "Implement lockdown procedures immediately",
      "Coordinate with law enforcement on-scene",
      "Establish secure casualty receiving area",
      "Manage hospital security and visitor restrictions",
      "Provide trauma care under heightened security",
      "Support staff psychological well-being"
    ],
    initialPatients: 3,
    patientArrivalPattern: "waves",
    resourceChallenges: [
      "Security personnel allocation",
      "Trauma surgery capacity",
      "Blood products for GSW patients",
      "Mental health support staff"
    ],
    communicationChallenges: [
      "Law enforcement coordination",
      "Staff safety communications",
      "Family lockdown explanations",
      "Media containment"
    ],
    timeline: [
      {
        timeMinutes: 0,
        type: "external-communication",
        title: "Active Shooter Alert",
        description: "Police dispatch reports active shooter at medical plaza",
        impact: "Immediate lockdown procedures initiated",
        severity: "critical"
      },
      {
        timeMinutes: 10,
        type: "patient-arrival",
        title: "First Casualties",
        description: "3 GSW patients arrive via police escort",
        impact: "Trauma team activation under security protocols",
        severity: "critical"
      },
      {
        timeMinutes: 25,
        type: "external-communication",
        title: "All Clear Signal",
        description: "Law enforcement confirms shooter neutralized",
        impact: "Lockdown partially lifted, normal operations resume",
        severity: "warning"
      },
      {
        timeMinutes: 30,
        type: "patient-arrival",
        title: "Additional Victims",
        description: "8 more victims arrive, mix of GSW and trauma from escape",
        impact: "Continued trauma operations needed",
        severity: "critical"
      },
      {
        timeMinutes: 60,
        type: "staff-change",
        title: "Psychological Support",
        description: "Crisis counselors arrive for staff and families",
        impact: "Mental health support available",
        severity: "info"
      }
    ]
  },
  {
    id: "chemical-spill-train",
    name: "Hazardous Chemical Train Derailment",
    description: "Train derailment with chemical spill requiring decontamination protocols",
    type: "chemical",
    severity: "extreme",
    estimatedDuration: 360,
    expectedPatients: 45,
    resourceIntensity: "high",
    briefing: "Freight train carrying industrial chemicals derailed 2 miles upwind from hospital. Chemical cloud potentially affecting residential area. Multiple casualties with chemical exposure expected. Decontamination protocols must be activated.",
    objectives: [
      "Activate decontamination unit within 10 minutes",
      "Establish hot/warm/cold zones",
      "Coordinate with HAZMAT teams",
      "Manage contaminated vs. clean patient areas",
      "Monitor staff exposure levels",
      "Prepare for potential hospital evacuation"
    ],
    initialPatients: 5,
    patientArrivalPattern: "waves",
    resourceChallenges: [
      "Decontamination supplies",
      "Personal protective equipment",
      "Chemical antidotes",
      "Isolation room capacity",
      "Specialized nursing staff"
    ],
    communicationChallenges: [
      "HAZMAT team coordination",
      "EPA/environmental agencies",
      "Community evacuation orders",
      "Specialized medical consultations"
    ],
    timeline: [
      {
        timeMinutes: 0,
        type: "external-communication",
        title: "HAZMAT Alert",
        description: "Fire department reports train derailment with chemical leak",
        impact: "Decontamination protocols activated",
        severity: "critical"
      },
      {
        timeMinutes: 15,
        type: "patient-arrival",
        title: "First Exposed Patients",
        description: "5 patients with chemical exposure symptoms",
        impact: "Decontamination process begins",
        severity: "critical"
      },
      {
        timeMinutes: 45,
        type: "external-communication",
        title: "Wind Direction Change",
        description: "Weather service reports wind shift toward hospital",
        impact: "Hospital evacuation procedures considered",
        severity: "critical"
      },
      {
        timeMinutes: 90,
        type: "patient-arrival",
        title: "Mass Casualties",
        description: "20 residents evacuated with exposure symptoms",
        impact: "Decontamination capacity stretched",
        severity: "critical"
      },
      {
        timeMinutes: 180,
        type: "resource-depletion",
        title: "Antidote Shortage",
        description: "Specific chemical antidotes running low",
        impact: "Emergency pharmaceutical requests sent",
        severity: "critical"
      }
    ]
  },
  {
    id: "building-collapse-earthquake",
    name: "Earthquake Building Collapse",
    description: "6.2 magnitude earthquake causes major building collapse in downtown area",
    type: "building-collapse",
    severity: "extreme",
    estimatedDuration: 480,
    expectedPatients: 75,
    resourceIntensity: "high",
    briefing: "6.2 earthquake struck during business hours, causing partial collapse of a 12-story office building. Urban search and rescue teams deployed. Expect prolonged patient arrivals with crush injuries, fractures, and respiratory complications from dust exposure.",
    objectives: [
      "Manage sustained patient flow over 8+ hours",
      "Coordinate with multiple EMS agencies",
      "Handle complex orthopedic and trauma cases",
      "Manage family reunification center",
      "Support search and rescue medical needs",
      "Prepare for potential aftershocks"
    ],
    initialPatients: 12,
    patientArrivalPattern: "steady",
    resourceChallenges: [
      "Orthopedic surgery capacity",
      "Blood bank reserves",
      "Dialysis supplies for crush syndrome",
      "Respiratory therapy equipment",
      "Physical therapy staff"
    ],
    communicationChallenges: [
      "Search and rescue teams",
      "Building collapse specialists",
      "Family reunification coordination",
      "Regional hospital coordination"
    ],
    timeline: [
      {
        timeMinutes: 0,
        type: "external-communication",
        title: "Earthquake Alert",
        description: "6.2 magnitude earthquake, building collapse reported",
        impact: "Mass casualty protocols activated",
        severity: "critical"
      },
      {
        timeMinutes: 20,
        type: "patient-arrival",
        title: "First Casualties",
        description: "12 patients from initial rescue efforts",
        impact: "Trauma and orthopedic teams activated",
        severity: "critical"
      },
      {
        timeMinutes: 60,
        type: "external-communication",
        title: "Aftershock Warning",
        description: "Seismologists warn of potential aftershocks",
        impact: "Hospital structural assessment ordered",
        severity: "warning"
      },
      {
        timeMinutes: 120,
        type: "patient-arrival",
        title: "Search and Rescue Wave",
        description: "25 patients extracted from collapsed sections",
        impact: "Crush syndrome protocols activated",
        severity: "critical"
      },
      {
        timeMinutes: 240,
        type: "resource-depletion",
        title: "Orthopedic Supplies Low",
        description: "Surgical hardware and casting materials depleted",
        impact: "Emergency supply requests to other facilities",
        severity: "warning"
      },
      {
        timeMinutes: 360,
        type: "patient-arrival",
        title: "Final Extractions",
        description: "Last survivors extracted, search shifts to recovery",
        impact: "Patient flow transitions to rehabilitation focus",
        severity: "info"
      }
    ]
  },
  {
    id: "pandemic-surge",
    name: "Pandemic Respiratory Illness Surge",
    description: "Sudden surge in severe respiratory illness overwhelming normal capacity",
    type: "pandemic",
    severity: "high",
    estimatedDuration: 720,
    expectedPatients: 60,
    resourceIntensity: "high",
    briefing: "Novel respiratory pathogen causing severe illness. ICU capacity exceeded, ventilator shortage imminent. Need to implement crisis standards of care and alternative care sites. PPE conservation protocols in effect.",
    objectives: [
      "Implement crisis standards of care",
      "Optimize ventilator allocation",
      "Establish alternative care areas",
      "Maintain staff safety with limited PPE",
      "Coordinate regional patient transfers",
      "Support staff wellness during extended operations"
    ],
    initialPatients: 15,
    patientArrivalPattern: "steady",
    resourceChallenges: [
      "Ventilator availability",
      "ICU nursing staff",
      "PPE conservation",
      "Oxygen supply capacity",
      "Isolation room capacity"
    ],
    communicationChallenges: [
      "Regional hospital coordination",
      "Public health reporting",
      "Family visitation restrictions",
      "Staff scheduling modifications"
    ],
    timeline: [
      {
        timeMinutes: 0,
        type: "external-communication",
        title: "Surge Alert",
        description: "ICU census at 95%, multiple respiratory admissions",
        impact: "Surge capacity protocols activated",
        severity: "critical"
      },
      {
        timeMinutes: 30,
        type: "patient-arrival",
        title: "Respiratory Patients",
        description: "15 patients requiring immediate respiratory support",
        impact: "All available ventilators in use",
        severity: "critical"
      },
      {
        timeMinutes: 120,
        type: "resource-depletion",
        title: "Ventilator Shortage",
        description: "No available ventilators, crisis protocols needed",
        impact: "Crisis standards of care implemented",
        severity: "critical"
      },
      {
        timeMinutes: 180,
        type: "external-communication",
        title: "Alternative Care Site",
        description: "Hospital cafeteria converted to respiratory unit",
        impact: "Additional surge capacity available",
        severity: "warning"
      },
      {
        timeMinutes: 360,
        type: "staff-change",
        title: "Staff Exposure",
        description: "5 nurses quarantined due to exposure",
        impact: "Staffing challenges intensified",
        severity: "warning"
      },
      {
        timeMinutes: 480,
        type: "external-communication",
        title: "Regional Coordination",
        description: "Patient transfers to other facilities arranged",
        impact: "Some pressure relieved on local capacity",
        severity: "info"
      }
    ]
  }
]

export function getScenarioById(id: string): EmergencyScenario | undefined {
  return emergencyScenarios.find(scenario => scenario.id === id)
}

export function getScenariosByType(type: EmergencyScenario['type']): EmergencyScenario[] {
  return emergencyScenarios.filter(scenario => scenario.type === type)
}

export function getScenariosBySeverity(severity: EmergencyScenario['severity']): EmergencyScenario[] {
  return emergencyScenarios.filter(scenario => scenario.severity === severity)
} 