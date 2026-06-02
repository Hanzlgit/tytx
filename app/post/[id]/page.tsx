"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAppStore } from "@/lib/store"
import MainLayout from "@/components/main-layout"
import { PostCard } from "@/components/post-card"
import { ArrowLeft, Heart, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  
  const { isLoggedIn, posts, comments, currentUser, addComment, toggleCommentLike } = useAppStore()
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  const post = posts.find(p => p.id === postId)
  const postComments = comments[postId] || []

  if (!post) {
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
              <h1 className="text-xl font-bold text-foreground">帖子详情</h1>
            </div>
          </header>
          <div className="text-center py-16">
            <p className="text-muted-foreground">帖子不存在或已被删除</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    
    addComment(postId, newComment)
    setNewComment("")
    setIsSubmitting(false)
  }

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center gap-4 p-4">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">帖子详情</h1>
          </div>
        </header>

        {/* Post */}
        <div className="p-4">
          <PostCard post={post} showFullContent />
        </div>

        {/* Comments Section */}
        <div className="border-t border-border">
          <div className="p-4">
            <h2 className="font-semibold text-foreground mb-4">
              评论 ({postComments.length})
            </h2>
            
            {postComments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                暂无评论，快来抢沙发吧
              </p>
            ) : (
              <div className="space-y-4">
                {postComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Link href={`/profile/${comment.author.id}`}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1">
                      <div className="bg-muted rounded-2xl p-3">
                        <Link href={`/profile/${comment.author.id}`} className="font-semibold text-foreground hover:underline">
                          {comment.author.name}
                        </Link>
                        <p className="text-foreground mt-1">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 px-2">
                        <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
                        <button
                          onClick={() => toggleCommentLike(postId, comment.id)}
                          className={`flex items-center gap-1 text-sm ${
                            comment.isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${comment.isLiked ? "fill-current" : ""}`} />
                          {comment.likesCount > 0 && comment.likesCount}
                        </button>
                        <button className="text-sm text-muted-foreground hover:text-foreground">
                          回复
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comment Input */}
        <div className="fixed bottom-20 md:bottom-0 left-0 right-0 md:left-64 border-t border-border bg-background p-4">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <Input
                placeholder="写下你的评论..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmitComment()}
                className="pr-12 h-11 rounded-full bg-muted border-0"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-primary hover:bg-primary/10"
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
