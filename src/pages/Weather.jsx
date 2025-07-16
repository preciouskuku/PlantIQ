import { useState } from "react";
import { Cloud, CloudRain, Sun, AlertTriangle, Droplets, Wind, Thermometer, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Weather() {
  const currentWeather = {
    temperature: 28,
    humidity: 75,
    windSpeed: 12,
    condition: "Partly Cloudy",
    icon: Cloud,
    visibility: 8,
    precipitation: 20,
  };

  const forecast = [
    { day: "Today", high: 28, low: 18, humidity: 75, icon: Cloud, condition: "Partly Cloudy", rain: 20 },
    { day: "Tomorrow", high: 30, low: 20, humidity: 80, icon: CloudRain, condition: "Light Rain", rain: 65 },
    { day: "Wed", high: 26, low: 16, humidity: 70, icon: CloudRain, condition: "Heavy Rain", rain: 85 },
    { day: "Thu", high: 24, low: 14, humidity: 90, icon: CloudRain, condition: "Thunderstorm", rain: 95 },
    { day: "Fri", high: 27, low: 17, humidity: 65, icon: Sun, condition: "Sunny", rain: 10 },
    { day: "Sat", high: 29, low: 19, humidity: 60, icon: Sun, condition: "Clear", rain: 5 },
    { day: "Sun", high: 31, low: 21, humidity: 55, icon: Sun, condition: "Sunny", rain: 0 },
  ];

  const diseaseRisks = [
    {
      disease: "Late Blight",
      risk: "High",
      probability: 85,
      crops: ["Tomato", "Potato"],
      reason: "High humidity + moderate temperatures",
      severity: "high",
      daysAhead: 2,
    },
    {
      disease: "Powdery Mildew",
      risk: "Medium",
      probability: 60,
      crops: ["Cucumber", "Squash"],
      reason: "Warm days with cool nights",
      severity: "medium",
      daysAhead: 1,
    },
    {
      disease: "Rust Diseases",
      risk: "Low",
      probability: 25,
      crops: ["Wheat", "Corn"],
      reason: "Low humidity expected",
      severity: "low",
      daysAhead: 5,
    },
    {
      disease: "Root Rot",
      risk: "High",
      probability: 90,
      crops: ["All crops"],
      reason: "Heavy rainfall + poor drainage",
      severity: "high",
      daysAhead: 3,
    },
  ];

  const recommendations = [
    {
      title: "Apply Preventive Fungicide",
      priority: "high",
      description: "High humidity forecast increases fungal disease risk",
      crops: ["Tomato", "Potato"],
      timeframe: "Next 24 hours",
    },
    {
      title: "Improve Drainage",
      priority: "high",
      description: "Heavy rain expected - ensure proper water runoff",
      crops: ["All crops"],
      timeframe: "Before Thursday",
    },
    {
      title: "Harvest Ready Crops",
      priority: "medium",
      description: "Storm approaching - harvest what's ready to avoid damage",
      crops: ["Fruits", "Vegetables"],
      timeframe: "Next 48 hours",
    },
    {
      title: "Reduce Irrigation",
      priority: "low",
      description: "Natural rainfall will provide adequate water",
      crops: ["All crops"],
      timeframe: "This week",
    },
  ];

  const getRiskColor = (severity) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Weather & Disease Predictions</h1>
        <p className="text-muted-foreground">
          Monitor weather conditions and get disease risk alerts for your crops
        </p>
      </div>

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <currentWeather.icon className="h-5 w-5 text-primary" />
            <span>Current Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Thermometer className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentWeather.temperature}°C</p>
              <p className="text-sm text-muted-foreground">Temperature</p>
            </div>
            <div className="text-center">
              <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
              <p className="text-sm text-muted-foreground">Humidity</p>
            </div>
            <div className="text-center">
              <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentWeather.windSpeed} km/h</p>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
            </div>
            <div className="text-center">
              <Eye className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{currentWeather.visibility} km</p>
              <p className="text-sm text-muted-foreground">Visibility</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
          <TabsTrigger value="risks">Disease Risks</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Weather Forecast</CardTitle>
              <CardDescription>
                Plan your farming activities based on upcoming weather conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {forecast.map((day, index) => (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium mb-2">{day.day}</p>
                      <day.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">{day.condition}</p>
                      <div className="space-y-1">
                        <p className="text-lg font-bold">{day.high}°/{day.low}°</p>
                        <div className="flex items-center justify-center space-x-1 text-xs">
                          <Droplets className="h-3 w-3 text-blue-500" />
                          <span>{day.humidity}%</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1 text-xs">
                          <CloudRain className="h-3 w-3 text-gray-500" />
                          <span>{day.rain}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Disease Risk Predictions</CardTitle>
              <CardDescription>
                AI-powered disease risk assessment based on weather forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseaseRisks.map((risk, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{risk.disease}</h3>
                        <p className="text-sm text-muted-foreground">
                          Affects: {risk.crops.join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getRiskColor(risk.severity)}>
                          {risk.risk} Risk
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {risk.daysAhead} days ahead
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Probability</span>
                        <span className="text-sm font-medium">{risk.probability}%</span>
                      </div>
                      <Progress value={risk.probability} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        <AlertTriangle className="h-3 w-3 inline mr-1" />
                        {risk.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Action Recommendations</CardTitle>
              <CardDescription>
                Preventive measures based on weather and disease risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{rec.title}</h3>
                      <Badge variant={getPriorityColor(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Crops: {rec.crops.join(", ")}</span>
                      <span className="font-medium text-primary">{rec.timeframe}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
