"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, MessageSquare, Upload, Clock, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Stats {
  totalDocuments: number
  totalUsers: number
  totalQueries: number
  recentDocuments: Array<{
    id: string
    name: string
    uploadedAt: string
    size: string
  }>
  recentQueries: Array<{
    id: string
    question: string
    timestamp: string
    documentName: string
  }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data fetch
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        // In a real app, fetch from API
        // const response = await fetch('/api/dashboard/stats');
        // const data = await response.json();

        // Mock data
        const mockData: Stats = {
          totalDocuments: 24,
          totalUsers: 8,
          totalQueries: 156,
          recentDocuments: [
            {
              id: "1",
              name: "Annual Report 2023.pdf",
              uploadedAt: "2023-05-15T10:30:00Z",
              size: "4.2 MB",
            },
            {
              id: "2",
              name: "Project Proposal.pdf",
              uploadedAt: "2023-05-14T14:45:00Z",
              size: "2.8 MB",
            },
            {
              id: "3",
              name: "Research Paper.pdf",
              uploadedAt: "2023-05-13T09:15:00Z",
              size: "5.1 MB",
            },
            {
              id: "4",
              name: "Meeting Minutes.pdf",
              uploadedAt: "2023-05-12T16:20:00Z",
              size: "1.5 MB",
            },
          ],
          recentQueries: [
            {
              id: "1",
              question: "What were the key findings in the research paper?",
              timestamp: "2023-05-15T11:30:00Z",
              documentName: "Research Paper.pdf",
            },
            {
              id: "2",
              question: "What is the budget allocation for Q3?",
              timestamp: "2023-05-15T10:45:00Z",
              documentName: "Annual Report 2023.pdf",
            },
            {
              id: "3",
              question: "Who is responsible for the marketing campaign?",
              timestamp: "2023-05-14T15:20:00Z",
              documentName: "Project Proposal.pdf",
            },
            {
              id: "4",
              question: "When is the next stakeholder meeting?",
              timestamp: "2023-05-14T14:10:00Z",
              documentName: "Meeting Minutes.pdf",
            },
          ],
        }

        setStats(mockData)
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your document management and Q&A activity</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/documents/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/qa">
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask Questions
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">+4 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalQueries}</div>
            <p className="text-xs text-muted-foreground">+23 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>You've used 42% of your storage quota</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>42% used</div>
              <div className="text-muted-foreground">4.2 GB / 10 GB</div>
            </div>
            <Progress value={42} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recent-documents">
        <TabsList>
          <TabsTrigger value="recent-documents">Recent Documents</TabsTrigger>
          <TabsTrigger value="recent-queries">Recent Queries</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Uploaded Documents</CardTitle>
              <CardDescription>You've uploaded {stats?.totalDocuments} documents in total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(doc.uploadedAt)}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/documents/${doc.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View document</span>
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent-queries" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Queries</CardTitle>
              <CardDescription>You've made {stats?.totalQueries} queries in total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentQueries.map((query) => (
                  <div key={query.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{query.question}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(query.timestamp)}</span>
                          <span>•</span>
                          <span>{query.documentName}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/qa?q=${encodeURIComponent(query.question)}`}>
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View query</span>
                      </Link>
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
