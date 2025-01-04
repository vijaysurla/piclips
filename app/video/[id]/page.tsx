'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle, Share2, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { videos, users } from '@/app/data/sampleData'
import VideoPlayer from '@/app/components/VideoPlayer'
import MainLayout from '@/app/layouts/MainLayout'
import UserAvatar from '@/app/components/UserAvatar'

export default function VideoPage() {
  const { id } = useParams()
  const router = useRouter()
  const [video, setVideo] = useState(videos.find(v => v.id === id))
  const [user, setUser] = useState(users.find(u => u.id === video?.userId))
  const [isFollowing, setIsFollowing] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(video?.likes || 0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<{ id: string; userId: string; text: string; createdAt: string }[]>([])
  const [currentUserId, setCurrentUserId] = useState('1') // Assuming user 1 is logged in

  useEffect(() => {
    const foundVideo = videos.find(v => v.id === id)
    setVideo(foundVideo)
    if (foundVideo) {
      setUser(users.find(u => u.id === foundVideo.userId))
      setLikeCount(foundVideo.likes)
      setComments([
        { id: '1', userId: '2', text: 'Great video!', createdAt: new Date().toISOString() },
        { id: '2', userId: '3', text: 'Love the content!', createdAt: new Date().toISOString() },
      ])
    }
  }, [id])

  if (!video || !user) return <div>Video not found</div>

  const isOwnVideo = video.userId === currentUserId

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      const newComment = {
        id: String(comments.length + 1),
        userId: currentUserId,
        text: comment,
        createdAt: new Date().toISOString(),
      }
      setComments([newComment, ...comments])
      setComment('')
    }
  }

  const handleShare = () => {
    alert('Sharing functionality would be implemented here')
  }

  const handleDeleteVideo = () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      router.push('/')
    }
  }

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter(c => c.id !== commentId))
    }
  }

  const handleClose = () => {
    router.back()
  }

  return (
    <MainLayout>
      <div className="pt-[60px] w-full max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[65%] relative">
            <div className="aspect-[9/16] max-h-[calc(100vh-120px)] bg-black rounded-lg overflow-hidden mx-auto">
              <VideoPlayer
                src={video.videoUrl}
                thumbnailUrl={video.thumbnailUrl}
                isActive={true}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">{video.description}</h1>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span>{likeCount} likes</span>
                  <span>{video.comments} comments</span>
                  <span>{video.shares} shares</span>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  Like
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => document.getElementById('comment-input')?.focus()}
                >
                  <MessageCircle className="w-5 h-5" />
                  Comment
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:w-[35%]">
            <div className="sticky top-[80px]">
              <div className="flex items-center justify-between mb-6">
                <Link href={`/profile/${user.id}`} className="flex items-center gap-3">
                  <UserAvatar src={user.image} name={user.name} size={48} />
                  <div>
                    <h2 className="font-bold">{user.name}</h2>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </Link>
                {isOwnVideo ? (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleDeleteVideo}
                    className="ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    className={isFollowing ? 
                      "border-[#1a1819] text-[#1a1819] hover:bg-gray-100" : 
                      "bg-[#d6191e] hover:bg-[#b31419] text-white"}
                    onClick={handleFollow}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                )}
              </div>
              <div className="mb-6">
                <h3 className="font-bold mb-4">Comments</h3>
                <form onSubmit={handleComment} className="flex gap-2 mb-6">
                  <Input
                    id="comment-input"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button type="submit">Post</Button>
                </form>
                <div className="space-y-6">
                  {comments.map((comment) => {
                    const commentUser = users.find(u => u.id === comment.userId)
                    return (
                      <div key={comment.id} className="flex gap-3">
                        <UserAvatar 
                          src={commentUser?.image} 
                          name={commentUser?.name || ''} 
                          size={40} 
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold">{commentUser?.name}</p>
                              <p className="mt-1">{comment.text}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            {comment.userId === currentUserId && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}



















