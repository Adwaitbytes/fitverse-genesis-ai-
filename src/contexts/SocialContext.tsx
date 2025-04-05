
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "@/components/ui/use-toast";
import { Post, Comment } from '@/components/SocialPost';
import { v4 as uuidv4 } from 'uuid';

interface SocialContextType {
  posts: Post[];
  createPost: (content: string, image?: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: string) => void;
  userFeed: Post[];
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

// Sample post data
const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    userId: 'system',
    userName: 'FitVerse Coach',
    userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'Just completed a 5km run! Feeling great about my progress this week. How\'s everyone else doing with their cardio goals?',
    likes: ['1'],
    comments: [
      {
        id: '1',
        userId: '1',
        userName: 'Demo User',
        userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'Amazing progress! Keep it up!',
        timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      }
    ],
    timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: '2',
    userId: 'system',
    userName: 'Sarah Fitness',
    userImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Here\'s a quick protein-packed breakfast idea for you all: Greek yogurt with berries, honey, and a sprinkle of granola. Perfect fuel for morning workouts!',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: [],
    comments: [],
    timestamp: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  }
];

export const SocialProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  
  // Load posts from localStorage when user changes
  useEffect(() => {
    if (user) {
      try {
        const savedPosts = localStorage.getItem(`fitverse_social_posts`);
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts));
        }
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    }
  }, [user]);
  
  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`fitverse_social_posts`, JSON.stringify(posts));
  }, [posts]);

  const createPost = (content: string, image?: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create posts",
        variant: "destructive"
      });
      return;
    }
    
    const newPost: Post = {
      id: uuidv4(),
      userId: user.id,
      userName: user.name,
      userImage: user.profileImage,
      content,
      image,
      likes: [],
      comments: [],
      timestamp: new Date().toISOString()
    };
    
    setPosts([newPost, ...posts]);
    
    toast({
      title: "Post Created",
      description: "Your post has been published successfully.",
    });
  };

  const likePost = (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const userLiked = post.likes.includes(user.id);
          
          // If user already liked, remove their like, otherwise add it
          const updatedLikes = userLiked
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id];
            
          return {
            ...post,
            likes: updatedLikes
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, commentText: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }
    
    const newComment: Comment = {
      id: uuidv4(),
      userId: user.id,
      userName: user.name,
      userImage: user.profileImage,
      text: commentText,
      timestamp: new Date().toISOString()
    };
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  // Get feed for current user 
  // In a real app this would have sophisticated algorithms to show relevant content
  const userFeed = posts.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <SocialContext.Provider value={{
      posts,
      createPost,
      likePost,
      addComment,
      userFeed
    }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
