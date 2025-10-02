import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  route: string;
}

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Budi Santoso",
      avatar: "BS",
      content:
        "Just finished an amazing journey on Argo Bromo Anggrek! The service was exceptional and the views were breathtaking. Highly recommend the executive class!",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      route: "Jakarta → Surabaya",
    },
    {
      id: 2,
      author: "Siti Rahayu",
      avatar: "SR",
      content:
        "Tip for first-time travelers: Book your tickets at least 2 weeks in advance during holiday season. Just saved 30% on my upcoming trip!",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 15,
      route: "Bandung → Yogyakarta",
    },
    {
      id: 3,
      author: "Ahmad Wijaya",
      avatar: "AW",
      content:
        "The new dining car menu on Bima is fantastic! They now have local cuisine options. The nasi goreng was delicious 🍛",
      timestamp: "1 day ago",
      likes: 18,
      comments: 6,
      route: "Jakarta → Surabaya",
    },
  ]);

  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      toast.error("Please write something before posting");
      return;
    }

    const post: Post = {
      id: posts.length + 1,
      author: "You",
      avatar: "YO",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      route: "General",
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast.success("Post published successfully!");
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    toast.success("Post liked!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p className="text-muted-foreground">
            Share your travel experiences and connect with fellow passengers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="p-6">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    YO
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your train journey experience..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-24 mb-3"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handlePostSubmit} variant="hero">
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts Feed */}
            {posts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{post.author}</h4>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.route}
                      </Badge>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {[
                  { tag: "Executive Class Tips", count: 145 },
                  { tag: "Holiday Travel", count: 98 },
                  { tag: "Station Reviews", count: 67 },
                  { tag: "Food Recommendations", count: 54 },
                ].map((topic) => (
                  <div
                    key={topic.tag}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  >
                    <span className="text-sm font-medium">#{topic.tag}</span>
                    <span className="text-xs text-muted-foreground">
                      {topic.count} posts
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Routes */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Popular Routes</h3>
              <div className="space-y-2">
                {["Jakarta → Surabaya", "Bandung → Yogyakarta", "Jakarta → Malang"].map(
                  (route) => (
                    <Button
                      key={route}
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      {route}
                    </Button>
                  )
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
