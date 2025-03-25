"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Message, RAGResponse } from "@/types/rag"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Loader2, Brain, Filter } from "lucide-react"
import RAGMessage from "./rag-message"
import { v4 as uuidv4 } from "uuid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RAGAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-welcome",
      role: "assistant",
      content: "Welcome to the SurgeReady Knowledge Assistant. How can I help you with emergency protocols today?",
      timestamp: Date.now(),
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filters
  const [emergencyType, setEmergencyType] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [useFilters, setUseFilters] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Prepare filters if enabled
      const filters = useFilters
        ? {
            ...(emergencyType ? { emergencyType } : {}),
            ...(category ? { category } : {}),
          }
        : {}

      // Send request to RAG endpoint
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage.content,
          filters,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = (await response.json()) as RAGResponse

      // Add assistant message with sources
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.answer,
        timestamp: Date.now(),
        sources: data.sources,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting response:", error)

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-red-600" />
          <h3 className="font-medium">Emergency Knowledge Assistant</h3>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Knowledge Filters</SheetTitle>
              <SheetDescription>Filter the knowledge base to get more relevant responses.</SheetDescription>
            </SheetHeader>

            <div className="py-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-filters"
                  checked={useFilters}
                  onCheckedChange={(checked) => setUseFilters(checked as boolean)}
                />
                <Label htmlFor="use-filters">Enable filters</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency-type">Emergency Type</Label>
                <Select value={emergencyType} onValueChange={setEmergencyType} disabled={!useFilters}>
                  <SelectTrigger id="emergency-type">
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="Mass Casualty">Mass Casualty</SelectItem>
                    <SelectItem value="Chemical Exposure">Chemical Exposure</SelectItem>
                    <SelectItem value="Active Shooter">Active Shooter</SelectItem>
                    <SelectItem value="Natural Disaster">Natural Disaster</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={!useFilters}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="Protocol">Protocol</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Triage">Triage</SelectItem>
                    <SelectItem value="HICS">HICS</SelectItem>
                    <SelectItem value="Decontamination">Decontamination</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="flex-1 overflow-hidden border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-4">
              {messages.map((message) => (
                <RAGMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about emergency protocols, procedures, or best practices..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

