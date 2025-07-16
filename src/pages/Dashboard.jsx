import { useState } from "react";
import {
  Camera,
  ChevronRight,
  Sun,
  Plus,
  Apple,
  Wheat,
  Grape,
  Carrot,
  Calculator,
  Bug,
  Lightbulb,
  AlertTriangle,
  FileText,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const crops = [
    { icon: Apple, name: "Apple", color: "bg-red-100 border-red-300" },
    { icon: Wheat, name: "Wheat", color: "bg-yellow-100 border-yellow-300" },
    { icon: Grape, name: "Grape", color: "bg-yellow-100 border-yellow-300" },
    { icon: Carrot, name: "Carrot", color: "bg-orange-100 border-orange-300" },
  ];

  const features = [
    {
      icon: Calculator,
      title: "Fertilizer calculator",
      color: "bg-blue-50",
      onClick: () => navigate('/reports')
    },
    {
      icon: Bug,
      title: "Pests & diseases",
      color: "bg-purple-50",
      onClick: () => navigate('/scan')
    },
    {
      icon: Lightbulb,
      title: "Cultivation Tips",
      color: "bg-blue-50",
      onClick: () => navigate('/community')
    },
    {
      icon: AlertTriangle,
      title: "Pests and Disease Alert",
      color: "bg-blue-50",
      onClick: () => navigate('/weather')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Topbar */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Farmer Dashboard</h1>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <Button variant="ghost" onClick={() => navigate('/scan')}>Scan</Button>
            <Button variant="ghost" onClick={() => navigate('/community')}>Community</Button>
            <Button variant="ghost" onClick={() => navigate('/weather')}>Weather</Button>
            <Button variant="ghost" onClick={() => navigate('/reports')}>Reports</Button>
          </nav>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <Button variant="ghost" className="w-full" onClick={() => navigate('/scan')}>Scan</Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/community')}>Community</Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/weather')}>Weather</Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/reports')}>Reports</Button>
          </div>
        )}
      </header>

      {/* Main Dashboard Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Crop Icons */}
        <div className="flex items-center gap-x-4 overflow-x-auto sm:grid sm:grid-cols-5 sm:gap-6 pb-2">
          {crops.map((crop, index) => (
            <div key={index} className="flex-shrink-0 sm:w-full flex justify-center">
              <div className={`w-16 h-16 rounded-full border-2 ${crop.color} flex items-center justify-center`}>
                <crop.icon className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 sm:w-full flex justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <Plus className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Harare, 2 Jul</h3>
              <p className="text-sm text-gray-600">Clear • 9°C / 23°C</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">23°C</span>
              <Sun className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Heal Your Crop Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Heal your crop</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 border-2 border-dashed border-blue-300">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">Take a</p>
                <p className="text-sm font-medium text-gray-900">picture</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">See</p>
                <p className="text-sm font-medium text-gray-900">diagnosis</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-green-600 rounded" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">Get</p>
                <p className="text-sm font-medium text-gray-900">medicine</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => navigate('/scan')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-medium"
          >
            Take a picture
          </Button>
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.onClick}
              className={`${feature.color} rounded-2xl p-4 cursor-pointer transition-transform hover:scale-105 border`}
            >
              <div className="flex items-center justify-between mb-3">
                <feature.icon className="w-6 h-6 text-gray-700" />
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
