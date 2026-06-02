"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { PostCard } from "@/components/post-card"
import MainLayout from "@/components/main-layout"
import { useState } from "react"
import { Users } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { isLoggedIn, posts } = useAppStore()
  const [activeTab, setActiveTab] = useState<"following" | "explore">("following")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  // 获取关注用户的帖子
  const followingPosts = posts.filter(
    post => post.author.isFollowing || post.author.id === "1"
  )

  const displayPosts = activeTab === "following" ? followingPosts : posts

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex">
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === "following" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              关注
              {activeTab === "following" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("explore")}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === "explore" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              推荐
              {activeTab === "explore" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
              )}
            </button>
          </div>
        </header>

        {/* Posts */}
        <div className="p-4 space-y-4">
          {displayPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">暂无内容</h3>
              <p className="text-muted-foreground">关注更多用户来查看他们的动态</p>
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
