
import React from "react";
import FitverseHeader from "@/components/FitverseHeader";
import FitverseNavigation from "@/components/FitverseNavigation";
import AvatarHologram from "@/components/AvatarHologram";
import { MessageCircle, Heart, Award } from "lucide-react";

const friends = [
  { name: "Taylor", image: "https://randomuser.me/api/portraits/women/44.jpg", status: "workout" as const },
  { name: "Alex", image: "https://randomuser.me/api/portraits/men/32.jpg", status: "online" as const },
  { name: "Morgan", image: "https://randomuser.me/api/portraits/women/68.jpg", status: "online" as const },
  { name: "Jordan", image: "https://randomuser.me/api/portraits/men/75.jpg", status: "offline" as const },
  { name: "Jamie", image: "https://randomuser.me/api/portraits/women/22.jpg", status: "workout" as const },
  { name: "Riley", image: "https://randomuser.me/api/portraits/men/45.jpg", status: "online" as const },
  { name: "Casey", image: "https://randomuser.me/api/portraits/women/33.jpg", status: "offline" as const },
  { name: "Avery", image: "https://randomuser.me/api/portraits/men/67.jpg", status: "workout" as const }
];

interface Post {
  id: string;
  user: {
    name: string;
    image: string;
  };
  content: string;
  workout?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const posts: Post[] = [
  {
    id: "1",
    user: {
      name: "Taylor",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    content: "Just finished a 5K run in 23 minutes! 🏃‍♀️ Personal best!",
    workout: "Morning Run",
    likes: 24,
    comments: 5,
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    user: {
      name: "Alex",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    content: "Looking for a workout buddy for tomorrow's HIIT session. Anyone interested?",
    likes: 8,
    comments: 12,
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    user: {
      name: "Jamie",
      image: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    content: "Reached my goal of 100kg deadlift today! 💪 So proud of the progress!",
    workout: "Strength Training",
    likes: 42,
    comments: 8,
    timestamp: "Yesterday"
  }
];

const SocialPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-16 md:border-r md:border-white/10">
        <FitverseNavigation />
      </div>
      
      <div className="flex-1 overflow-auto pb-20 md:pb-8">
        <FitverseHeader />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-white">Social Feed</h1>
            <p className="text-gray-400">Connect with your fitness community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Social Feed */}
              {posts.map(post => (
                <div key={post.id} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <img 
                      src={post.user.image} 
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full border-2 border-fitverse-blue/50 mr-3" 
                    />
                    <div>
                      <h3 className="font-semibold text-white">{post.user.name}</h3>
                      <p className="text-xs text-gray-400">{post.timestamp}</p>
                    </div>
                  </div>
                  
                  <p className="text-white mb-3">{post.content}</p>
                  
                  {post.workout && (
                    <div className="bg-fitverse-blue/10 rounded-lg px-3 py-2 mb-4 inline-block">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-fitverse-blue mr-2" />
                        <span className="text-sm text-fitverse-blue">{post.workout}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <button className="flex items-center text-gray-400 hover:text-fitverse-pink transition-colors">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-fitverse-blue transition-colors">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {/* Friends */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Friends</h2>
                  <a href="#" className="text-sm text-fitverse-blue hover:text-fitverse-purple transition-colors">See All</a>
                </div>
                
                <div className="glass-card p-4 rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {friends.slice(0, 4).map((friend, index) => (
                      <AvatarHologram 
                        key={index}
                        name={friend.name}
                        image={friend.image}
                        status={friend.status}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Active Challenges */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Active Challenges</h2>
                  <a href="#" className="text-sm text-fitverse-blue hover:text-fitverse-purple transition-colors">Join</a>
                </div>
                
                <div className="glass-card p-4 rounded-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-fitverse-blue/20 p-2 rounded-full mr-3">
                          <Award className="w-5 h-5 text-fitverse-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white text-sm">10K Steps Daily</h3>
                          <p className="text-xs text-gray-400">12 friends participating</p>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-fitverse-purple">4/7 days</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-fitverse-pink/20 p-2 rounded-full mr-3">
                          <Award className="w-5 h-5 text-fitverse-pink" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white text-sm">30-Day Push-up</h3>
                          <p className="text-xs text-gray-400">8 friends participating</p>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-fitverse-purple">18/30 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SocialPage;
