'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import PostMain from '../components/PostMain'
import { videos } from '../data/sampleData'

export default function Trending() {
  const [trendingVideos, setTrendingVideos] = useState<typeof videos>([])

  useEffect(() => {
    const sortedVideos = [...videos].sort((a, b) => {
      const aScore = a.likes + a.shares
      const bScore = b.likes + b.shares
      return bScore - aScore
    })
    setTrendingVideos(sortedVideos.slice(0, 10)) // Show top 10 trending videos
  }, [])

  return (
    <MainLayout>
      <div className="w-full max-w-[600px] mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Trending</h1>
        {trendingVideos.map((video) => (
          <PostMain 
            key={video.id} 
            post={video} 
            isActive={true}
            showLogo={true}
          />
        ))}
      </div>
    </MainLayout>
  )
}

