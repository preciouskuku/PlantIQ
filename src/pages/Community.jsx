import { useEffect, useState } from "react";
import {
  MessageSquare, ThumbsUp, Users, Plus, Search, Filter,
  User, Calendar, Eye
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Avatar, AvatarFallback, AvatarImage
} from "@/components/ui/avatar";
import { getDiscussions } from "../services/Api"; // ✅ ensure this points to your real API module

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState([]); // ✅ state from backend

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await getDiscussions();
        setDiscussions(res); // assuming res is an array
      } catch (error) {
        console.error("Failed to fetch discussions:", error);
      }
    };
    fetchDiscussions();
  }, []);

  const categories = [
    { name: "Disease Identification", count: 45, color: "destructive" },
    { name: "Treatment Solutions", count: 32, color: "default" },
    { name: "Organic Farming", count: 28, color: "secondary" },
    { name: "Weather Discussions", count: 19, color: "default" },
    { name: "General Tips", count: 67, color: "secondary" }
  ];

  const popularExperts = [
    {
      name: "Dr. Sarah Chen",
      title: "Plant Pathologist",
      avatar: "",
      posts: 156,
      likes: 892,
      reputation: "Expert"
    },
    {
      name: "Mike Rodriguez",
      title: "Organic Farmer",
      avatar: "",
      posts: 89,
      likes: 543,
      reputation: "Veteran"
    },
    {
      name: "Emma Thompson",
      title: "Agricultural Consultant",
      avatar: "",
      posts: 234,
      likes: 1204,
      reputation: "Expert"
    }
  ];

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (discussion.tags || []).some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ... (keep the UI part unchanged) ... */}

      {/* Discussions Section */}
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <p className="text-muted-foreground text-sm">No discussions found.</p>
        ) : (
          filteredDiscussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-base sm:text-lg hover:text-primary transition-colors">
                        {discussion.title}
                      </h3>
                      {discussion.is_resolved && (
                        <Badge variant="default" className="text-xs">
                          Resolved
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {discussion.excerpt || discussion.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {(discussion.tags || []).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{discussion.author || "Anonymous"}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {discussion.category}
                    </Badge>
                  </div>

                  <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.replies_count || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes_count || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{discussion.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{discussion.last_activity || "Just now"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
