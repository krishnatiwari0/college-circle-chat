
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { toast } from "sonner";

// Placeholder user data
const userData = {
  collegeYear: "2nd Year",
  bio: "Computer science major with a passion for AI and machine learning. Looking to connect with fellow tech enthusiasts and make some friends for study groups!",
  interests: ["Technology", "AI", "Gaming", "Basketball", "Movies"],
};

const Profile = () => {
  const [bio, setBio] = useState(userData.bio);
  const [interests, setInterests] = useState<string[]>(userData.interests);
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest && !interests.includes(newInterest) && interests.length < 10) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    } else if (interests.length >= 10) {
      toast.warning("You can add up to 10 interests");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSave = () => {
    // In a real app, this would update the user's profile in the backend
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <AppLayout>
      <div className="container py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              My Profile
              <Button
                variant="outline"
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-1">College Year</h3>
              <p>{userData.collegeYear}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Bio</h3>
              {isEditing ? (
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[120px]"
                  maxLength={300}
                />
              ) : (
                <p>{bio}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <div
                    key={interest}
                    className="interest-tag flex items-center"
                  >
                    {interest}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <form onSubmit={handleAddInterest} className="flex gap-2 mt-4">
                  <Input
                    placeholder="Add new interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    maxLength={20}
                  />
                  <Button type="submit" variant="outline">
                    Add
                  </Button>
                </form>
              )}
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">Account Settings</h3>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
