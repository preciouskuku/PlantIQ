import { useEffect, useState } from "react";
import {
  MessageSquare, ThumbsUp, Users, Plus, Search, Filter,
  User, Calendar, Eye, MapPin, CheckCircle
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
import { getDiscussions } from "../services/Api";
import { Link } from 'react-router-dom';

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularExperts, setPopularExperts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const discussionsRes = await getDiscussions();
        setDiscussions(discussionsRes);

        setCategories([
          { name: "All Discussions", count: 212, color: "primary" },
          { name: "Disease Identification", count: 45, color: "destructive" },
          { name: "Treatment Solutions", count: 32, color: "default" },
          { name: "Organic Farming", count: 28, color: "secondary" },
        ]);

        setPopularExperts([
          {
            id: 'exp1',
            name: "Dr. Sarah Chen",
            title: "Plant Pathologist",
            avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah",
            posts: 156,
            likes: 892,
            reputation: "Expert"
          },
          {
            id: 'exp2',
            name: "Mike Rodriguez",
            title: "Organic Farmer",
            avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mike",
            posts: 89,
            likes: 543,
            reputation: "Veteran"
          },
          {
            id: 'exp3',
            name: "Emma Thompson",
            title: "Agricultural Consultant",
            avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Emma",
            posts: 234,
            likes: 1204,
            reputation: "Expert"
          }
        ]);

      } catch (error) {
        console.error("Failed to fetch community data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (discussion.tags || []).some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    discussion.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-10 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Header and CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Community Feed</h1>
          <p className="text-lg text-gray-500 mt-2">Get help with crop issues, share knowledge, and connect with other farmers.</p>
        </div>
        <Link to="/report-disease">
          <Button className="flex items-center gap-2 px-6 py-3 text-lg transition-transform transform hover:scale-105">
            <Plus className="h-5 w-5" />
            Report a Disease
          </Button>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Discussions & Search */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for crop issues, diseases, or users..."
                className="w-full pl-10 pr-4 py-2 text-base border border-gray-300 focus:border-primary focus:ring-primary rounded-lg shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 text-base transition-colors hover:bg-gray-100">
              <Filter className="h-5 w-5" />
              Filter
            </Button>
          </div>

          {/* Discussion List */}
          <div className="space-y-4">
            {filteredDiscussions.length === 0 ? (
              <p className="text-center text-gray-500 py-10 text-lg">No discussions found.</p>
            ) : (
              filteredDiscussions.map((discussion) => (
                <Link to={`/discussion/${discussion.id}`} key={discussion.id} className="block">
                  <Card className="hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-200">
                    <CardContent className="p-6 flex flex-col gap-4">
                      {/* Discussion Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-gray-200">
                            <AvatarImage src={discussion.author_avatar || `https://api.dicebear.com/7.x/lorelei/svg?seed=${discussion.author}`} alt={discussion.author} />
                            <AvatarFallback>{discussion.author?.charAt(0) || '?'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-semibold text-gray-800">{discussion.author || "Anonymous"}</span>
                            {discussion.author_reputation && (
                              <Badge variant="secondary" className="ml-2 text-xs px-2 py-0.5 bg-green-500 text-white font-medium rounded-full">
                                {discussion.author_reputation}
                              </Badge>
                            )}
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(discussion.created_at)}</span>
                            </p>
                          </div>
                        </div>
                        {discussion.is_resolved && (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs flex items-center gap-1 px-3 py-1 font-semibold rounded-full">
                            <CheckCircle className="h-3 w-3" /> Resolved
                          </Badge>
                        )}
                      </div>

                      {/* Discussion Title and Content */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 hover:text-primary transition-colors">{discussion.title}</h3>
                        <p className="text-gray-600 mt-2 line-clamp-2">{discussion.description || discussion.excerpt}</p>
                      </div>

                      {/* Tags and Metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-full bg-gray-200">
                          {discussion.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{discussion.location?.name || "Unknown Location"}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {discussion.replies_count || 0}</span>
                          <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {discussion.likes_count || 0}</span>
                          <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {discussion.views || 0}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          {/* Popular Topics Card */}
          <Card className="rounded-xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <Button key={category.name} variant="ghost" className="w-full justify-between hover:bg-gray-100 transition-colors">
                  <span className={`font-medium ${category.color === 'primary' ? 'text-primary' : 'text-gray-700'}`}>{category.name}</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal">{category.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Top Contributors Card */}
          <Card className="rounded-xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Top Contributors</CardTitle>
              <CardDescription className="text-gray-500">Farmers and experts helping the community.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularExperts.map((expert) => (
                <div key={expert.id} className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={expert.avatar} alt={expert.name} />
                    <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-base">{expert.name}</p>
                    <p className="text-sm text-gray-500">{expert.title}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {expert.posts}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card className="rounded-xl border border-gray-200 shadow-sm bg-primary text-white">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-xl font-bold">New to the community?</h4>
              <p className="text-sm opacity-90">Learn how to report a disease, ask questions, and follow discussions.</p>
              <Button variant="secondary" className="w-full mt-2 transition-transform transform hover:scale-105">
                Read Community Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}