'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import PostMain from '../components/PostMain'
import { videos, users } from '@/app/data/sampleData'

export default function Following() {
  const [followingVideos, setFollowingVideos] = useState<typeof videos>([])
  const currentUserId = '1' // Assuming user 1 is logged in

  useEffect(() => {
    const currentUser = users.find(user => user.id === currentUserId)
    if (currentUser && Array.isArray(currentUser.following)) {
      const filteredVideos = videos.filter(video => currentUser.following.includes(video.userId))
      setFollowingVideos(filteredVideos)
    }
  }, [])

  return (
    <MainLayout>
      <div className="w-full max-w-[600px] mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Following</h1>
        {followingVideos.length === 0 ? (
          <p>No videos from people you follow yet.</p>
        ) : (
          followingVideos.map((video) => (
            <PostMain 
              key={video.id} 
              post={video} 
              isActive={true}
              showLogo={true}
            />
          ))
        )}
      </div>
    </MainLayout>
  )
}



