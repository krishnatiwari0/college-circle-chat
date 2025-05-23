
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate signup success
    toast.success("Account created successfully!");
    navigate("/create-profile");
  };

  return (
    <AppLayout showNav={false} showFooter={false}>
      <div 
        className="flex min-h-screen items-center justify-center p-4 md:p-8"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        
        <div className="w-full max-w-md z-10">
          <Link to="/" className="flex items-center justify-center mb-8">
            <h1 className="font-bold text-2xl text-center text-primary backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full">
              College<span className="text-foreground">Circle</span>
            </h1>
          </Link>
          
          <Card className="backdrop-blur-md bg-card/90 border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Create Account</CardTitle>
            </CardHeader>
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">College Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college-code">College Invite Code</Label>
                  <Input
                    id="college-code"
                    type="text"
                    placeholder="Enter your college code"
                    value={collegeCode}
                    onChange={(e) => setCollegeCode(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full mb-4">
                  Sign Up
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
