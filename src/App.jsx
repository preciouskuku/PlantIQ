import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ScanCrop from "./pages/ScanCrop";
import Weather from "./pages/Weather";
import Community from "./pages/Community";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword"

// Components
import { Navigation } from "./components/Navigation";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const hideNavRoutes = ["/", "/signin", "/signup", "/forgot-password"]; 

  const showSidebar = !hideNavRoutes.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      {showSidebar && <Navigation />}
      <main className="flex-1 lg:ml-0">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ NEW */}
          <Route path="/dashboard/farmer" element={<Dashboard userRole="farmer" />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/scan" element={<ScanCrop />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/community" element={<Community />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
