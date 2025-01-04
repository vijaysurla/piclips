'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import VideoPlayer from './VideoPlayer'
import UserAvatar from './UserAvatar'
import { users } from '../data/sampleData'

interface PostMainProps {
  post: {
    id: string
    userId: string
    videoUrl: string
    thumbnailUrl: string
    description: string
    likes: number
    comments: number
    shares: number
    createdAt: string
  }
  isActive: boolean
  showLogo?: boolean
  currentUserId: string
  onLike: (videoId: string, liked: boolean) => void
  isLiked: boolean
  isFollowing: boolean
  onFollow: () => void
}

export default function PostMain({ 
  post, 
  isActive, 
  showLogo = false, 
  currentUserId,
  onLike,
  isLiked,
  isFollowing,
  onFollow
}: PostMainProps) {
  const router = useRouter()
  const [likeCount, setLikeCount] = useState(post.likes)
  const user = users.find(u => u.id === post.userId)

  useEffect(() => {
    setLikeCount(post.likes)
  }, [post.likes])

  if (!user) return null

  const handleLike = () => {
    const newLiked = !isLiked
    setLikeCount(prevCount => newLiked ? prevCount + 1 : prevCount - 1)
    onLike(post.id, newLiked)
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <div className="flex border-b pb-6 mb-6">
      <div className="cursor-pointer" onClick={() => router.push(`/profile/${user.id}`)}>
        <UserAvatar src={user.image} name={user.name} size={60} />
      </div>

      <div className="flex-1 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href={`/profile/${user.id}`} className="font-bold hover:underline">
              {user.name}
            </Link>
            <p className="text-gray-500 text-sm">{timeAgo}</p>
          </div>
          <Button 
            variant={isFollowing ? "outline" : "default"}
            className={isFollowing ? 
              "border-[#1a1819] text-[#1a1819] hover:bg-gray-100" : 
              "bg-[#d6191e] hover:bg-[#b31419] text-white"}
            onClick={onFollow}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>

        <p className="mt-2 mb-4">{post.description}</p>

        <div className="relative aspect-[9/16] max-w-[400px] bg-black rounded-lg overflow-hidden">
          <VideoPlayer
            src={post.videoUrl}
            thumbnailUrl={post.thumbnailUrl}
            isActive={isActive}
          />
          {showLogo && (
            <div className="absolute top-4 left-4 pointer-events-none">
              <Image
                src="/piclips-logo-transparent.png"
                alt="PICLIPS Logo"
                width={80}
                height={26}
                className="opacity-70"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            {likeCount}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => router.push(`/video/${post.id}`)}
          >
            <MessageCircle className="w-5 h-5" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="w-5 h-5" />
            {post.shares}
          </Button>
        </div>
      </div>
    </div>
  )
}
























