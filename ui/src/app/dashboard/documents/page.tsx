"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Upload, MoreHorizontal, Download, Trash2, Edit, Eye, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/components/ui/use-toast"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  status: "processed" | "processing" | "failed"
  tags: string[]
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  // const { toast } = useToast()

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true)
      try {
        // In a real app, fetch from API
        const response = await fetch('http://localhost:3001/api/documents');
        const data = await response.json();

        // Mock data
        // const mockDocuments: Document[] = [
        //   {
        //     id: "1",
        //     name: "Annual Report 2023.pdf",
        //     type: "PDF",
        //     size: "4.2 MB",
        //     uploadedAt: "2023-05-15T10:30:00Z",
        //     status: "processed",
        //     tags: ["finance", "report"],
        //   },
        //   {
        //     id: "2",
        //     name: "Project Proposal.pdf",
        //     type: "PDF",
        //     size: "2.8 MB",
        //     uploadedAt: "2023-05-14T14:45:00Z",
        //     status: "processed",
        //     tags: ["project", "proposal"],
        //   },
        //   {
        //     id: "3",
        //     name: "Research Paper.pdf",
        //     type: "PDF",
        //     size: "5.1 MB",
        //     uploadedAt: "2023-05-13T09:15:00Z",
        //     status: "processed",
        //     tags: ["research", "academic"],
        //   },
        //   {
        //     id: "4",
        //     name: "Meeting Minutes.pdf",
        //     type: "PDF",
        //     size: "1.5 MB",
        //     uploadedAt: "2023-05-12T16:20:00Z",
        //     status: "processed",
        //     tags: ["meeting", "notes"],
        //   },
        //   {
        //     id: "5",
        //     name: "Product Specifications.pdf",
        //     type: "PDF",
        //     size: "3.7 MB",
        //     uploadedAt: "2023-05-11T11:10:00Z",
        //     status: "processing",
        //     tags: ["product", "specifications"],
        //   },
        //   {
        //     id: "6",
        //     name: "Customer Feedback.pdf",
        //     type: "PDF",
        //     size: "2.3 MB",
        //     uploadedAt: "2023-05-10T13:25:00Z",
        //     status: "failed",
        //     tags: ["customer", "feedback"],
        //   },
        // ]

        // setDocuments(mockDocuments)
        setDocuments(data)
      } catch (error) {
        console.error("Failed to fetch documents:", error)
        // toast({
        //   variant: "destructive",
        //   title: "Error",
        //   description: "Failed to load documents. Please try again.",
        // })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  // }, [toast])
}, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "processed":
        return <Badge variant="default">Processed</Badge>
      case "processing":
        return <Badge variant="outline">Processing</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return null
    }
  }

  const handleDelete = (id: string) => {
    // In a real app, call API to delete
    // await fetch(`/api/documents/${id}`, { method: 'DELETE' });

    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    // toast({
    //   title: "Document deleted",
    //   description: "The document has been successfully deleted.",
    // })
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">Manage and search through your uploaded documents</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/documents/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Your Documents</CardTitle>
              <CardDescription>You have {documents.length} documents in total</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-8 md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Loading documents...</p>
              </div>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2">
              <FileText className="h-10 w-10 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                {searchQuery
                  ? "No documents found matching your search"
                  : "No documents found. Upload your first document to get started."}
              </p>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-2">
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{formatDate(doc.uploadedAt)}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/documents/${doc.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/documents/${doc.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => handleDelete(doc.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDocuments.length} of {documents.length} documents
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
