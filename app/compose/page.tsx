"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import MainLayout from "@/components/main-layout"
import { ArrowLeft, Image as ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export default function ComposePage() {
  const router = useRouter()
  const { isLoggedIn, currentUser, addPost } = useAppStore()
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    // 自动聚焦
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  if (!isLoggedIn) {
    return null
  }

  const handleSubmit = async () => {
    if (!content.trim()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addPost(content, images.length > 0 ? images : undefined)
    router.push("/")
  }

  const addDemoImage = () => {
    const demoImages = [
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1682687221038-404670f01d03?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?w=600&h=400&fit=crop",
    ]
    if (images.length < 9) {
      setImages([...images, demoImages[images.length % demoImages.length]])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const maxLength = 500
  const remainingChars = maxLength - content.length

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="rounded-full px-6"
            >
              {isSubmitting ? "发布中..." : "发布"}
            </Button>
          </div>
        </header>

        {/* Compose Area */}
        <div className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-11 w-11 flex-shrink-0">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                placeholder="分享你的想法..."
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
                className="min-h-[150px] border-0 bg-transparent resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0"
              />
              
              {/* Image Preview */}
              {images.length > 0 && (
                <div className={`grid gap-2 mt-4 ${
                  images.length === 1 ? "grid-cols-1" : 
                  images.length === 2 ? "grid-cols-2" : 
                  "grid-cols-3"
                }`}>
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/80 text-background hover:bg-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-20 md:bottom-0 left-0 right-0 md:left-64 border-t border-border bg-background p-4">
          <div className="max-w-xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={addDemoImage}
                disabled={images.length >= 9}
                className="rounded-full text-primary hover:bg-primary/10"
              >
                <ImageIcon className="w-5 h-5" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {images.length}/9 图片
              </span>
            </div>
            <div className={`text-sm ${remainingChars < 50 ? "text-destructive" : "text-muted-foreground"}`}>
              {remainingChars}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
