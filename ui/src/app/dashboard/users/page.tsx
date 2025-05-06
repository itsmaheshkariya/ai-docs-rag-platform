"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/components/ui/use-toast"
import { Search, MoreHorizontal, UserPlus, Edit, Trash2, Shield, User, Users, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserData {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "inactive"
  lastActive: string
  documentsUploaded: number
  queriesRun: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as const,
  })
  // const { toast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        // In a real app, fetch from API
        const response = await fetch('http://localhost:3001/api/users');
        const data = await response.json();

        // Mock data
        // const mockUsers: UserData[] = [
        //   {
        //     id: "1",
        //     name: "John Doe",
        //     email: "john.doe@example.com",
        //     role: "admin",
        //     status: "active",
        //     lastActive: "2023-05-15T10:30:00Z",
        //     documentsUploaded: 12,
        //     queriesRun: 45,
        //   },
        //   {
        //     id: "2",
        //     name: "Jane Smith",
        //     email: "jane.smith@example.com",
        //     role: "editor",
        //     status: "active",
        //     lastActive: "2023-05-14T14:45:00Z",
        //     documentsUploaded: 8,
        //     queriesRun: 32,
        //   },
        //   {
        //     id: "3",
        //     name: "Bob Johnson",
        //     email: "bob.johnson@example.com",
        //     role: "viewer",
        //     status: "inactive",
        //     lastActive: "2023-05-10T09:15:00Z",
        //     documentsUploaded: 3,
        //     queriesRun: 15,
        //   },
        //   {
        //     id: "4",
        //     name: "Alice Williams",
        //     email: "alice.williams@example.com",
        //     role: "editor",
        //     status: "active",
        //     lastActive: "2023-05-15T08:20:00Z",
        //     documentsUploaded: 6,
        //     queriesRun: 28,
        //   },
        //   {
        //     id: "5",
        //     name: "Charlie Brown",
        //     email: "charlie.brown@example.com",
        //     role: "viewer",
        //     status: "active",
        //     lastActive: "2023-05-13T11:10:00Z",
        //     documentsUploaded: 2,
        //     queriesRun: 10,
        //   },
        // ]

        // setUsers(mockUsers)
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch users:", error)
        // toast({
        //   variant: "destructive",
        //   title: "Error",
        //   description: "Failed to load users. Please try again.",
        // })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
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

  const getRoleBadge = (role: UserData["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "editor":
        return <Badge className="bg-blue-500">Editor</Badge>
      case "viewer":
        return <Badge>Viewer</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: UserData["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            Inactive
          </Badge>
        )
      default:
        return null
    }
  }

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      // toast({
      //   variant: "destructive",
      //   title: "Missing information",
      //   description: "Please fill in all required fields.",
      // })
      return
    }

    try {
      // In a real app, call API to add user
      // const response = await fetch('/api/users', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newUser),
      // });
      // if (!response.ok) throw new Error('Failed to add user');
      // const data = await response.json();

      // Mock response
      const newUserData: UserData = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "active",
        lastActive: new Date().toISOString(),
        documentsUploaded: 0,
        queriesRun: 0,
      }

      setUsers((prev) => [...prev, newUserData])
      setIsAddUserOpen(false)
      setNewUser({
        name: "",
        email: "",
        role: "viewer",
      })

      // toast({
      //   title: "User added",
      //   description: `${newUser.name} has been added as a ${newUser.role}.`,
      // })
    } catch (error) {
      console.error("Failed to add user:", error)
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to add user. Please try again.",
      // })
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      // In a real app, call API to delete user
      // await fetch(`/api/users/${id}`, { method: 'DELETE' });

      setUsers((prev) => prev.filter((user) => user.id !== id))

      // toast({
      //   title: "User deleted",
      //   description: "The user has been successfully deleted.",
      // })
    } catch (error) {
      console.error("Failed to delete user:", error)
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to delete user. Please try again.",
      // })
    }
  }

  const handleChangeRole = async (id: string, newRole: UserData["role"]) => {
    try {
      // In a real app, call API to update user role
      // await fetch(`/api/users/${id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ role: newRole }),
      // });

      setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role: newRole } : user)))

      // toast({
      //   title: "Role updated",
      //   description: `User role has been updated to ${newRole}.`,
      // })
    } catch (error) {
      console.error("Failed to update user role:", error)
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to update user role. Please try again.",
      // })
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage users and their permissions</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Add a new user to the system and assign their role.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
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
                <p className="text-sm text-muted-foreground">Loading users...</p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2">
              <Users className="h-10 w-10 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                {searchQuery ? "No users found matching your search" : "No users found"}
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
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Queries</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{formatDate(user.lastActive)}</TableCell>
                      <TableCell>{user.documentsUploaded}</TableCell>
                      <TableCell>{user.queriesRun}</TableCell>
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
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleChangeRole(user.id, "admin")}
                              disabled={user.role === "admin"}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleChangeRole(user.id, "editor")}
                              disabled={user.role === "editor"}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Make Editor
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleChangeRole(user.id, "viewer")}
                              disabled={user.role === "viewer"}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Make Viewer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
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
      </Card>
    </div>
  )
}
