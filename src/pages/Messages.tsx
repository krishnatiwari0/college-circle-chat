
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

// Mock conversations data
const conversations = [
  {
    id: "1",
    collegeYear: "1st Year",
    interests: ["Technology", "AI", "Basketball", "Gaming"],
    lastMessage: "Hey there! I noticed we both like technology. What kind of projects are you working on?",
    timestamp: "12:30 PM",
    unread: true,
  },
  {
    id: "2",
    collegeYear: "2nd Year",
    interests: ["Reading", "Writing", "Poetry", "Literature"],
    lastMessage: "I'd love to hear your thoughts on that book recommendation!",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "3",
    collegeYear: "1st Year", 
    interests: ["Science", "Environment", "Photography"],
    lastMessage: "The environmental science club meets on Thursdays if you want to join!",
    timestamp: "Mon",
    unread: false,
  },
  {
    id: "4",
    collegeYear: "3rd Year",
    interests: ["Business", "Entrepreneurship", "Innovation"],
    lastMessage: "Thanks for your insights on my startup idea. Would love to chat more about it.",
    timestamp: "Sun",
    unread: false,
  },
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    (convo) =>
      convo.collegeYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convo.interests.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container py-4 max-w-2xl">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Messages</h1>
          </div>

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="divide-y">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={`/chat/${conversation.id}`}
                  className="block p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {conversation.collegeYear}
                          {conversation.unread && (
                            <span className="ml-2 bg-primary h-2 w-2 rounded-full inline-block"></span>
                          )}
                        </h3>
                      </div>
                      <div className="flex gap-1 mt-1 overflow-hidden">
                        {conversation.interests.slice(0, 2).map((interest) => (
                          <span
                            key={interest}
                            className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                        {conversation.interests.length > 2 && (
                          <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">
                            +{conversation.interests.length - 2}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground min-w-[60px] text-right">
                      {conversation.timestamp}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No conversations found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
