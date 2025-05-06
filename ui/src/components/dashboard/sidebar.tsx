"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, FileText, MessageSquare, Settings, Menu, X, Home, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
// import { useToast } from "@/components/ui/use-toast"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  adminOnly?: boolean
}

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  // const { toast } = useToast()

  // Mock admin status - in a real app, get this from the session
  const isAdmin = true

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Q&A",
      href: "/dashboard/qa",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: <Users className="h-5 w-5" />,
      adminOnly: true,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    // toast({
    //   title: "Signed out successfully",
    //   description: "You have been signed out of your account",
    // })
    window.location.href = "/auth"
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Document RAG</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )
            })}
          </nav>
          <div className="border-t p-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={toggleSidebar} />}
    </>
  )
}
