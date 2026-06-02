"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAppStore } from "@/lib/store"
import MainLayout from "@/components/main-layout"
import { PostCard } from "@/components/post-card"
import { ArrowLeft, Calendar, Edit2, Grid, Link as LinkIcon, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  
  const { isLoggedIn, users, posts, currentUser, toggleFollow } = useAppStore()
  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  const user = users.find(u => u.id === userId)
  const userPosts = posts.filter(p => p.author.id === userId)
  const likedPosts = posts.filter(p => p.isLiked)
  const isOwnProfile = currentUser?.id === userId

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-xl mx-auto">
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="flex items-center gap-4 p-4">
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h1 className="text-xl font-bold text-foreground">个人主页</h1>
            </div>
          </header>
          <div className="text-center py-16">
            <p className="text-muted-foreground">用户不存在</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  const displayPosts = activeTab === "posts" ? userPosts : likedPosts

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center gap-4 p-4">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{userPosts.length} 条帖子</p>
            </div>
          </div>
        </header>

        {/* Profile Banner & Avatar */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-primary/30 via-primary/20 to-accent" />
          <div className="absolute -bottom-16 left-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex justify-end gap-2 p-4">
          {isOwnProfile ? (
            <Link href="/settings">
              <Button variant="outline" className="rounded-full gap-2">
                <Edit2 className="w-4 h-4" />
                编辑资料
              </Button>
            </Link>
          ) : (
            <Button
              variant={user.isFollowing ? "outline" : "default"}
              className="rounded-full px-6"
              onClick={() => toggleFollow(user.id)}
            >
              {user.isFollowing ? "已关注" : "关注"}
            </Button>
          )}
        </div>

        {/* Profile Info */}
        <div className="px-4 pt-8 pb-4">
          <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
          <p className="text-muted-foreground">@{user.username}</p>
          
          <p className="mt-3 text-foreground leading-relaxed">{user.bio}</p>
          
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              中国
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              2024年1月加入
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4">
            <button className="hover:underline">
              <span className="font-bold text-foreground">{user.followingCount}</span>
              <span className="text-muted-foreground ml-1">关注</span>
            </button>
            <button className="hover:underline">
              <span className="font-bold text-foreground">{user.followersCount}</span>
              <span className="text-muted-foreground ml-1">粉丝</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
              activeTab === "posts" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            帖子
            {activeTab === "posts" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
            )}
          </button>
          {isOwnProfile && (
            <button
              onClick={() => setActiveTab("likes")}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === "likes" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              喜欢
              {activeTab === "likes" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
              )}
            </button>
          )}
        </div>

        {/* Posts */}
        <div className="p-4 space-y-4">
          {displayPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Grid className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">暂无内容</h3>
              <p className="text-muted-foreground">
                {activeTab === "posts" ? "还没有发布任何帖子" : "还没有喜欢任何帖子"}
              </p>
            </div>
          ) : (
            displayPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}
