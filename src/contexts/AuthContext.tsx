
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  fitnessGoals: string[];
  geminiApiKey?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  updateApiKey: (key: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Updated mock user data with proper types
interface MockUser extends User {
  password: string;
}

// Mock user data for demonstration
const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    fitnessLevel: 'intermediate',
    fitnessGoals: ['Muscle gain', 'Improved endurance'],
    geminiApiKey: ''
  }
];

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user was previously logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('fitverse_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user data', error);
        localStorage.removeItem('fitverse_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call to your backend
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('fitverse_user', JSON.stringify(userWithoutPassword));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try demo@example.com / password123",
        variant: "destructive"
      });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would make an API call to your backend
    if (MOCK_USERS.some(u => u.email === email)) {
      toast({
        title: "Registration Failed",
        description: "Email already in use. Try a different email.",
        variant: "destructive"
      });
      throw new Error('Email already in use');
    }
    
    // Create new user with proper types
    const newUser: MockUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      password,
      profileImage: '', // Add default empty profileImage to match type
      fitnessLevel: 'beginner',
      fitnessGoals: [],
      geminiApiKey: ''
    };
    
    // In a real app, we'd save this to the database
    MOCK_USERS.push(newUser);
    
    const { password: pwd, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('fitverse_user', JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Registration Successful",
      description: `Welcome to FitVerse, ${name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fitverse_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('fitverse_user', JSON.stringify(updatedUser));
      
      // Update the mock user in the array (in a real app, this would be an API call)
      const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates };
      }
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  const updateApiKey = (key: string) => {
    if (user) {
      const updatedUser = { ...user, geminiApiKey: key };
      setUser(updatedUser);
      localStorage.setItem('fitverse_user', JSON.stringify(updatedUser));
      toast({
        title: "API Key Updated",
        description: "Your Gemini AI API key has been saved.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateUserProfile,
      updateApiKey
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
