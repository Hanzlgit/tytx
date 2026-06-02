"use client"

import { useAppStore } from "@/lib/store"
import { BottomNav } from "@/components/bottom-nav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn && <BottomNav />}
      <main className={`${isLoggedIn ? "md:ml-64 pb-20 md:pb-0" : ""}`}>
        {children}
      </main>
    </div>
  )
}
