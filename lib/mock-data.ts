// 模拟用户数据
export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followersCount: number
  followingCount: number
  postsCount: number
  isFollowing: boolean
}

export interface Post {
  id: string
  author: User
  content: string
  images?: string[]
  createdAt: string
  likesCount: number
  commentsCount: number
  isLiked: boolean
}

export interface Comment {
  id: string
  author: User
  content: string
  createdAt: string
  likesCount: number
  isLiked: boolean
}

// 当前登录用户
export const currentUser: User = {
  id: "1",
  name: "张小明",
  username: "xiaoming",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  bio: "热爱生活，分享美好时刻 | 摄影爱好者 | 旅行达人",
  followersCount: 1234,
  followingCount: 567,
  postsCount: 89,
  isFollowing: false,
}

// 模拟用户列表
export const users: User[] = [
  currentUser,
  {
    id: "2",
    name: "李晓红",
    username: "xiaohong",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    bio: "设计师 | 咖啡成瘾者 | 喵星人铲屎官",
    followersCount: 2345,
    followingCount: 432,
    postsCount: 156,
    isFollowing: true,
  },
  {
    id: "3",
    name: "王大伟",
    username: "dawei",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    bio: "程序员 | 开源爱好者 | 终身学习",
    followersCount: 5678,
    followingCount: 234,
    postsCount: 78,
    isFollowing: true,
  },
  {
    id: "4",
    name: "陈美琪",
    username: "meiqi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    bio: "美食博主 | 烘焙达人 | 分享生活的甜蜜",
    followersCount: 8901,
    followingCount: 567,
    postsCount: 234,
    isFollowing: false,
  },
  {
    id: "5",
    name: "赵鹏飞",
    username: "pengfei",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    bio: "产品经理 | 创业者 | 阅读与思考",
    followersCount: 3456,
    followingCount: 789,
    postsCount: 123,
    isFollowing: true,
  },
]

// 模拟帖子列表
export const posts: Post[] = [
  {
    id: "1",
    author: users[1],
    content: "今天在咖啡馆完成了一个超赞的设计项目！灵感来自于窗外的阳光和一杯完美的拿铁。设计真的是需要好的环境和心情 ☕️",
    images: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&h=400&fit=crop",
    ],
    createdAt: "10分钟前",
    likesCount: 128,
    commentsCount: 23,
    isLiked: true,
  },
  {
    id: "2",
    author: users[2],
    content: "刚刚开源了一个新项目，是关于前端状态管理的新思路。欢迎大家来 Star 和提 Issue！开源社区的力量是无穷的。",
    createdAt: "30分钟前",
    likesCount: 256,
    commentsCount: 45,
    isLiked: false,
  },
  {
    id: "3",
    author: users[3],
    content: "周末尝试做了提拉米苏，第一次做就成功了！秘诀是一定要用好的马斯卡彭芝士，口感会完全不一样。分享给大家我的配方：",
    images: [
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586040140378-b5634cb4c8fc?w=600&h=400&fit=crop",
    ],
    createdAt: "1小时前",
    likesCount: 512,
    commentsCount: 89,
    isLiked: true,
  },
  {
    id: "4",
    author: users[4],
    content: "读完了《思考，快与慢》，强烈推荐给每一位产品人。这本书让我重新思考了用户决策背后的心理机制，对产品设计有很大启发。",
    createdAt: "2小时前",
    likesCount: 89,
    commentsCount: 12,
    isLiked: false,
  },
  {
    id: "5",
    author: users[0],
    content: "终于到达了心心念念的稻城亚丁！海拔4000米的风景真的太震撼了，虽然高原反应有点难受，但一切都值得。",
    images: [
      "https://images.unsplash.com/photo-1580889272682-89b42c88c3b4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    ],
    createdAt: "3小时前",
    likesCount: 678,
    commentsCount: 134,
    isLiked: false,
  },
  {
    id: "6",
    author: users[1],
    content: "分享一个设计小技巧：留白不是浪费空间，而是给视觉呼吸的机会。好的设计往往是做减法，而不是加法。",
    createdAt: "5小时前",
    likesCount: 345,
    commentsCount: 56,
    isLiked: true,
  },
]

// 模拟评论
export const comments: Comment[] = [
  {
    id: "1",
    author: users[2],
    content: "太棒了！设计真的很有感觉，配色也很舒服",
    createdAt: "5分钟前",
    likesCount: 12,
    isLiked: false,
  },
  {
    id: "2",
    author: users[3],
    content: "这个咖啡馆在哪里呀？看起来很适合办公",
    createdAt: "8分钟前",
    likesCount: 8,
    isLiked: true,
  },
  {
    id: "3",
    author: users[4],
    content: "环境确实很重要，我也喜欢在有阳光的地方工作",
    createdAt: "15分钟前",
    likesCount: 5,
    isLiked: false,
  },
]

// 获取关注的用户的帖子
export const getFollowingPosts = () => {
  return posts.filter(post => post.author.isFollowing || post.author.id === currentUser.id)
}

// 获取用户的帖子
export const getUserPosts = (userId: string) => {
  return posts.filter(post => post.author.id === userId)
}
