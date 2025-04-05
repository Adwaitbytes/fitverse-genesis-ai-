
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fitverse-dark to-[#0a0a16] p-4">
      <div className="glass-card w-full max-w-md p-8 rounded-xl">
        <div className="text-center mb-8">
          <div className="bg-fitverse-blue/20 p-4 rounded-full inline-flex mb-4">
            <Dumbbell className="h-12 w-12 text-fitverse-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome to FitVerse</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="text-white"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-fitverse-blue hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="text-white"
            />
          </div>
          
          {error && <div className="text-sm text-red-500">{error}</div>}
          
          <Button 
            type="submit" 
            className="w-full bg-fitverse-blue hover:bg-fitverse-blue/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-fitverse-blue hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Demo account: demo@example.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
