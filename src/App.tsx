import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ReportIssue from "./pages/citizen/ReportIssue";
import MyReports from "./pages/citizen/MyReports";
import Volunteer from "./pages/citizen/Volunteer";
import Learn from "./pages/citizen/Learn";
import CitizenReportsManagement from "./pages/admin/CitizenReportsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="report-issue" element={<ReportIssue />} />
            <Route path="my-reports" element={<MyReports />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="learn" element={<Learn />} />
            <Route path="water-quality" element={<Dashboard />} />
            <Route path="reports" element={<CitizenReportsManagement />} />
            <Route path="sensors" element={<Dashboard />} />
            <Route path="drones" element={<Dashboard />} />
            <Route path="waste" element={<Dashboard />} />
            <Route path="safety" element={<Dashboard />} />
            <Route path="biodiversity" element={<Dashboard />} />
            <Route path="volunteers" element={<Dashboard />} />
            <Route path="awareness" element={<Dashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
