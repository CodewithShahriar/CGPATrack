
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CGPAProvider } from "./contexts/CGPAContext";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AddSemester from "./pages/AddSemester";
import SemesterView from "./pages/SemesterView";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import CGPACalculator from "./pages/CGPACalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CGPAProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/add-semester" element={
              <Layout>
                <AddSemester />
              </Layout>
            } />
            <Route path="/semester/:semesterId" element={
              <Layout>
                <SemesterView />
              </Layout>
            } />
            <Route path="/analytics" element={
              <Layout>
                <Analytics />
              </Layout>
            } />
            <Route path="/calculator" element={
              <Layout>
                <CGPACalculator />
              </Layout>
            } />
            <Route path="/about" element={
              <Layout>
                <About />
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CGPAProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
