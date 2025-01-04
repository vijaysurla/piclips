'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import TopNav from '../components/TopNav'
import SideNav from '../components/SideNav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BiSearch } from 'react-icons/bi'
import { users } from '../data/sampleData'
import UserAvatar from '../components/UserAvatar'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const [mobileSuggestions, setMobileSuggestions] = useState<typeof users>([])
  const router = useRouter()
  const mobileSearchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setMobileSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`)
      setMobileSuggestions([])
    }
  }

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMobileSearchQuery(value)
    if (value.trim()) {
      const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.username.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setMobileSuggestions(filteredUsers)
    } else {
      setMobileSuggestions([])
    }
  }

  const handleMobileSuggestionClick = (username: string) => {
    setMobileSearchQuery(username)
    setMobileSuggestions([])
    router.push(`/profile/${username}`)
  }

  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden pt-[60px]">
        <SideNav />
        <main className="flex-1 overflow-y-auto px-2 md:px-4 ml-[70px] md:ml-[100px] scrollbar-hide">
          <div ref={mobileSearchRef} className="md:hidden mb-4 relative">
            <form onSubmit={handleMobileSearch} className="flex items-center">
              <Input 
                type="text"
                placeholder="Search videos and creators"
                className="w-full pr-10"
                value={mobileSearchQuery}
                onChange={handleMobileInputChange}
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0 px-3 py-1">
                <BiSearch size="22" color="#838383"/>
              </Button>
            </form>
            {mobileSuggestions.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                {mobileSuggestions.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMobileSuggestionClick(user.username)}
                  >
                    <UserAvatar src={user.image} name={user.name} size={32} />
                    <div className="ml-2">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="max-w-[800px] mx-auto pt-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}



