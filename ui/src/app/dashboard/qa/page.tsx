"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, FileText, Loader2, MessageSquare, Send, ThumbsDown, ThumbsUp, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Document {
  id: string
  name: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: {
    documentId: string
    documentName: string
    page: number
    excerpt: string
  }[]
}

export default function QAPage() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get("q") || ""
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [question, setQuestion] = useState(initialQuestion)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // const { toast } = useToast()

  useEffect(() => {
    // Fetch available documents
    const fetchDocuments = async () => {
      try {
        // In a real app, fetch from API
        const response = await fetch('http://localhost:3001/api/documents');
        const data = await response.json();

        // Mock data
        // const mockDocuments: Document[] = [
        //   { id: "1", name: "Annual Report 2023.pdf" },
        //   { id: "2", name: "Project Proposal.pdf" },
        //   { id: "3", name: "Research Paper.pdf" },
        //   { id: "4", name: "Meeting Minutes.pdf" },
        // ]

        // setDocuments(mockDocuments)
        setDocuments(data)
      } catch (error) {
        console.error("Failed to fetch documents:", error)
      }
    }

    fetchDocuments()
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) return

    if (selectedDocuments.length === 0) {
      // toast({
      //   variant: "destructive",
      //   title: "No documents selected",
      //   description: "Please select at least one document to query.",
      // })
      return
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      // In a real app, send to API
      // const response = await fetch('/api/qa', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     question,
      //     documentIds: selectedDocuments,
      //   }),
      // });
      // const data = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock response
      const mockResponse: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Based on the documents you've selected, I can provide the following information:\n\nThe annual report shows a 12% increase in revenue compared to the previous year. The project proposal outlines a timeline of 6 months with three major milestones. The research findings indicate a strong correlation between the variables studied with a confidence level of 95%.",
        timestamp: new Date(),
        sources: [
          {
            documentId: "1",
            documentName: "Annual Report 2023.pdf",
            page: 24,
            excerpt: "Year-over-year revenue increased by 12%, exceeding our projected target of 8%.",
          },
          {
            documentId: "2",
            documentName: "Project Proposal.pdf",
            page: 3,
            excerpt:
              "The project will be executed over a 6-month period with three major milestones scheduled at the 2-month, 4-month, and 6-month marks.",
          },
        ],
      }

      setMessages((prev) => [...prev, mockResponse])
      setQuestion("")
    } catch (error) {
      console.error("Error querying documents:", error)
      // toast({
      //   variant: "destructive",
      //   title: "Query failed",
      //   description: "There was an error processing your question. Please try again.",
      // })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeedback = (messageId: string, type: "positive" | "negative") => {
    // In a real app, send feedback to API
    // await fetch('/api/feedback', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     messageId,
    //     feedbackType: type,
    //   }),
    // });

    // toast({
    //   title: "Feedback received",
    //   description: `Thank you for your ${type} feedback.`,
    // })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Document Q&A</h2>
        <p className="text-muted-foreground">Ask questions about your documents and get AI-powered answers</p>
      </div>

      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="mt-4">
          <Card className="h-[calc(100vh-250px)] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>Select documents and ask questions to get insights</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="mb-4">
                <Label htmlFor="documents">Selected Documents</Label>
                <Select
                  value={selectedDocuments.length === 0 ? "" : "selected"}
                  onValueChange={(value) => {
                    if (value && value !== "selected") {
                      setSelectedDocuments((prev) => (prev.includes(value) ? prev : [...prev, value]))
                    }
                  }}
                >
                  <SelectTrigger id="documents">
                    <SelectValue placeholder="Select documents to query">
                      {selectedDocuments.length === 0
                        ? "Select documents to query"
                        : `${selectedDocuments.length} document(s) selected`}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {documents.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{doc.name}</span>
                          {selectedDocuments.includes(doc.id) && (
                            <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedDocuments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedDocuments.map((docId) => {
                      const doc = documents.find((d) => d.id === docId)
                      return (
                        <Badge key={docId} variant="secondary" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          <span>{doc?.name}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedDocuments((prev) => prev.filter((id) => id !== docId))}
                            className="ml-1 rounded-full hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {doc?.name}</span>
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
                      <MessageSquare className="h-10 w-10 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No messages yet. Start by asking a question about your documents.
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[80%] flex-col gap-2 rounded-lg p-4 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {message.role === "assistant" ? (
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>AI</AvatarFallback>
                              </Avatar>
                            ) : (
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>You</AvatarFallback>
                              </Avatar>
                            )}
                            <span className="text-xs">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-2 space-y-2">
                              <p className="text-xs font-medium">Sources:</p>
                              {message.sources.map((source, index) => (
                                <div key={index} className="rounded border p-2 text-xs">
                                  <p className="font-medium">
                                    {source.documentName} (Page {source.page})
                                  </p>
                                  <p className="mt-1 italic">"{source.excerpt}"</p>
                                </div>
                              ))}
                            </div>
                          )}
                          {message.role === "assistant" && (
                            <div className="mt-2 flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback(message.id, "positive")}
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span className="sr-only">Helpful</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleFeedback(message.id, "negative")}
                              >
                                <ThumbsDown className="h-4 w-4" />
                                <span className="sr-only">Not helpful</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <Input
                  placeholder="Ask a question about your documents..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !question.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Documents</CardTitle>
              <CardDescription>Select documents to include in your queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                      </div>
                    </div>
                    <Button
                      variant={selectedDocuments.includes(doc.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedDocuments((prev) =>
                          prev.includes(doc.id) ? prev.filter((id) => id !== doc.id) : [...prev, doc.id],
                        )
                      }}
                    >
                      {selectedDocuments.includes(doc.id) ? "Selected" : "Select"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
