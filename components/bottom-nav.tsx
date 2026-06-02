"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Compass, PlusSquare, User, LogOut, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/", icon: Home, label: "首页" },
  { href: "/explore", icon: Compass, label: "广场" },
  { href: "/compose", icon: PlusSquare, label: "发帖" },
  { href: "/notifications", icon: Bell, label: "通知" },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout, isLoggedIn } = useAppStore()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!isLoggedIn) return null

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 border-r border-border bg-card flex-col z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">Social</span>
          </Link>
        </div>

        <nav className="flex-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
          <Link
            href={`/profile/${currentUser?.id}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
              pathname.startsWith("/profile")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">我的主页</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-accent transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                  <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground truncate">{currentUser?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">@{currentUser?.username}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => router.push(`/profile/${currentUser?.id}`)}>
                <User className="mr-2 h-4 w-4" />
                查看主页
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Search className="mr-2 h-4 w-4" />
                编辑资料
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-pb">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
          <Link
            href={`/profile/${currentUser?.id}`}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              pathname.startsWith("/profile") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Avatar className="h-5 w-5">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback className="text-[8px]">{currentUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-[10px] font-medium">我的</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
