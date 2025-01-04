'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface UploadVideoProps {
  onUpload: (file: File, description: string) => void
}

export default function UploadVideo({ onUpload }: UploadVideoProps) {
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleUpload = () => {
    if (file && description.trim()) {
      onUpload(file, description)
      setFile(null)
      setDescription('')
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="p-4 border rounded-lg mb-6">
      <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
      <div className="mb-4">
        {!file ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">MP4 or WebM (max. 50MB)</p>
          </div>
        ) : (
          <div className="relative aspect-video">
            <video 
              src={previewUrl || undefined} 
              className="w-full h-full object-cover rounded-lg"
              controls
            />
            <button 
              className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white"
              onClick={handleRemoveFile}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <Input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      <div className="mb-4">
        <Textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a description for your video..."
          rows={3}
        />
      </div>
      <Button 
        onClick={handleUpload}
        disabled={!file || !description.trim()}
        className="w-full"
      >
        Post
      </Button>
    </div>
  )
}

