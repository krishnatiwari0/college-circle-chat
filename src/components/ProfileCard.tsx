
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  id: string;
  collegeYear: string;
  bio: string;
  interests: string[];
  name?: string;
  profilePicture?: string;
  friendStatus?: "pending" | "accepted" | "none";
  onSwipeLeft: (id: string) => void;
  onSwipeRight: (id: string) => void;
}

const ProfileCard = ({
  id,
  collegeYear,
  bio,
  interests,
  name,
  profilePicture,
  friendStatus = "none",
  onSwipeLeft,
  onSwipeRight,
}: ProfileCardProps) => {
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const navigate = useNavigate();

  const handleSwipeLeft = () => {
    setIsSwipingLeft(true);
    setTimeout(() => {
      onSwipeLeft(id);
    }, 300);
  };

  const handleSwipeRight = () => {
    setIsSwipingRight(true);
    setTimeout(() => {
      onSwipeRight(id);
      navigate(`/chat/${id}`);
    }, 300);
  };

  // Only show name if they've accepted the friend request
  const showName = friendStatus === "accepted" && name;

  return (
    <Card
      className={`shadow-lg max-w-md mx-auto transition-all duration-300 
      ${isSwipingLeft ? "animate-swipe-left" : ""}
      ${isSwipingRight ? "animate-swipe-right" : ""}
      `}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-center h-48">
            {profilePicture ? (
              <Avatar className="h-40 w-40">
                <AvatarImage src={profilePicture} alt="Profile" />
                <AvatarFallback className="text-6xl">👋</AvatarFallback>
              </Avatar>
            ) : (
              <span className="text-6xl opacity-50">👋</span>
            )}
          </div>
          
          <div>
            {showName && <h3 className="font-bold text-lg mb-1">{name}</h3>}
            <h3 className="font-medium">{collegeYear}</h3>
            <p className="mt-2">{bio}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {interests.map((interest) => (
              <span
                key={interest}
                className="bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full bg-secondary hover:bg-secondary/80"
          onClick={handleSwipeLeft}
        >
          <X className="mr-2 h-5 w-5" />
          Skip
        </Button>
        <Button
          size="lg"
          className="rounded-full"
          onClick={handleSwipeRight}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Chat
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
