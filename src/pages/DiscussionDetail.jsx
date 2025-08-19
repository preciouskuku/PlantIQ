// src/pages/DiscussionDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ReplyIcon } from 'lucide-react';

const mockFetchDiscussion = (id) => {
  // This is a mock API call. In a real application, you would replace this
  // with a call to your backend endpoint: GET /api/discussions/:id
  return new Promise((resolve) => {
    setTimeout(() => {
      const discussions = {
        '1': {
          id: '1',
          title: "My tomato plants have yellow spots on the leaves.",
          description: "Hello everyone, I've noticed some yellow spots on the leaves of my tomato plants. It started on the lower leaves and seems to be spreading. The weather has been a bit humid lately. Any ideas on what this could be or how to treat it? I've attached a few photos. The plants are in my backyard garden, located in Florida.",
          photos: [
            "https://placehold.co/800x600/E8F5E9/2E7D32?text=Tomato+Leaf+1",
            "https://placehold.co/800x600/E8F5E9/2E7D32?text=Tomato+Leaf+2",
            "https://placehold.co/800x600/E8F5E9/2E7D32?text=Tomato+Leaf+3"
          ],
          author: {
            name: "John Doe",
            avatarUrl: "https://placehold.co/40x40/B3E5FC/01579B?text=JD",
            reputation: 150
          },
          location: "Florida, USA",
          category: "Vegetables",
          tags: ["Tomato", "Yellow Spots", "Fungal"],
          is_resolved: false,
          replies_count: 3,
          likes_count: 5,
          views: 124,
          last_activity: "2025-07-28T10:30:00Z",
          comments: [
            { id: 'c1', author: 'Jane Smith', authorAvatar: 'https://placehold.co/30x30/FFE0B2/E65100?text=JS', text: "It looks like Late Blight. Try using a copper-based fungicide and remove the infected leaves immediately.", createdAt: '2025-07-28T11:00:00Z' },
            { id: 'c2', author: 'AgriExpert', authorAvatar: 'https://placehold.co/30x30/C8E6C9/388E3C?text=AE', text: "I agree with Jane. Also, make sure to improve air circulation around your plants to reduce humidity.", createdAt: '2025-07-28T11:15:00Z' },
            { id: 'c3', author: 'FarmHelper', authorAvatar: 'https://placehold.co/30x30/BBDEFB/0D47A1?text=FH', text: "Can you provide a close-up of the underside of the leaves? That can help confirm the diagnosis.", createdAt: '2025-07-28T11:30:00Z' },
          ]
        },
        '2': {
          id: '2',
          title: "What's wrong with my corn stalks?",
          description: "My corn stalks are getting brown and the kernels are shriveling up. I've been watering them regularly but they don't seem to be doing well. The soil feels a little dry though.",
          photos: [
            "https://placehold.co/800x600/D7CCC8/4E342E?text=Corn+Stalks+1",
            "https://placehold.co/800x600/D7CCC8/4E342E?text=Corn+Stalks+2",
          ],
          author: {
            name: "Farmhand Fred",
            avatarUrl: "https://placehold.co/40x40/CFD8DC/263238?text=FF",
            reputation: 50
          },
          location: "Kansas, USA",
          category: "Grains",
          tags: ["Corn", "Drought", "Nutrient Deficiency"],
          is_resolved: false,
          replies_count: 1,
          likes_count: 2,
          views: 55,
          last_activity: "2025-07-27T15:00:00Z",
          comments: [
            { id: 'c4', author: 'Corn Crusader', authorAvatar: 'https://placehold.co/30x30/C5E1A5/33691E?text=CC', text: "This might be a nutrient issue. Have you had your soil tested recently?", createdAt: '2025-07-27T15:30:00Z' }
          ]
        },
      };
      resolve(discussions[id]);
    }, 1000);
  });
};

const DiscussionDetail = () => {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const fetchDiscussion = async () => {
      setLoading(true);
      try {
        const data = await mockFetchDiscussion(id); // Replace with your actual API call
        if (data) {
          setDiscussion(data);
        } else {
          setError("Discussion not found.");
        }
      } catch (err) {
        setError("Failed to load discussion.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscussion();
  }, [id]);

  const handlePostComment = async () => {
    if (!newCommentText.trim()) return;

    // TODO: Replace this with an actual API call to your backend
    // POST /api/discussions/:id/comments
    // You would pass the newCommentText in the request body.

    // Mocking the API response and updating the state
    const newComment = {
      id: `c${discussion.comments.length + 1}`, // Simple mock ID
      author: 'Current User', // This should be dynamic from your user context
      authorAvatar: 'https://placehold.co/30x30/E0E0E0/333333?text=CU', // Placeholder for current user
      text: newCommentText,
      createdAt: new Date().toISOString(),
    };

    setDiscussion(prevDiscussion => ({
      ...prevDiscussion,
      comments: [...prevDiscussion.comments, newComment],
      replies_count: prevDiscussion.replies_count + 1
    }));
    
    setNewCommentText('');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <p className="text-gray-600 dark:text-gray-400">Loading discussion...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button onClick={() => window.history.back()} className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Community
      </button>

      {discussion && (
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="border-b p-4 md:p-6">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {discussion.title}
            </CardTitle>
            <CardDescription className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
              <Avatar className="w-8 h-8">
                <AvatarImage src={discussion.author.avatarUrl} alt={discussion.author.name} />
                <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>Posted by <strong>{discussion.author.name}</strong></span>
              <span>•</span>
              <span>{new Date(discussion.last_activity).toLocaleDateString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {discussion.description}
            </p>

            {/* Photo Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {discussion.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Discussion photo ${index + 1}`}
                  className="w-full h-auto object-cover rounded-md shadow-sm"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/F0F0F0/000000?text=Image+Load+Error"; }}
                />
              ))}
            </div>

            {/* Stats and Tags */}
            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <span className="flex items-center">
                <ReplyIcon className="w-4 h-4 mr-1 text-primary" />
                {discussion.replies_count} replies
              </span>
              <span className="text-primary">•</span>
              {discussion.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Comment Form */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Leave a Reply</h3>
              <div className="flex flex-col space-y-4">
                <Textarea
                  placeholder="Share your thoughts or a helpful tip..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="resize-none"
                />
                <Button onClick={handlePostComment} className="self-end" disabled={!newCommentText.trim()}>
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-t pt-6">
              Comments ({discussion.comments.length})
            </h3>
            <div className="space-y-4">
              {discussion.comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{comment.author}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiscussionDetail;
