'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { videos } from '../data/sampleData'
import MainLayout from '../layouts/MainLayout'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [charCount, setCharCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }, [])

  const handleSelectFileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setCaption(text)
    setCharCount(text.length)
  }

  const handlePost = () => {
    if (file && caption.trim()) {
      const newVideo = {
        id: String(videos.length + 1),
        userId: '1', // Assuming the current user is user 1
        videoUrl: URL.createObjectURL(file),
        thumbnailUrl: '/placeholder.svg?height=400&width=300',
        description: caption,
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: new Date().toISOString()
      }
      videos.unshift(newVideo)
      router.push('/')
    }
  }

  return (
    <MainLayout>
      <div className="max-w-[1140px] mx-auto p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-1 text-[#1a1819]">Upload video</h1>
          <p className="text-gray-500 text-sm mb-8">Post a video to your account</p>

          <div className="flex gap-8">
            {/* Left side - Video upload/preview */}
            <div className="w-[325px] flex-shrink-0">
              {!file ? (
                <div 
                  className="flex flex-col items-center justify-center w-full h-[600px] border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative group"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <div className="mb-6">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-[#1a1819] text-center">
                        Select video to upload
                      </p>
                      <p className="text-sm text-gray-500 text-center">
                        Or drag and drop a file
                      </p>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-sm text-gray-500">MP4</p>
                      <p className="text-sm text-gray-500">Up to 30 minutes</p>
                      <p className="text-sm text-gray-500">Less than 2 GB</p>
                    </div>
                    <Button 
                      className="mt-8 bg-[#d6191e] hover:bg-[#b31419] text-white px-8"
                      onClick={handleSelectFileClick}
                    >
                      Select file
                    </Button>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-[280px] h-[560px] bg-black rounded-[40px] overflow-hidden border-[14px] border-black relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-7 bg-black rounded-b-3xl z-10"></div>
                    <video
                      src={preview || undefined}
                      className="w-full h-full object-cover rounded-3xl"
                      controls
                    />
                  </div>
                  <div className="mt-4 w-full px-4">
                    <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                      <span className="text-sm text-gray-600 ml-2">File</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-sm text-[#d6191e] hover:text-[#b31419]"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Caption and controls */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-base font-medium text-[#1a1819]">Divide videos and edit</p>
                  <Button 
                    variant="default" 
                    className="bg-[#d6191e] hover:bg-[#b31419] text-white"
                  >
                    Edit
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos
                </p>
              </div>

              <div className="mb-6">
                <p className="text-base font-medium text-[#1a1819] mb-2">Caption</p>
                <div className="relative">
                  <Textarea
                    value={caption}
                    onChange={handleCaptionChange}
                    placeholder="Write a caption..."
                    className="min-h-[150px]"
                    maxLength={150}
                  />
                  <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {charCount}/150
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  className="px-8 border-[#1a1819] text-[#1a1819] hover:bg-gray-100"
                  onClick={() => router.push('/')}
                >
                  Discard
                </Button>
                <Button
                  className="px-8 bg-[#d6191e] hover:bg-[#b31419] text-white"
                  disabled={!file || !caption.trim()}
                  onClick={handlePost}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

