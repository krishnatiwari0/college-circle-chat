
import { useState } from "react";
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
import AppLayout from "@/components/AppLayout";
import { X } from "lucide-react";
import { toast } from "sonner";

const collegeYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate Student"];

const popularInterests = [
  "Art", "Music", "Sports", "Gaming", "Technology", "Reading", "Writing", 
  "Photography", "Film", "Dance", "Cooking", "Fashion", "Fitness", 
  "Travel", "Science", "Politics", "History", "Philosophy", "Anime",
  "Coding", "Mathematics", "Business", "Volunteering", "Environment"
];

const CreateProfile = () => {
  const [bio, setBio] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
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
    
    // Simulate profile creation success
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
                disabled={interests.length === 0 || !collegeYear}
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
