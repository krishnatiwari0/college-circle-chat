
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Star, UserPlus, UserCheck } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for example profiles
const mockProfiles = {
  "1": {
    name: "Alex Johnson",
    collegeYear: "1st Year",
    bio: "Computer science major with a passion for AI and machine learning. Also love playing basketball and video games in my free time!",
    interests: ["Technology", "AI", "Basketball", "Gaming", "Coding"],
    profilePicture: null,
  },
  "2": {
    name: "Taylor Smith",
    collegeYear: "2nd Year",
    bio: "English literature major who loves poetry, classic novels, and writing short stories. Looking for friends to join my book club!",
    interests: ["Reading", "Writing", "Poetry", "Literature", "Art"],
    profilePicture: null,
  },
  "3": {
    name: "Jordan Lee",
    collegeYear: "1st Year",
    bio: "Biology major with a minor in environmental science. Passionate about conservation and sustainability. Love hiking and wildlife photography!",
    interests: ["Science", "Environment", "Photography", "Hiking", "Nature"],
    profilePicture: null,
  },
  "4": {
    name: "Riley Chen",
    collegeYear: "3rd Year",
    bio: "Business major focusing on entrepreneurship. Currently working on a startup idea and looking for like-minded individuals to bounce ideas off of.",
    interests: ["Business", "Entrepreneurship", "Technology", "Innovation", "Marketing"],
    profilePicture: null,
  },
  "5": {
    name: "Morgan Williams",
    collegeYear: "2nd Year",
    bio: "Film studies major with a love for cinematography and screenplay writing. Always looking to collaborate on short film projects!",
    interests: ["Film", "Writing", "Photography", "Art", "Music"],
    profilePicture: null,
  },
};

// Fixed the initialMessages to use the correct "self" | "other" type for sender
const initialMessages = [
  {
    id: "1",
    content: "Hey there! I noticed we both like technology. What kind of projects are you working on?",
    sender: "other" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

interface Message {
  id: string;
  content: string;
  sender: "self" | "other";
  timestamp: string;
}

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [friendStatus, setFriendStatus] = useState<"pending" | "accepted" | "none">("none");
  const navigate = useNavigate();
  
  const profileId = id || "1";
  const profile = mockProfiles[profileId as keyof typeof mockProfiles];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "self",
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "That's interesting! I'd love to hear more about that. Maybe we could meet at the library sometime?",
        sender: "other",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  const handleRate = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSendFriendRequest = () => {
    toast.success("Friend request sent!");
    setFriendStatus("pending");
  };

  const handleAcceptFriendRequest = () => {
    toast.success("Friend request accepted!");
    setFriendStatus("accepted");
  };

  return (
    <AppLayout>
      <div className="container py-4 max-w-2xl">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col h-[80vh]">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {profile.profilePicture ? (
                  <AvatarImage src={profile.profilePicture} alt="Profile" />
                ) : (
                  <AvatarFallback>👋</AvatarFallback>
                )}
              </Avatar>
              <div>
                {friendStatus === "accepted" && <h2 className="font-bold">{profile.name}</h2>}
                <h3 className="font-medium">{profile.collegeYear}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.interests.slice(0, 3).map((interest) => (
                    <span
                      key={interest}
                      className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length > 3 && (
                    <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">
                      +{profile.interests.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {friendStatus === "none" ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleSendFriendRequest}
                >
                  <UserPlus className="h-4 w-4" />
                  Add Friend
                </Button>
              ) : friendStatus === "pending" ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleAcceptFriendRequest}
                >
                  <UserCheck className="h-4 w-4" />
                  Accept
                </Button>
              ) : null}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Rate
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate this conversation</DialogTitle>
                    <DialogDescription>
                      How was your experience chatting with this person?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center gap-2 py-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate(star)}
                        className={`text-3xl ${
                          rating && star <= rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button onClick={() => navigate("/browse")}>
                      Submit Rating
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "self" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg 
                  ${
                    message.sender === "self"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
