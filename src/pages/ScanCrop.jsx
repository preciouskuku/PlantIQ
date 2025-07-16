import { useState, useRef } from "react";
import { Camera, Upload, X, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function ScanCrop() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          disease: "Early Blight",
          confidence: 94,
          severity: "Moderate",
          description:
            "A common fungal disease affecting tomato and potato plants. Characterized by dark brown spots with concentric rings.",
          organic_treatments: [
            "Apply copper-based fungicides",
            "Improve air circulation",
            "Remove affected leaves",
            "Use compost tea spray",
          ],
          chemical_treatments: [
            "Chlorothalonil fungicide",
            "Mancozeb application",
            "Copper sulfate spray",
            "Azoxystrobin treatment",
          ],
          prevention: [
            "Crop rotation",
            "Proper spacing between plants",
            "Avoid overhead watering",
            "Mulching around plants",
          ],
        },
        {
          disease: "Healthy Leaf",
          confidence: 98,
          severity: "None",
          description:
            "The leaf appears healthy with no signs of disease or pest damage. Continue monitoring for any changes.",
          organic_treatments: [],
          chemical_treatments: [],
          prevention: [
            "Regular inspection",
            "Maintain proper nutrition",
            "Adequate watering",
            "Good air circulation",
          ],
        },
      ];

      // Randomly select a result for demo
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: `Detected: ${randomResult.disease} with ${randomResult.confidence}% confidence`,
      });
    }, 3000);
  };

  const resetScan = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Crop Disease Scanner</h1>
        <p className="text-muted-foreground">
          Upload or capture an image of your crop to detect diseases and get treatment recommendations
        </p>
      </div>

      {!selectedImage ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>Take a photo or upload an image of the affected crop or leaf</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop your image here</h3>
              <p className="text-muted-foreground mb-4">or click to browse from your device</p>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose Image
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Image Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Image Preview</CardTitle>
              <Button variant="outline" size="sm" onClick={resetScan}>
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Crop scan"
                  className="w-full h-64 object-cover rounded-lg border border-border"
                />
                {!analysisResult && !isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <Button onClick={analyzeImage} size="lg">
                      <Camera className="mr-2 h-5 w-5" />
                      Analyze Image
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <div>
                    <p className="font-medium">Analyzing your crop...</p>
                    <p className="text-sm text-muted-foreground">This may take a few moments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    {analysisResult.disease === "Healthy Leaf" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    )}
                    <span>Analysis Results</span>
                  </CardTitle>
                  <Badge variant={analysisResult.disease === "Healthy Leaf" ? "default" : "destructive"}>
                    {analysisResult.confidence}% Confidence
                  </Badge>
                </div>
                <CardDescription>{analysisResult.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Disease:</p>
                      <p className="text-lg">{analysisResult.disease}</p>
                    </div>
                    <div>
                      <p className="font-medium">Severity:</p>
                      <Badge
                        variant={
                          analysisResult.severity === "None"
                            ? "default"
                            : analysisResult.severity === "Moderate"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {analysisResult.severity}
                      </Badge>
                    </div>
                  </div>

                  {analysisResult.disease !== "Healthy Leaf" && (
                    <Tabs defaultValue="organic" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="organic">Organic Treatment</TabsTrigger>
                        <TabsTrigger value="chemical">Chemical Treatment</TabsTrigger>
                      </TabsList>

                      <TabsContent value="organic">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Organic Solutions</CardTitle>
                            <CardDescription>Natural and eco-friendly treatment options</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.organic_treatments.map((treatment, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span>{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="chemical">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Chemical Solutions</CardTitle>
                            <CardDescription>Fast-acting chemical treatments for severe cases</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.chemical_treatments.map((treatment, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span>{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Prevention Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResult.prevention.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
