
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLayout from "@/components/AppLayout";
import { X, Camera, UserCircle } from "lucide-react";
import { toast } from "sonner";

const collegeYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate Student"];

const popularInterests = [
  "Art", "Music", "Sports", "Gaming", "Technology", "Reading", "Writing", 
  "Photography", "Film", "Dance", "Cooking", "Fashion", "Fitness", 
  "Travel", "Science", "Politics", "History", "Philosophy", "Anime",
  "Coding", "Mathematics", "Business", "Volunteering", "Environment"
];

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleAddInterest = (interest: string) => {
    if (interest && !interests.includes(interest) && interests.length < 10) {
      setInterests([...interests, interest]);
      setCustomInterest("");
    } else if (interests.length >= 10) {
      toast.warning("You can add up to 10 interests");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleAddCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddInterest(customInterest);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfilePicture(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.length === 0) {
      toast.warning("Please add at least one interest");
      return;
    }
    if (!collegeYear) {
      toast.warning("Please select your college year");
      return;
    }
    if (!name.trim()) {
      toast.warning("Please enter your name");
      return;
    }
    
    // Simulate profile creation success
    // In a real app, you would save all this data including the name and profile picture
    toast.success("Profile created successfully!");
    navigate("/browse");
  };

  return (
    <AppLayout showNav={false} showFooter={false}>
      <div className="container max-w-2xl py-8 md:py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Profile</CardTitle>
            <CardDescription>
              Tell us about yourself to find like-minded friends
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-3">
                <div 
                  className="relative cursor-pointer"
                  onClick={handleTriggerFileInput}
                >
                  <Avatar className="h-28 w-28">
                    {profilePicture ? (
                      <AvatarImage src={profilePicture} />
                    ) : (
                      <AvatarFallback className="bg-primary/10">
                        <UserCircle className="h-20 w-20 opacity-50" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
                <p className="text-sm text-muted-foreground">
                  Add profile picture
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Your name will only be visible to others after connecting
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">What year are you in?</Label>
                <Select 
                  value={collegeYear} 
                  onValueChange={setCollegeYear}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {collegeYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio - Tell others about yourself</Label>
                <Textarea
                  id="bio"
                  placeholder="Share a bit about yourself, your background, and what you're looking for..."
                  className="min-h-[120px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {bio.length}/300
                </p>
              </div>

              <div className="space-y-4">
                <Label>What are your interests and hobbies?</Label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <div
                      key={interest}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium flex items-center"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {popularInterests
                    .filter((interest) => !interests.includes(interest))
                    .slice(0, 12)
                    .map((interest) => (
                      <Button
                        key={interest}
                        type="button"
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleAddInterest(interest)}
                      >
                        {interest}
                      </Button>
                    ))}
                </div>
                <form onSubmit={handleAddCustomInterest} className="flex gap-2">
                  <Input
                    placeholder="Add custom interest"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    maxLength={20}
                  />
                  <Button 
                    type="submit" 
                    variant="outline"
                    disabled={!customInterest.trim()}
                  >
                    Add
                  </Button>
                </form>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={interests.length === 0 || !collegeYear || !name.trim()}
              >
                Create Profile
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreateProfile;
