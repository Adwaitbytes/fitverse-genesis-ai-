
import React, { useState } from "react";
import { Heart, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  image?: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  timestamp: string;
}

interface SocialPostProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

const SocialPost: React.FC<SocialPostProps> = ({ post, onLike, onComment }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const isLiked = user && post.likes.includes(user.id);
  const likeCount = post.likes.length;
  const commentCount = post.comments.length;
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  const handleLike = () => {
    if (user) {
      onLike(post.id);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && comment.trim()) {
      onComment(post.id, comment);
      setComment("");
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-xl mb-6">
      <div className="p-4">
        {/* Post header */}
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 border border-white/10">
            {post.userImage ? (
              <AvatarImage src={post.userImage} alt={post.userName} />
            ) : (
              <AvatarFallback className="bg-fitverse-blue/20 text-fitverse-blue">
                <User className="h-5 w-5" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-3">
            <h3 className="text-white font-medium">{post.userName}</h3>
            <p className="text-gray-400 text-xs">{timeAgo}</p>
          </div>
        </div>

        {/* Post content */}
        <p className="text-white mb-4">{post.content}</p>
        
        {/* Post image if it exists */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Like and comment counts */}
        <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
          <div>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</div>
          <button 
            onClick={() => setShowComments(!showComments)} 
            className="hover:text-white transition-colors"
          >
            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex border-t border-b border-white/10 py-1">
          <Button 
            variant="ghost" 
            className={`flex-1 ${isLiked ? 'text-fitverse-pink' : 'text-white'}`} 
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-fitverse-pink' : ''}`} />
            Like
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex-1 text-white"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Comment
          </Button>
        </div>

        {/* Comment section */}
        {showComments && (
          <div className="mt-4">
            {/* Comment list */}
            {post.comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex">
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      {comment.userImage ? (
                        <AvatarImage src={comment.userImage} alt={comment.userName} />
                      ) : (
                        <AvatarFallback className="bg-fitverse-blue/20 text-fitverse-blue text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="ml-2 bg-white/5 rounded-lg px-3 py-2 flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-white">{comment.userName}</span>
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment form */}
            <form onSubmit={handleComment} className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                {user?.profileImage ? (
                  <AvatarImage src={user.profileImage} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-fitverse-blue/20 text-fitverse-blue">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Input
                className="flex-1 bg-white/5 border-white/10 focus:border-fitverse-blue"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button 
                type="submit"
                className="ml-2 bg-fitverse-blue hover:bg-fitverse-blue/90"
                disabled={!comment.trim()}
              >
                Post
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialPost;
