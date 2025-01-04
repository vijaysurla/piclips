export const users = [
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      image: 'https://i.pravatar.cc/150?img=1',
      bio: 'Content creator | Video enthusiast',
      followers: 1000,
      following: ['2', '3'],
      likes: 2500
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      image: 'https://i.pravatar.cc/150?img=5',
      bio: 'Digital artist & filmmaker',
      followers: 2000,
      following: ['1'],
      likes: 5000
    },
    {
      id: '3',
      name: 'Mike Johnson',
      username: 'mikej',
      image: 'https://i.pravatar.cc/150?img=8',
      bio: 'Adventure seeker | Travel vlogger',
      followers: 1500,
      following: ['1', '2'],
      likes: 3500
    }
  ]
  
  export const videos = [
    {
      id: '1',
      userId: '1',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      description: 'Big Buck Bunny tells the story of a giant rabbit 🐰 #animation #shortfilm',
      likes: 450,
      comments: 42,
      shares: 28,
      createdAt: '2023-09-15T14:30:00.000Z'
    },
    {
      id: '2',
      userId: '1',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      description: 'The first Blender Open Movie from 2006 🎥 #blender #animation',
      likes: 890,
      comments: 76,
      shares: 45,
      createdAt: '2023-09-14T20:15:00.000Z'
    },
    {
      id: '3',
      userId: '2',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
      description: 'HBO GO now works with Chromecast 📺 #streaming #tech',
      likes: 675,
      comments: 53,
      shares: 31,
      createdAt: '2023-09-13T18:45:00.000Z'
    },
    {
      id: '4',
      userId: '2',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. 🎵🎬 #chromecast',
      likes: 523,
      comments: 48,
      shares: 22,
      createdAt: '2023-09-12T09:20:00.000Z'
    },
    {
      id: '5',
      userId: '3',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
      description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. 📺🎉 #googlecast',
      likes: 782,
      comments: 64,
      shares: 39,
      createdAt: '2023-09-15T19:10:00.000Z'
    },
    {
      id: '6',
      userId: '3',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
      description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. 🚗💨 #chromecast',
      likes: 945,
      comments: 88,
      shares: 52,
      createdAt: '2023-09-14T15:30:00.000Z'
    }
  ]
  
  export const likedVideos: { [key: string]: string[] } = {
    '1': ['5', '6'],
    '2': ['1', '3'],
    '3': ['2', '4']
  }
  
  
  
  
  
  
    
    
  
  
  
  
  
  
  