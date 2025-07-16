import { useState } from "react";
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

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "Disease Identification", count: 45, color: "destructive" },
    { name: "Treatment Solutions", count: 32, color: "default" },
    { name: "Organic Farming", count: 28, color: "secondary" },
    { name: "Weather Discussions", count: 19, color: "default" },
    { name: "General Tips", count: 67, color: "secondary" }
  ];

  const discussions = [
    {
      id: 1,
      title: "Strange yellow spots on tomato leaves - need help identifying",
      author: "FarmerJohn2024",
      authorAvatar: "",
      category: "Disease Identification",
      replies: 12,
      likes: 8,
      views: 156,
      lastActivity: "2 hours ago",
      excerpt: "I've noticed these unusual yellow spots appearing on my tomato plants. They started small but are spreading quickly...",
      isResolved: false,
      tags: ["tomato", "yellow-spots", "urgent"]
    },
    {
      id: 2,
      title: "Organic treatment for early blight - my success story",
      author: "GreenThumbMary",
      authorAvatar: "",
      category: "Treatment Solutions",
      replies: 18,
      likes: 25,
      views: 289,
      lastActivity: "4 hours ago",
      excerpt: "After struggling with early blight for months, I finally found an organic solution that works. Here's what I did...",
      isResolved: true,
      tags: ["organic", "early-blight", "success-story"]
    },
    {
      id: 3,
      title: "Weather patterns affecting crop diseases in our region",
      author: "WeatherWatcherPete",
      authorAvatar: "",
      category: "Weather Discussions",
      replies: 7,
      likes: 15,
      views: 234,
      lastActivity: "6 hours ago",
      excerpt: "Has anyone else noticed the correlation between the recent humidity changes and increased fungal diseases?",
      isResolved: false,
      tags: ["weather", "humidity", "fungal-diseases"]
    },
    {
      id: 4,
      title: "Copper fungicide application timing - best practices",
      author: "AgriExpertSam",
      authorAvatar: "",
      category: "Treatment Solutions",
      replies: 23,
      likes: 31,
      views: 445,
      lastActivity: "8 hours ago",
      excerpt: "Timing is everything when it comes to copper fungicide application. Here's my guide based on 20 years of experience...",
      isResolved: true,
      tags: ["copper-fungicide", "timing", "best-practices"]
    },
    {
      id: 5,
      title: "Companion planting to prevent diseases naturally",
      author: "PermaculturePro",
      authorAvatar: "",
      category: "Organic Farming",
      replies: 14,
      likes: 22,
      views: 312,
      lastActivity: "1 day ago",
      excerpt: "Companion planting isn't just about maximizing space - it's also a powerful tool for natural disease prevention...",
      isResolved: false,
      tags: ["companion-planting", "natural", "prevention"]
    }
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
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Forum</h1>
          <p className="text-muted-foreground">
            Connect with fellow farmers, share experiences, and get expert advice
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Start Discussion
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Discussion Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category.name} variant={category.color} className="cursor-pointer">
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discussions */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-base sm:text-lg hover:text-primary transition-colors">
                          {discussion.title}
                        </h3>
                        {discussion.isResolved && (
                          <Badge variant="default" className="text-xs">
                            Resolved
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {discussion.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center flex-wrap gap-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{discussion.author}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {discussion.category}
                      </Badge>
                    </div>

                    <div className="flex items-center flex-wrap gap-4">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{discussion.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Community Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">3,891</p>
                <p className="text-sm text-muted-foreground">Total Discussions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">89%</p>
                <p className="text-sm text-muted-foreground">Questions Resolved</p>
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>
                Community experts helping farmers succeed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularExperts.map((expert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={expert.avatar} />
                      <AvatarFallback>
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{expert.name}</p>
                      <p className="text-xs text-muted-foreground">{expert.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {expert.reputation}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {expert.posts} posts, {expert.likes} likes
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Ask a Question
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Share Experience
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Browse FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
