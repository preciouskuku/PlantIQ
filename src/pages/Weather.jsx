import { useEffect, useState } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  AlertTriangle,
  Droplets,
  Wind,
  Thermometer,
  Eye
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Weather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-17.83&longitude=31.05&current=temperature_2m,relative_humidity_2m,wind_speed_10m,visibility&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=Africa/Harare"
        );
        const data = await response.json();

        const now = {
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          visibility: (data.current.visibility / 1000).toFixed(1), // meters to km
          icon: Cloud,
          condition: "Live"
        };

        const dailyForecast = data.daily.time.map((date, i) => ({
          day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
          high: data.daily.temperature_2m_max[i],
          low: data.daily.temperature_2m_min[i],
          rain: data.daily.precipitation_probability_max[i],
          condition: mapWeatherCode(data.daily.weathercode[i]),
          icon: getWeatherIcon(data.daily.weathercode[i]),
        }));

        setCurrentWeather(now);
        setForecast(dailyForecast);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    }

    fetchWeather();
  }, []);

  function mapWeatherCode(code) {
    if ([0].includes(code)) return "Clear";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "Rain";
    if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Unknown";
  }

  function getWeatherIcon(code) {
    if ([0, 1].includes(code)) return Sun;
    if ([2, 3, 45, 48].includes(code)) return Cloud;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain;
    if ([95, 96, 99].includes(code)) return AlertTriangle;
    return Cloud;
  }

  const getRiskColor = (severity) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "default";
    }
  };

  const diseaseRisks = [
    {
      disease: "Late Blight",
      risk: "High",
      probability: 85,
      crops: ["Tomato", "Potato"],
      reason: "High humidity + moderate temperatures",
      severity: "high",
    },
    {
      disease: "Powdery Mildew",
      risk: "Medium",
      probability: 60,
      crops: ["Cucumber", "Squash"],
      reason: "Warm days with cool nights",
      severity: "medium",
    },
    {
      disease: "Rust",
      risk: "Low",
      probability: 25,
      crops: ["Wheat", "Corn"],
      reason: "Low humidity expected",
      severity: "low",
    },
    {
      disease: "Root Rot",
      risk: "High",
      probability: 90,
      crops: ["All crops"],
      reason: "Heavy rainfall + poor drainage",
      severity: "high",
    },
  ];

  const recommendations = [
    {
      title: "Good for Seeding",
      priority: "high",
      description: "Light rain and warm temperatures ideal for germination.",
      crops: ["Maize", "Beans"],
      timeframe: "This Week"
    },
    {
      title: "Harvest Ready Crops Early",
      priority: "medium",
      description: "Rain forecast ahead - avoid post-harvest losses.",
      crops: ["Tomato", "Cabbage"],
      timeframe: "Next 48 hours"
    },
    {
      title: "Fungicide Application",
      priority: "high",
      description: "High humidity conditions increase fungal disease risk.",
      crops: ["Potato", "Tomato"],
      timeframe: "Within 24 hours"
    },
    {
      title: "Reduce Irrigation",
      priority: "low",
      description: "Natural rainfall will support crops this week.",
      crops: ["All crops"],
      timeframe: "This week"
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Weather & Farming Insights</h1>
      <p className="text-muted-foreground">Plan your crops based on forecast, risks and advice.</p>

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {currentWeather?.icon && <currentWeather.icon className="h-5 w-5" />}
            <span>Current Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentWeather ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Thermometer className="mx-auto mb-1" />
                <p className="text-xl font-bold">{currentWeather.temperature}°C</p>
                <p className="text-sm">Temperature</p>
              </div>
              <div className="text-center">
                <Droplets className="mx-auto mb-1" />
                <p className="text-xl font-bold">{currentWeather.humidity}%</p>
                <p className="text-sm">Humidity</p>
              </div>
              <div className="text-center">
                <Wind className="mx-auto mb-1" />
                <p className="text-xl font-bold">{currentWeather.windSpeed} km/h</p>
                <p className="text-sm">Wind Speed</p>
              </div>
              <div className="text-center">
                <Eye className="mx-auto mb-1" />
                <p className="text-xl font-bold">{currentWeather.visibility} km</p>
                <p className="text-sm">Visibility</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
          <TabsTrigger value="risks">Disease Risks</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Forecast</CardTitle>
              <CardDescription>Plan activities based on upcoming days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {forecast.map((day, i) => (
                  <Card key={i} className="text-center border">
                    <CardContent className="p-4">
                      <p className="font-medium">{day.day}</p>
                      <day.icon className="h-6 w-6 mx-auto text-primary my-2" />
                      <p>{day.condition}</p>
                      <p className="text-sm">{day.high}° / {day.low}°</p>
                      <p className="text-xs text-muted-foreground">{day.rain}% rain</p>
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
              <CardTitle>Disease Risks</CardTitle>
              <CardDescription>Stay ahead of possible infections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {diseaseRisks.map((risk, i) => (
                <div key={i} className="border p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{risk.disease}</h3>
                    <Badge variant={getRiskColor(risk.severity)}>{risk.risk}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{risk.reason}</p>
                  <p className="text-xs">Crops: {risk.crops.join(", ")}</p>
                  <Progress value={risk.probability} className="mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Farming Recommendations</CardTitle>
              <CardDescription>Smart tips based on weather</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="border p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{rec.title}</h3>
                    <Badge variant={getRiskColor(rec.priority)}>{rec.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                  <p className="text-xs">Crops: {rec.crops.join(", ")}</p>
                  <p className="text-xs">Timeframe: {rec.timeframe}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
