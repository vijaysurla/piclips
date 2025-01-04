'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { users, videos } from '@/app/data/sampleData'
import VideoPlayer from '@/app/components/VideoPlayer'
import MainLayout from '@/app/layouts/MainLayout'
import EditProfile from '@/app/components/EditProfile'
import UserAvatar from '@/app/components/UserAvatar'

export default function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState(users.find(u => u.id === id))
  const [userVideos, setUserVideos] = useState(videos.filter(v => v.userId === id))
  const [likedVideos, setLikedVideos] = useState<typeof videos>([])
  const [isFollowing, setIsFollowing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentUserId, setCurrentUserId] = useState('1') // Assuming user 1 is logged in
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  useEffect(() => {
    setUser(users.find(u => u.id === id))
    setUserVideos(videos.filter(v => v.userId === id))
    
    // Fetch liked videos from localStorage
    const likedVideoIds = JSON.parse(localStorage.getItem('likedVideos') || '[]')
    setLikedVideos(videos.filter(v => likedVideoIds.includes(v.id)))
  }, [id])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = (updatedUser: { name: string; username: string; bio: string; image: string }) => {
    setUser(prevUser => {
      if (prevUser) {
        return { ...prevUser, ...updatedUser }
      }
      return prevUser
    })
    setIsEditing(false)
  }

  const handleUnlike = (videoId: string) => {
    setLikedVideos(prev => prev.filter(v => v.id !== videoId))
    
    // Update localStorage
    const likedVideoIds = JSON.parse(localStorage.getItem('likedVideos') || '[]')
    const updatedLikedVideoIds = likedVideoIds.filter((id: string) => id !== videoId)
    localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideoIds))
  }

  const handleVideoHover = (videoId: string) => {
    setActiveVideoId(videoId)
  }

  const handleVideoLeave = () => {
    setActiveVideoId(null)
  }

  if (!user) return <div>User not found</div>

  const isOwnProfile = user.id === currentUserId

  return (
    <MainLayout>
      <div className="pt-[90px] w-full max-w-[1140px] mx-auto px-4">
        {isEditing ? (
          <EditProfile user={user} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            <UserAvatar src={user.image} name={user.name} size={120} />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-500 mb-4">{user.username}</p>
              <div className="flex items-center gap-6 mb-4">
                <div>
                  <span className="font-bold">{userVideos.length}</span> <span className="text-gray-500">Videos</span>
                </div>
                <div>
                  <span className="font-bold">{user.followers}</span> <span className="text-gray-500">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{user.likes}</span> <span className="text-gray-500">Likes</span>
                </div>
              </div>
              <p className="mb-4">{user.bio}</p>
              {isOwnProfile ? (
                <Button
                  onClick={handleEditProfile}
                  variant="outline"
                  className="border-[#d6191e] text-[#d6191e] hover:bg-[#d6191e] hover:text-white"
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={handleFollow}
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? 
                    "border-[#1a1819] text-[#1a1819] hover:bg-gray-100" : 
                    "bg-[#d6191e] hover:bg-[#b31419] text-white"}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          </div>
        )}

        <Tabs defaultValue="videos">
          <TabsList>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
          </TabsList>
          <TabsContent value="videos">
            <div className="grid grid-cols-3 gap-4">
              {userVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="relative"
                  onMouseEnter={() => handleVideoHover(video.id)}
                  onMouseLeave={handleVideoLeave}
                >
                  <Link href={`/video/${video.id}`}>
                    <div className="aspect-[9/16] bg-gray-100 rounded-md overflow-hidden relative">
                      <VideoPlayer
                        src={video.videoUrl}
                        thumbnailUrl={video.thumbnailUrl}
                        isActive={activeVideoId === video.id}
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs py-1 px-2 rounded">
                        {video.likes} likes
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="liked">
            <div className="grid grid-cols-3 gap-4">
              {likedVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="relative group"
                  onMouseEnter={() => handleVideoHover(video.id)}
                  onMouseLeave={handleVideoLeave}
                >
                  <Link href={`/video/${video.id}`}>
                    <div className="aspect-[9/16] bg-gray-100 rounded-md overflow-hidden relative">
                      <VideoPlayer
                        src={video.videoUrl}
                        thumbnailUrl={video.thumbnailUrl}
                        isActive={activeVideoId === video.id}
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs py-1 px-2 rounded">
                        {video.likes} likes
                      </div>
                    </div>
                  </Link>
                  {isOwnProfile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleUnlike(video.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

















                    




