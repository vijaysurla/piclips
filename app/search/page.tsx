'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import PostMain from '../components/PostMain'
import { videos, users } from '../data/sampleData'
import UserAvatar from '../components/UserAvatar'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [searchResults, setSearchResults] = useState<typeof videos>([])
  const [userResults, setUserResults] = useState<typeof users>([])

  useEffect(() => {
    if (query) {
      const filteredVideos = videos.filter(video => 
        video.description.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filteredVideos)

      const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
      )
      setUserResults(filteredUsers)
    }
  }, [query])

  return (
    <MainLayout>
      <div className="w-full max-w-[600px] mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        
        {userResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            {userResults.map((user) => (
              <div key={user.id} className="flex items-center gap-4 mb-4">
                <UserAvatar src={user.image} name={user.name} size={48} />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchResults.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Videos</h2>
            {searchResults.map((video) => (
              <PostMain 
                key={video.id} 
                post={video} 
                isActive={false}
                showLogo={true}
              />
            ))}
          </div>
        ) : (
          <p>No video results found for "{query}"</p>
        )}
      </div>
    </MainLayout>
  )
}

