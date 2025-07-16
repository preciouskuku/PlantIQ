import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, Camera, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const scanHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      crop: "Tomato",
      disease: "Early Blight",
      confidence: 94,
      status: "treated",
      severity: "moderate",
      image: "/placeholder.svg",
      treatment: "Copper fungicide applied",
      location: "Field A, Section 2"
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "09:15",
      crop: "Corn",
      disease: "Healthy",
      confidence: 99,
      status: "healthy",
      severity: "none",
      image: "/placeholder.svg",
      treatment: "No treatment needed",
      location: "Field B, Section 1"
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "16:45",
      crop: "Wheat",
      disease: "Rust Disease",
      confidence: 87,
      status: "monitoring",
      severity: "high",
      image: "/placeholder.svg",
      treatment: "Organic spray scheduled",
      location: "Field C, Section 3"
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "11:20",
      crop: "Potato",
      disease: "Late Blight",
      confidence: 91,
      status: "treated",
      severity: "high",
      image: "/placeholder.svg",
      treatment: "Systemic fungicide applied",
      location: "Field A, Section 1"
    },
    {
      id: 5,
      date: "2024-01-11",
      time: "08:30",
      crop: "Cucumber",
      disease: "Powdery Mildew",
      confidence: 88,
      status: "treated",
      severity: "moderate",
      image: "/placeholder.svg",
      treatment: "Organic sulfur spray",
      location: "Greenhouse 1"
    }
  ];

  const analytics = {
    totalScans: 247,
    healthyScans: 189,
    diseasedScans: 58,
    averageConfidence: 92,
    mostCommonDisease: "Early Blight",
    treatmentSuccess: 94
  };

  const diseaseStats = [
    { disease: "Early Blight", count: 23, percentage: 40, trend: "up" },
    { disease: "Late Blight", count: 18, percentage: 31, trend: "down" },
    { disease: "Powdery Mildew", count: 12, percentage: 21, trend: "stable" },
    { disease: "Rust Disease", count: 5, percentage: 8, trend: "up" }
  ];

  const filteredScans = scanHistory.filter(scan => {
    const matchesSearch =
      scan.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || scan.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "healthy": return "default";
      case "treated": return "secondary";
      case "monitoring": return "destructive";
      default: return "default";
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "none": return "default";
      case "moderate": return "secondary";
      case "high": return "destructive";
      default: return "default";
    }
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Date",
      "Time",
      "Crop",
      "Disease",
      "Confidence",
      "Status",
      "Severity",
      "Treatment",
      "Location"
    ];

    const rows = filteredScans.map(scan => [
      scan.id,
      scan.date,
      scan.time,
      scan.crop,
      scan.disease,
      scan.confidence,
      scan.status,
      scan.severity,
      `"${scan.treatment}"`,
      `"${scan.location}"`
    ]);

    const csvContent =
      [headers, ...rows]
        .map(e => e.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `scan_reports_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Scan Reports & Analytics</h1>
          <p className="text-muted-foreground">
            View your scan history, track disease patterns, and monitor treatment effectiveness
          </p>
        </div>
        <Button onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Scan History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalScans}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Healthy Crops</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {Math.round((analytics.healthyScans / analytics.totalScans) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {analytics.healthyScans} out of {analytics.totalScans}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.averageConfidence}%</div>
                <p className="text-xs text-muted-foreground">
                  Detection accuracy
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Treatment Success</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{analytics.treatmentSuccess}%</div>
                <p className="text-xs text-muted-foreground">
                  Successful treatments
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Scans</CardTitle>
                <CardDescription>Your latest crop disease detections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanHistory.slice(0, 5).map((scan) => (
                    <div key={scan.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{scan.crop}</p>
                          <Badge variant={getStatusBadge(scan.status)}>
                            {scan.confidence}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{scan.disease}</p>
                        <p className="text-xs text-muted-foreground">{scan.date} at {scan.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disease Distribution</CardTitle>
                <CardDescription>Most common diseases detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diseaseStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{stat.disease}</span>
                        <span className="text-sm text-muted-foreground">{stat.count} cases</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{stat.percentage}% of cases</span>
                        <Badge variant="outline" className="text-xs">
                          {stat.trend === "up" ? "↗" : stat.trend === "down" ? "↘" : "→"} {stat.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>
                Complete record of all your crop disease scans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by crop, disease, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="treated">Treated</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredScans.map((scan) => (
                  <div key={scan.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Camera className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{scan.crop}</h3>
                          <p className="text-muted-foreground">{scan.disease}</p>
                          <p className="text-sm text-muted-foreground">{scan.location}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={getStatusBadge(scan.status)}>
                          {scan.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {scan.date} at {scan.time}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Confidence</p>
                        <p className="font-medium">{scan.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Severity</p>
                        <Badge variant={getSeverityBadge(scan.severity)} className="text-xs">
                          {scan.severity}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Treatment</p>
                        <p className="font-medium">{scan.treatment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Scan Trends</CardTitle>
                <CardDescription>Track your scanning activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>Chart visualization would appear here</p>
                    <p className="text-sm">Showing scanning trends and patterns</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disease Occurrence by Month</CardTitle>
                <CardDescription>Seasonal disease patterns in your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Seasonal analysis chart</p>
                    <p className="text-sm">Track disease patterns by season</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Effectiveness</CardTitle>
                <CardDescription>Success rate of different treatment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Organic Treatments</span>
                    <span className="text-sm font-medium">89% success</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "89%" }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chemical Treatments</span>
                    <span className="text-sm font-medium">96% success</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "96%" }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Preventive Measures</span>
                    <span className="text-sm font-medium">78% success</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Field Performance</CardTitle>
                <CardDescription>Disease rates by field location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded">
                    <div>
                      <p className="font-medium">Field A</p>
                      <p className="text-sm text-muted-foreground">23 scans, 78% healthy</p>
                    </div>
                    <Badge variant="secondary">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded">
                    <div>
                      <p className="font-medium">Field B</p>
                      <p className="text-sm text-muted-foreground">31 scans, 92% healthy</p>
                    </div>
                    <Badge variant="default">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded">
                    <div>
                      <p className="font-medium">Field C</p>
                      <p className="text-sm text-muted-foreground">18 scans, 65% healthy</p>
                    </div>
                    <Badge variant="destructive">Needs Attention</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded">
                    <div>
                      <p className="font-medium">Greenhouse 1</p>
                      <p className="text-sm text-muted-foreground">12 scans, 89% healthy</p>
                    </div>
                    <Badge variant="default">Good</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
