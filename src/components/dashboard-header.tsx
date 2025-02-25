"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-red-600 mr-8">
              SurgeReady
            </Link>

            <nav className="hidden md:flex space-x-8">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/courses">Courses</NavLink>
              <NavLink href="/certifications">Certifications</NavLink>
              <NavLink href="/emergency-tools">Emergency Tools</NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
            </Button>

            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
              <MobileNavLink href="/courses">Courses</MobileNavLink>
              <MobileNavLink href="/certifications">Certifications</MobileNavLink>
              <MobileNavLink href="/emergency-tools">Emergency Tools</MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-white font-medium">
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-white font-medium px-2 py-1"
    >
      {children}
    </Link>
  )
}

