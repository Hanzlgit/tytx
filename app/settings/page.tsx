"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import MainLayout from "@/components/main-layout"
import { ArrowLeft, Camera, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const router = useRouter()
  const { isLoggedIn, currentUser, updateProfile, logout } = useAppStore()
  
  const [name, setName] = useState(currentUser?.name || "")
  const [username, setUsername] = useState(currentUser?.username || "")
  const [bio, setBio] = useState(currentUser?.bio || "")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name)
      setUsername(currentUser.username)
      setBio(currentUser.bio)
    }
  }, [currentUser])

  if (!isLoggedIn) {
    return null
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    updateProfile({ name, username, bio })
    setIsSaving(false)
    router.push(`/profile/${currentUser?.id}`)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const avatarOptions = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop",
  ]

  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h1 className="text-xl font-bold text-foreground">编辑资料</h1>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-full px-6"
            >
              {isSaving ? "保存中..." : "保存"}
            </Button>
          </div>
        </header>

        {/* Avatar Section */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-primary/30 via-primary/20 to-accent" />
          <div className="absolute -bottom-16 left-4">
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="relative group"
            >
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                <AvatarFallback className="text-3xl">{currentUser?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-background" />
              </div>
            </button>
          </div>
        </div>

        {/* Avatar Picker */}
        {showAvatarPicker && (
          <div className="mx-4 mt-20 mb-4 p-4 bg-card border border-border rounded-2xl">
            <p className="text-sm font-medium text-foreground mb-3">选择头像</p>
            <div className="grid grid-cols-6 gap-2">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => {
                    updateProfile({ avatar })
                    setShowAvatarPicker(false)
                  }}
                  className={`rounded-full overflow-hidden ring-2 transition-all ${
                    currentUser?.avatar === avatar ? "ring-primary" : "ring-transparent hover:ring-primary/50"
                  }`}
                >
                  <img src={avatar} alt="" className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <div className={`p-4 space-y-6 ${showAvatarPicker ? "" : "pt-20"}`}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">用户名</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="您的昵称"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">用户ID</label>
            <div className="flex">
              <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-muted-foreground">
                @
              </span>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                placeholder="username"
                className="h-11 rounded-l-none"
              />
            </div>
            <p className="text-xs text-muted-foreground">只能使用小写字母、数字和下划线</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">个人简介</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 160))}
              placeholder="介绍一下自己..."
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">{bio.length}/160</p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-4">
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">退出登录</CardTitle>
              <CardDescription>退出当前账户</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                退出登录
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
