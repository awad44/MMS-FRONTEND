import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CitizenServices from "./pages/admin/CitizenServices";
import Permits from "./pages/admin/Permits";
import Finance from "./pages/admin/Finance";
import Projects from "./pages/admin/Projects";
import HumanResources from "./pages/admin/HumanResources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route path="/admin/citizen-services" element={<ProtectedRoute allowedRoles={['admin', 'clerk']}><DashboardLayout><CitizenServices /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/permits" element={<ProtectedRoute allowedRoles={['admin', 'clerk']}><DashboardLayout><Permits /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/finance" element={<ProtectedRoute allowedRoles={['admin', 'finance']}><DashboardLayout><Finance /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute allowedRoles={['admin', 'project_manager']}><DashboardLayout><Projects /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/hr" element={<ProtectedRoute allowedRoles={['admin', 'hr_manager']}><DashboardLayout><HumanResources /></DashboardLayout></ProtectedRoute>} />
            
            {/* Placeholder routes */}
            <Route path="/admin/*" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h2 className="text-2xl font-bold">Module Under Development</h2></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/citizen/*" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h2 className="text-2xl font-bold">Module Under Development</h2></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h2 className="text-2xl font-bold">Module Under Development</h2></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h2 className="text-2xl font-bold">Profile Page</h2></div></DashboardLayout></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
