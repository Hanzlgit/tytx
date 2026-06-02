"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { PostCard } from "@/components/post-card"
import MainLayout from "@/components/main-layout"
import { Search, TrendingUp, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ExplorePage() {
  const router = useRouter()
  const { isLoggedIn, posts, users, toggleFollow } = useAppStore()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  // 热门帖子（按点赞数排序）
  const trendingPosts = [...posts].sort((a, b) => b.likesCount - a.likesCount)

  // 推荐用户（未关注的）
  const suggestedUsers = users.filter(u => !u.isFollowing && u.id !== "1")

  // 搜索过滤
  const filteredPosts = searchQuery
    ? posts.filter(
        post =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trendingPosts

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="搜索帖子或用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-full bg-muted border-0"
            />
          </div>
        </header>

        {/* Suggested Users */}
        {!searchQuery && suggestedUsers.length > 0 && (
          <section className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">推荐关注</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex-shrink-0 w-32 bg-card border border-border rounded-2xl p-4 text-center"
                >
                  <Link href={`/profile/${user.id}`}>
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-foreground text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                  </Link>
                  <Button
                    size="sm"
                    className="w-full mt-3 rounded-full h-8"
                    onClick={() => toggleFollow(user.id)}
                  >
                    关注
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trending Posts */}
        <section className="p-4">
          {!searchQuery && (
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">热门动态</h2>
            </div>
          )}
          
          {searchQuery && filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">未找到结果</h3>
              <p className="text-muted-foreground">尝试搜索其他关键词</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  )
}
