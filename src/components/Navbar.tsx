
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { MessageCircle, User } from "lucide-react";

const Navbar = ({ showNav = true }: { showNav?: boolean }) => {
  if (!showNav) return null;
  
  return (
    <div className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <h1 className="font-bold text-lg text-primary">
            College<span className="text-foreground">Circle</span>
          </h1>
        </Link>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
