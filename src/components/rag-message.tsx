"use client"

import type { Message } from "@/types/rag"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Bot, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface RAGMessageProps {
  message: Message
}

export default function RAGMessage({ message }: RAGMessageProps) {
  const [showSources, setShowSources] = useState(false)

  const hasSources = message.sources && message.sources.length > 0

  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : "order-2"}`}>
        <Card
          className={`
          ${
            message.role === "user"
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }
        `}
        >
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div
                className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${
                  message.role === "user"
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                    : "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300"
                }
              `}
              >
                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>

              <div className="flex-1">
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>

                {hasSources && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setShowSources(!showSources)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      {showSources ? "Hide Sources" : "Show Sources"}
                    </Button>

                    {showSources && (
                      <div className="mt-2 border-t pt-2 text-xs">
                        <p className="font-medium mb-1">Sources:</p>
                        <ul className="space-y-2">
                          {(message.sources ?? []).map((source, index) => (
                            <li key={index} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                              <div className="flex flex-wrap gap-1 mb-1">
                                {source.metadata.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {source.metadata.category}
                                  </Badge>
                                )}
                                {source.metadata.emergencyType && (
                                  <Badge variant="outline" className="text-xs">
                                    {source.metadata.emergencyType}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs opacity-80">{source.content.substring(0, 150)}...</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-500 mt-1 px-2">{new Date(message.timestamp).toLocaleTimeString()}</div>
      </div>
    </div>
  )
}

