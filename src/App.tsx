
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useEffect, useState, Suspense } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import ServicesPage from "./pages/Services";
import DirectorPage from "./pages/Director";
import Contact from "./pages/Contact";
import Footprint from "./pages/Footprint";
import PremiumFleet from "./pages/PremiumFleet";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

// Create a client with proper error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Error boundary component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-transport-blue mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-4">We're sorry, but there was an error loading the application.</p>
        <pre className="bg-gray-100 p-4 rounded text-sm text-red-500 mb-4 overflow-auto max-h-40">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="bg-transport-orange text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-transport-blue rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-transport-blue font-medium">Loading...</p>
      </div>
    </div>
  );
}

// App wrapper with error handling
const AppWrapper = () => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    console.log("App component mounted");
    
    // Signal that the app has successfully loaded
    const signalAppLoaded = () => {
      try {
        window.dispatchEvent(new CustomEvent('app-loaded'));
        console.log("App wrapper: app-loaded event dispatched");
      } catch (e) {
        console.error("Error dispatching app-loaded event from wrapper:", e);
      }
    };
    
    // Dispatch app-loaded event when component mounts
    const timer = setTimeout(signalAppLoaded, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (hasError) {
    return (
      <ErrorFallback 
        error={new Error("The application encountered an error and could not continue.")} 
        resetErrorBoundary={() => {
          setHasError(false);
          window.location.reload();
        }} 
      />
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<LoadingFallback />}>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/director" element={<DirectorPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/footprint" element={<Footprint />} />
                <Route path="/fleet" element={<PremiumFleet />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  try {
    return <AppWrapper />;
  } catch (error) {
    console.error("Critical App error:", error);
    return (
      <ErrorFallback 
        error={error instanceof Error ? error : new Error("Unknown error occurred")} 
        resetErrorBoundary={() => window.location.reload()} 
      />
    );
  }
};

export default App;
