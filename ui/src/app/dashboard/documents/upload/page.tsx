"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"
import { FileUp, X, File, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function UploadDocumentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  // const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()])
      }
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleUpload = async () => {
    if (!file) {
      // toast({
      //   variant: "destructive",
      //   title: "No file selected",
      //   description: "Please select a file to upload.",
      // })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 200)

    try {
      // In a real app, use FormData to upload the file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);
      formData.append("tags", JSON.stringify(tags));

      const response = await fetch("http://localhost:3001/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setUploadProgress(100)

      // toast({
      //   title: "Document uploaded",
      //   description: "Your document has been successfully uploaded and is being processed.",
      // })

      // Redirect to documents page after a short delay
      setTimeout(() => {
        router.push("/dashboard/documents")
      }, 1000)
    } catch (error) {
      console.error("Upload error:", error)
      // toast({
      //   variant: "destructive",
      //   title: "Upload failed",
      //   description: "There was an error uploading your document. Please try again.",
      // })
    } finally {
      clearInterval(interval)
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Document</h2>
        <p className="text-muted-foreground">Upload a new document to analyze and query</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Details</CardTitle>
          <CardDescription>Provide information about the document you're uploading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center ${
              file ? "border-primary" : "border-border"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <File className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <FileUp className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="font-medium">Drag & drop your file here</p>
                  <p className="text-sm text-muted-foreground">Supports PDF documents up to 10MB</p>
                </div>
                <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                  Browse Files
                </Button>
                <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a description for this document"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-muted">
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag} tag</span>
                  </button>
                </Badge>
              ))}
              <Input
                id="tags"
                placeholder="Add tags (press Enter)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Press Enter to add a tag. Tags help with organization and searching.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading ({uploadProgress}%)
              </>
            ) : (
              "Upload Document"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
