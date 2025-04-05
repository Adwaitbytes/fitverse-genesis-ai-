
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import SocialPost from "@/components/SocialPost";
import { useSocial } from "@/contexts/SocialContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const SocialPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { userFeed, createPost, likePost, addComment } = useSocial();
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create posts",
        variant: "destructive"
      });
      return;
    }
    
    if (postContent.trim()) {
      createPost(postContent, postImage || undefined);
      setPostContent("");
      setPostImage("");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">FitVerse Community</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="glass-card p-4 lg:p-6 h-fit lg:sticky lg:top-20">
            <h2 className="text-xl font-bold text-white mb-4">Community</h2>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-white">
                <User className="mr-2 h-4 w-4" />
                My Feed
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                <User className="mr-2 h-4 w-4" />
                Discover
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                <User className="mr-2 h-4 w-4" />
                My Friends
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                <User className="mr-2 h-4 w-4" />
                Groups
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                <User className="mr-2 h-4 w-4" />
                Events
              </Button>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post creation card */}
            <Card className="glass-card p-4">
              <form onSubmit={handleCreatePost}>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    {user?.profileImage ? (
                      <AvatarImage src={user.profileImage} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-fitverse-blue/20 text-fitverse-blue">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Input
                      className="bg-white/5 border-white/10 focus:border-fitverse-blue text-white"
                      placeholder={isAuthenticated ? "What's on your mind?" : "Sign in to create a post..."}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      disabled={!isAuthenticated}
                    />
                    
                    {postImage && (
                      <div className="relative">
                        <img 
                          src={postImage} 
                          alt="Post preview" 
                          className="w-full h-auto max-h-60 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setPostImage("")}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <Button 
                        type="button" 
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() => {
                          if (isAuthenticated) {
                            // For demo purposes, use a random image
                            const randomId = Math.floor(Math.random() * 1000);
                            setPostImage(`https://picsum.photos/seed/${randomId}/800/600`);
                          } else {
                            toast({
                              title: "Authentication Required",
                              description: "Please sign in to add images",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        <ImageIcon className="h-5 w-5 mr-2" />
                        Add Image
                      </Button>
                      
                      <Button 
                        type="submit"
                        className="bg-fitverse-blue hover:bg-fitverse-blue/90"
                        disabled={!isAuthenticated || !postContent.trim()}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Card>
            
            {/* Posts feed */}
            <div className="space-y-6">
              {userFeed.length > 0 ? (
                userFeed.map(post => (
                  <SocialPost 
                    key={post.id} 
                    post={post}
                    onLike={likePost}
                    onComment={addComment}
                  />
                ))
              ) : (
                <div className="glass-card p-6 text-center">
                  <p className="text-gray-300">No posts yet. Be the first to share something!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SocialPage;
