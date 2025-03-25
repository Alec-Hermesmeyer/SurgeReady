"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Upload,
  FileText,
  Trash2,
  Plus,
  RefreshCw,
  Database,
  FileUp,
  ListFilter,
  Check,
  AlertCircle,
  Search,
} from "lucide-react"
import type { EmergencyDocument, ProcessingResult } from "@/types/rag"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function DocumentsAdminPage() {
  // Document upload state
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [emergencyType, setEmergencyType] = useState("")
  const [tags, setTags] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<ProcessingResult | null>(null)

  // Document list state
  const [documents, setDocuments] = useState<EmergencyDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(20)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Load documents on mount and when page changes
  useEffect(() => {
    fetchDocuments()
  }, [currentPage])

  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/documents`)
      if (!response.ok) {
        throw new Error("Failed to fetch documents")
      }

      const data = await response.json()
      setDocuments(data.documents)
      setTotalCount(data.count)
    } catch (error) {
      console.error("Error fetching documents:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file && !text) {
      alert("Please provide either a file or text content")
      return
    }

    setIsUploading(true)
    setUploadResult(null)

    try {
      const formData = new FormData()

      if (file) {
        formData.append("file", file)
        console.log("Added file to form data:", file.name, file.type, file.size)
      }

      if (text) {
        formData.append("text", text)
        console.log("Added text to form data, length:", text.length)
      }

      // Prepare metadata
      const metadata = {
        title: title || (file ? file.name : "Untitled Document"),
        category: category !== "none" ? category : undefined,
        emergencyType: emergencyType !== "none" ? emergencyType : undefined,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      }

      console.log("Metadata being sent:", metadata)
      formData.append("metadata", JSON.stringify(metadata))

      // Send the request
      console.log("Sending request to /api/admin/documents")
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      console.log("Response received:", result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload document")
      }

      setUploadResult(result)

      // Reset form on success
      if (result.success) {
        setFile(null)
        setText("")
        setTitle("")
        setCategory("")
        setEmergencyType("")
        setTags("")

        // Refresh document list
        fetchDocuments()
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      setUploadResult({
        success: false,
        documentCount: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/documents?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete document")
      }

      // Refresh document list
      fetchDocuments()
    } catch (error) {
      console.error("Error deleting document:", error)
      alert("Failed to delete document")
    }
  }

  // Filter documents based on search term and category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchTerm === "" ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.metadata.title && doc.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      filterCategory === "all" || (doc.metadata.category && doc.metadata.category === filterCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Knowledge Base Management</h1>
              <p className="text-gray-500 dark:text-gray-400">Add, manage, and organize emergency response documents</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchDocuments} className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm">
                <Database className="h-4 w-4 mr-1" />
                <span>Database Status</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 px-8">
        <Tabs defaultValue="upload" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="upload" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <FileUp className="h-4 w-4 mr-2" />
                Upload Documents
              </TabsTrigger>
              <TabsTrigger value="manage" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <ListFilter className="h-4 w-4 mr-2 ml-2" />
                Manage Documents
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{totalCount} documents in database</span>
            </div>
          </div>

          <TabsContent value="upload" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardHeader className="bg-gray-100 dark:bg-gray-800">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <FileUp className="h-5 w-5 text-red-600" />
                      Add New Document
                    </CardTitle>
                    <CardDescription>Upload a file or paste text to add to the knowledge base</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-base">
                          Document Title
                        </Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter document title"
                          className="border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-base">
                            Category
                          </Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category" className="border-gray-300 dark:border-gray-600">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="Protocol">Protocol</SelectItem>
                              <SelectItem value="Training">Training</SelectItem>
                              <SelectItem value="Equipment">Equipment</SelectItem>
                              <SelectItem value="Triage">Triage</SelectItem>
                              <SelectItem value="HICS">HICS</SelectItem>
                              <SelectItem value="Decontamination">Decontamination</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="emergency-type" className="text-base">
                            Emergency Type
                          </Label>
                          <Select value={emergencyType} onValueChange={setEmergencyType}>
                            <SelectTrigger id="emergency-type" className="border-gray-300 dark:border-gray-600">
                              <SelectValue placeholder="Select emergency type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="Mass Casualty">Mass Casualty</SelectItem>
                              <SelectItem value="Chemical Exposure">Chemical Exposure</SelectItem>
                              <SelectItem value="Active Shooter">Active Shooter</SelectItem>
                              <SelectItem value="Natural Disaster">Natural Disaster</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags" className="text-base">
                          Tags (comma separated)
                        </Label>
                        <Input
                          id="tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="e.g., emergency, protocol, training"
                          className="border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="file" className="text-base">
                          Upload File
                        </Label>
                        <Input
                          id="file"
                          type="file"
                          onChange={handleFileChange}
                          accept=".txt,.md,.pdf,.docx"
                          className="border-gray-300 dark:border-gray-600"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Supported formats: .txt, .md, .pdf, .docx
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="text" className="text-base">
                            Or Paste Text
                          </Label>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{text.length} characters</span>
                        </div>
                        <Textarea
                          id="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Paste document text here..."
                          rows={8}
                          className="border-gray-300 dark:border-gray-600 resize-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 p-4">
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading || (!file && !text)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardHeader className="bg-gray-100 dark:bg-gray-800">
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      Upload Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {uploadResult ? (
                      uploadResult.success ? (
                        <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300">
                          <Check className="h-4 w-4" />
                          <AlertTitle>Success!</AlertTitle>
                          <AlertDescription>
                            Document processed and added to the knowledge base.
                            <br />
                            {uploadResult.documentCount} chunks created.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert className="bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{uploadResult.error || "Failed to process document"}</AlertDescription>
                        </Alert>
                      )
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>Upload a document to see status</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700">
                  <CardHeader className="bg-gray-100 dark:bg-gray-800">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-red-600" />
                      Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-red-600 dark:text-red-400" />
                        </div>
                        <span>Documents are automatically split into chunks for better retrieval</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-red-600 dark:text-red-400" />
                        </div>
                        <span>Add detailed metadata to improve search accuracy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-red-600 dark:text-red-400" />
                        </div>
                        <span>Use specific categories and tags to help filter results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-red-600 dark:text-red-400" />
                        </div>
                        <span>Plain text works best for accurate embeddings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-red-600 dark:text-red-400" />
                        </div>
                        <span>Large documents may take longer to process</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="mt-0">
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardHeader className="bg-gray-100 dark:bg-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Database className="h-5 w-5 text-red-600" />
                    Document Library
                  </CardTitle>
                  <CardDescription>Manage documents in your knowledge base</CardDescription>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search documents..."
                      className="pl-9 w-full sm:w-[200px] border-gray-300 dark:border-gray-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-[180px] border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Protocol">Protocol</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Triage">Triage</SelectItem>
                      <SelectItem value="HICS">HICS</SelectItem>
                      <SelectItem value="Decontamination">Decontamination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                      <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading documents...</span>
                    </div>
                  </div>
                ) : filteredDocuments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                        <TableRow>
                          <TableHead className="font-medium">Title/Content</TableHead>
                          <TableHead className="font-medium">Metadata</TableHead>
                          <TableHead className="font-medium">Date Added</TableHead>
                          <TableHead className="w-[100px] font-medium">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.map((doc) => (
                          <TableRow key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <TableCell className="font-medium">
                              {doc.metadata.title ? (
                                <div>
                                  <div className="font-medium text-red-600 dark:text-red-400">{doc.metadata.title}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                                    {doc.content.substring(0, 100)}...
                                  </div>
                                </div>
                              ) : (
                                <div className="truncate max-w-[300px]">{doc.content.substring(0, 100)}...</div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {doc.metadata.category && (
                                  <Badge
                                    variant="outline"
                                    className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                                  >
                                    {doc.metadata.category}
                                  </Badge>
                                )}
                                {doc.metadata.emergencyType && (
                                  <Badge
                                    variant="outline"
                                    className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                                  >
                                    {doc.metadata.emergencyType}
                                  </Badge>
                                )}
                                {doc.metadata.tags &&
                                  doc.metadata.tags.map((tag: string) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                              </div>
                            </TableCell>
                            <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteDocument(doc.id)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <h3 className="text-lg font-medium mb-2">No documents found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                      {searchTerm || filterCategory !== "all"
                        ? "No documents match your search criteria. Try adjusting your filters."
                        : "Your knowledge base is empty. Upload documents to get started."}
                    </p>
                    <Button
                      onClick={() => {
                        const uploadTab = document.querySelector('[data-value="upload"]') as HTMLElement | null;
                        uploadTab?.click();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                  </div>
                )}

                {filteredDocuments.length > 0 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Showing {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, totalCount)} of{" "}
                      {totalCount}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                        className="border-gray-300 dark:border-gray-600"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={(currentPage + 1) * pageSize >= totalCount}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="border-gray-300 dark:border-gray-600"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

