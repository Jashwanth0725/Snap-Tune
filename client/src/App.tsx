import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "@/layout/navigation";
import Home from "@/pages/home";
import Footer from "@/layout/footer";
import About from "./pages/about";
import Pricing from "./pages/pricing";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import ProtectedRoute from "./auth/protectedRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-grey-50">
      <Navigation />

      {/* Main content wrapper */}
      <main className="flex-1">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          <Toaster position="top-right" richColors closeButton />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
