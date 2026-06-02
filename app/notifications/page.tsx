"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import MainLayout from "@/components/main-layout"
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// 模拟通知数据
const notifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "李晓红",
      username: "xiaohong",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    content: "赞了你的帖子",
    time: "5分钟前",
    postId: "5",
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "王大伟",
      username: "dawei",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    content: "评论了你的帖子：太棒了！风景真美",
    time: "30分钟前",
    postId: "5",
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "陈美琪",
      username: "meiqi",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    content: "关注了你",
    time: "1小时前",
  },
  {
    id: "4",
    type: "like",
    user: {
      name: "赵鹏飞",
      username: "pengfei",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
    content: "赞了你的帖子",
    time: "2小时前",
    postId: "5",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="w-4 h-4 text-red-500 fill-red-500" />
    case "comment":
      return <MessageCircle className="w-4 h-4 text-primary" />
    case "follow":
      return <UserPlus className="w-4 h-4 text-green-500" />
    default:
      return <Bell className="w-4 h-4 text-muted-foreground" />
  }
}

export default function NotificationsPage() {
  const router = useRouter()
  const { isLoggedIn } = useAppStore()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border p-4">
          <h1 className="text-xl font-bold text-foreground">通知</h1>
        </header>

        {/* Notifications List */}
        <div className="divide-y divide-border">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.postId ? `/post/${notification.postId}` : `/profile/${notification.user.username}`}
              className="flex items-start gap-3 p-4 hover:bg-accent transition-colors"
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border-2 border-background flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground">
                  <span className="font-semibold">{notification.user.name}</span>{" "}
                  <span className="text-muted-foreground">{notification.content}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </Link>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">暂无通知</h3>
            <p className="text-muted-foreground">新的互动会显示在这里</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
