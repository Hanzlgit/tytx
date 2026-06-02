"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MessageCircle, MoreHorizontal, Trash2, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/lib/store"
import type { Post } from "@/lib/mock-data"

interface PostCardProps {
  post: Post
  showFullContent?: boolean
}

export function PostCard({ post, showFullContent = false }: PostCardProps) {
  const { toggleLike, deletePost, currentUser, toggleFollow } = useAppStore()
  const [imageIndex, setImageIndex] = useState(0)

  const isOwnPost = currentUser?.id === post.author.id

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <Link href={`/profile/${post.author.id}`} className="flex items-center gap-3">
          <Avatar className="h-11 w-11 ring-2 ring-background">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground hover:underline">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">@{post.author.username} · {post.createdAt}</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {!isOwnPost && (
            <Button
              variant={post.author.isFollowing ? "outline" : "default"}
              size="sm"
              className="rounded-full h-8 px-4"
              onClick={() => toggleFollow(post.author.id)}
            >
              {post.author.isFollowing ? "已关注" : "关注"}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                分享
              </DropdownMenuItem>
              {isOwnPost && (
                <DropdownMenuItem
                  onClick={() => deletePost(post.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  删除
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <Link href={`/post/${post.id}`}>
          <p className={`text-foreground leading-relaxed ${!showFullContent && post.content.length > 200 ? "line-clamp-4" : ""}`}>
            {post.content}
          </p>
        </Link>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <Link href={`/post/${post.id}`} className="block">
          <div className={`relative ${post.images.length === 1 ? "aspect-[16/10]" : "aspect-square"}`}>
            {post.images.length === 1 ? (
              <Image
                src={post.images[0]}
                alt="Post image"
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className={`grid gap-0.5 h-full ${
                post.images.length === 2 ? "grid-cols-2" : 
                post.images.length === 3 ? "grid-cols-2" : 
                "grid-cols-2"
              }`}>
                {post.images.slice(0, 4).map((img, i) => (
                  <div 
                    key={i} 
                    className={`relative ${
                      post.images!.length === 3 && i === 0 ? "row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Post image ${i + 1}`}
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                    {post.images!.length > 4 && i === 3 && (
                      <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                        <span className="text-background font-bold text-xl">+{post.images!.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 gap-2 rounded-xl ${post.isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => toggleLike(post.id)}
        >
          <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
          <span className="font-medium">{formatNumber(post.likesCount)}</span>
        </Button>
        <Link href={`/post/${post.id}`} className="flex-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full gap-2 rounded-xl text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">{formatNumber(post.commentsCount)}</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 gap-2 rounded-xl text-muted-foreground hover:text-foreground"
        >
          <Share2 className="h-5 w-5" />
          <span className="font-medium">分享</span>
        </Button>
      </div>
    </article>
  )
}
