'use client'

import { useState, useEffect, useRef } from 'react'
import PostMain from './components/PostMain'
import { videos, users } from '@/app/data/sampleData'
import MainLayout from './layouts/MainLayout'

export default function Home() {
  const [allVideos, setAllVideos] = useState(videos)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [followingUsers, setFollowingUsers] = useState<string[]>([])
  const [likedVideos, setLikedVideos] = useState<string[]>([])
  const videoRefs = useRef<(HTMLDivElement | null)[]>([])
  const currentUserId = "1" // Assuming user 1 is logged in

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveVideoIndex(index)
              console.log('Active video index:', index)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      videoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  useEffect(() => {
    const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]')
    setLikedVideos(storedLikedVideos)
  }, [])

  const handleFollow = (userId: string) => {
    setFollowingUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    )
  }

  const handleLike = (videoId: string, liked: boolean) => {
    setLikedVideos(prev => {
      const newLikedVideos = liked
        ? [...prev, videoId]
        : prev.filter(id => id !== videoId)
      localStorage.setItem('likedVideos', JSON.stringify(newLikedVideos))
      return newLikedVideos
    })
    setAllVideos(prev => 
      prev.map(video => 
        video.id === videoId
          ? { ...video, likes: video.likes + (liked ? 1 : -1) }
          : video
      )
    )
  }

  return (
    <MainLayout>
      <div className="pt-[80px]">
        {allVideos.map((video, index) => (
          <div key={video.id} ref={(el) => (videoRefs.current[index] = el)} className="mb-8">
            <PostMain 
              post={video} 
              isActive={index === activeVideoIndex}
              showLogo={true}
              currentUserId={currentUserId}
              isLiked={likedVideos.includes(video.id)}
              isFollowing={followingUsers.includes(video.userId)}
              onFollow={() => handleFollow(video.userId)}
              onLike={(videoId, liked) => handleLike(videoId, liked)}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  )
}






















