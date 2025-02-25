"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-96 max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login to SurgeReady</CardTitle>
          <CardDescription>Access your training modules and emergency response tools</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@hospital.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">Login</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-red-600 hover:text-red-700">
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Need an account?{" "}
            <Link href="/contact" className="text-red-600 hover:text-red-700">
              Contact sales
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

