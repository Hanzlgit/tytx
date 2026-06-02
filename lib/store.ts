"use client"

import { create } from "zustand"
import { currentUser, posts as initialPosts, users as initialUsers, type Post, type User, type Comment, comments as initialComments } from "./mock-data"

interface AppState {
  // 认证状态
  isLoggedIn: boolean
  currentUser: User | null
  login: (email: string, password: string) => void
  logout: () => void
  
  // 用户状态
  users: User[]
  toggleFollow: (userId: string) => void
  updateProfile: (updates: Partial<User>) => void
  
  // 帖子状态
  posts: Post[]
  addPost: (content: string, images?: string[]) => void
  toggleLike: (postId: string) => void
  deletePost: (postId: string) => void
  
  // 评论状态
  comments: Record<string, Comment[]>
  addComment: (postId: string, content: string) => void
  toggleCommentLike: (postId: string, commentId: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  isLoggedIn: false,
  currentUser: null,
  users: initialUsers,
  posts: initialPosts,
  comments: {
    "1": initialComments,
  },
  
  // 认证方法
  login: (email: string, password: string) => {
    // 模拟登录
    set({ isLoggedIn: true, currentUser })
  },
  
  logout: () => {
    set({ isLoggedIn: false, currentUser: null })
  },
  
  // 用户方法
  toggleFollow: (userId: string) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              isFollowing: !user.isFollowing,
              followersCount: user.isFollowing
                ? user.followersCount - 1
                : user.followersCount + 1,
            }
          : user
      ),
      posts: state.posts.map((post) =>
        post.author.id === userId
          ? {
              ...post,
              author: {
                ...post.author,
                isFollowing: !post.author.isFollowing,
                followersCount: post.author.isFollowing
                  ? post.author.followersCount - 1
                  : post.author.followersCount + 1,
              },
            }
          : post
      ),
    }))
  },
  
  updateProfile: (updates: Partial<User>) => {
    set((state) => ({
      currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null,
      users: state.users.map((user) =>
        user.id === state.currentUser?.id ? { ...user, ...updates } : user
      ),
      posts: state.posts.map((post) =>
        post.author.id === state.currentUser?.id
          ? { ...post, author: { ...post.author, ...updates } }
          : post
      ),
    }))
  },
  
  // 帖子方法
  addPost: (content: string, images?: string[]) => {
    const { currentUser } = get()
    if (!currentUser) return
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      images,
      createdAt: "刚刚",
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
    }
    
    set((state) => ({
      posts: [newPost, ...state.posts],
    }))
  },
  
  toggleLike: (postId: string) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post
      ),
    }))
  },
  
  deletePost: (postId: string) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }))
  },
  
  // 评论方法
  addComment: (postId: string, content: string) => {
    const { currentUser } = get()
    if (!currentUser) return
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      createdAt: "刚刚",
      likesCount: 0,
      isLiked: false,
    }
    
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [newComment, ...(state.comments[postId] || [])],
      },
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, commentsCount: post.commentsCount + 1 }
          : post
      ),
    }))
  },
  
  toggleCommentLike: (postId: string, commentId: string) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: (state.comments[postId] || []).map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likesCount: comment.isLiked
                  ? comment.likesCount - 1
                  : comment.likesCount + 1,
              }
            : comment
        ),
      },
    }))
  },
}))
