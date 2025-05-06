"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && status === "unauthenticated") {
      router.push("/auth")
    }
  }, [isMounted, status, router])

  if (status === "loading" || !isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-200 ease-in-out md:translate-x-0 md:w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden ml-0 md:ml-64">
        <Header user={session?.user} />
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${isOpen ? "pl-64" : "pl-0"} md:pl-6`}>
          {children}
        </main>
      </div>
    </div>
  )
}
