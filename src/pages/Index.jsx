import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminDashboard from "./AdminDashboard";
import {
  Leaf,
  Camera,
  Users,
  Globe,
  Shield,
  Brain,
  ChevronRight,
  Smartphone,
  CloudRain,
  MessageSquare,
  TrendingUp,
  Star
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description: "Advanced machine learning algorithms detect crop diseases with 95+ accuracy"
    },
    {
      icon: Camera,
      title: "Instant Image Scanning",
      description: "Simply snap a photo of your plant and get immediate disease detection results"
    },
    {
      icon: CloudRain,
      title: "Weather Integration",
      description: "Real-time weather data and disease outbreak predictions for your region"
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect with fellow farmers and agricultural experts worldwide"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Available in multiple languages to serve farmers globally"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Fully responsive design works perfectly on all devices"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Farmers" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "200+", label: "Crop Diseases" },
    { number: "40+", label: "Countries" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">PlantIQ</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/signin">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4">
              AI-Powered Crop Disease Detection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Protect Your Crops with
              <span className="text-primary block">PlantIQ</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology helps farmers detect crop diseases early, providing 
              personalized treatment recommendations and connecting you with agricultural experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signin">
                <Button size="lg" className="text-lg px-8">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Scanning
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              PlantIQ serves different roles in the agricultural ecosystem. 
              Select your role to access the right tools and features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Farmer Dashboard</CardTitle>
                <CardDescription>
                  Upload images, get AI diagnosis, receive treatment recommendations, and connect with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-primary" />Image scanning & diagnosis</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-primary" />Treatment recommendations</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-primary" />Weather reports</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-primary" />Community forum access</li>
                </ul>
                <Link to="/signin">
                  <Button className="w-full group-hover:bg-primary/90">
                    Access Farmer Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Dashboard */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-warning/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-warning/10 rounded-full w-fit">
                  <TrendingUp className="h-8 w-8 text-warning" />
                </div>
                <CardTitle className="text-xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  Oversee platform operations, manage users, moderate content, and access comprehensive analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-warning" />Platform oversight</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-warning" />User management</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-warning" />Content moderation</li>
                  <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-warning" />Advanced analytics</li>
                </ul>
                <Link to="/AdminDashboard">
                  <Button className="w-full bg-warning hover:bg-warning/90 text-warning-foreground group-hover:bg-warning/90">
                    Access Admin Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              PlantIQ combines cutting-edge AI technology with practical farming solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">PlantIQ</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering farmers worldwide with AI-powered crop disease detection 
                and expert agricultural guidance.
              </p>
              <div className="flex space-x-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground ml-2">
                  Trusted by 50,000+ farmers
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#">Features</Link></li>
                <li><Link to="#">Pricing</Link></li>
                <li><Link to="#">API</Link></li>
                <li><Link to="#">Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#">Help Center</Link></li>
                <li><Link to="#">Community</Link></li>
                <li><Link to="#">Contact Us</Link></li>
                <li><Link to="#">Status</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 PlantIQ. All rights reserved. Empowering sustainable agriculture through technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
