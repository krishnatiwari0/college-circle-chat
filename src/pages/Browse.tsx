
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import ProfileCard from "@/components/ProfileCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock data for example profiles
const mockProfiles = [
  {
    id: "1",
    collegeYear: "1st Year",
    bio: "Computer science major with a passion for AI and machine learning. Also love playing basketball and video games in my free time!",
    interests: ["Technology", "AI", "Basketball", "Gaming", "Coding"],
  },
  {
    id: "2",
    collegeYear: "2nd Year",
    bio: "English literature major who loves poetry, classic novels, and writing short stories. Looking for friends to join my book club!",
    interests: ["Reading", "Writing", "Poetry", "Literature", "Art"],
  },
  {
    id: "3",
    collegeYear: "1st Year",
    bio: "Biology major with a minor in environmental science. Passionate about conservation and sustainability. Love hiking and wildlife photography!",
    interests: ["Science", "Environment", "Photography", "Hiking", "Nature"],
  },
  {
    id: "4",
    collegeYear: "3rd Year",
    bio: "Business major focusing on entrepreneurship. Currently working on a startup idea and looking for like-minded individuals to bounce ideas off of.",
    interests: ["Business", "Entrepreneurship", "Technology", "Innovation", "Marketing"],
  },
  {
    id: "5",
    collegeYear: "2nd Year",
    bio: "Film studies major with a love for cinematography and screenplay writing. Always looking to collaborate on short film projects!",
    interests: ["Film", "Writing", "Photography", "Art", "Music"],
  },
];

const Browse = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentProfile, setCurrentProfile] = useState(mockProfiles[0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (profiles.length === 0) {
      toast.info("You've gone through all profiles. Check back later for more!");
      // In a real app, you might fetch more profiles or show a different view
    } else {
      setCurrentProfile(profiles[0]);
    }
  }, [profiles]);

  const handleSwipeLeft = (id: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleSwipeRight = (id: string) => {
    // In a real app, this would create a match or open a chat
    toast.success("You've initiated a chat!");
    setProfiles(profiles.filter((profile) => profile.id !== id));
    // Navigate is handled inside the ProfileCard component
  };

  return (
    <AppLayout>
      <div className="container py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Discover New Friends
          </h1>
          
          {profiles.length > 0 ? (
            <div className="h-[500px] flex items-center">
              <ProfileCard
                id={currentProfile.id}
                collegeYear={currentProfile.collegeYear}
                bio={currentProfile.bio}
                interests={currentProfile.interests}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            </div>
          ) : (
            <div className="text-center p-8 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No More Profiles</h3>
              <p className="text-muted-foreground mb-4">
                You've gone through all available profiles for now. Check back later!
              </p>
              <button 
                className="text-primary hover:underline"
                onClick={() => setProfiles(mockProfiles)}
              >
                Reset Profiles (Demo Only)
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Browse;
