"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"

interface TourStep {
  title: string
  description: string
  target: string // CSS selector for the element to highlight
  position: "top" | "right" | "bottom" | "left"
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to SurgeReady",
    description: "This tour will guide you through the key features of the emergency toolkit.",
    target: "body",
    position: "top",
  },
  {
    title: "Emergency Activation",
    description: "Click here to activate emergency mode during a real mass casualty event.",
    target: "button:contains('Activate Emergency')",
    position: "bottom",
  },
  {
    title: "Drill Mode",
    description: "Practice with drill scenarios without activating a full emergency response.",
    target: "button:contains('Start Drill Mode')",
    position: "bottom",
  },
  {
    title: "Patient Management",
    description: "Track and manage patients with different triage levels.",
    target: "button:contains('Patients')",
    position: "right",
  },
  {
    title: "Resource Management",
    description: "Monitor and request critical supplies and equipment.",
    target: "button:contains('Resources')",
    position: "right",
  },
  {
    title: "Alert Center",
    description: "Send and receive important alerts during an emergency.",
    target: "button:contains('Alerts')",
    position: "right",
  },
  {
    title: "Configuration",
    description: "Set up your emergency response protocols before an event occurs.",
    target: "button[value='configuration']",
    position: "bottom",
  },
]

export function DemoTour({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    // Highlight the target element
    const targetElement = document.querySelector(tourSteps[currentStep].target)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
      // Add a highlight class or effect
    }
  }, [currentStep])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0" onClick={onClose} />

      <Card className="w-full max-w-md pointer-events-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{tourSteps[currentStep].title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>{tourSteps[currentStep].description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {tourSteps.length}
            </span>
            <Button onClick={handleNext}>
              {currentStep === tourSteps.length - 1 ? (
                "Finish"
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export function DemoTourButton() {
  const [showTour, setShowTour] = useState(false)

  return (
    <>
      <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowTour(true)}>
        <Play className="h-4 w-4" />
        Start Demo Tour
      </Button>

      {showTour && <DemoTour onClose={() => setShowTour(false)} />}
    </>
  )
}

