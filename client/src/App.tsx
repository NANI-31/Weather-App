import { useState, useEffect, lazy, Suspense } from "react";
import { store } from "@app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const History = lazy(() => import("./pages/History"));
const Settings = lazy(() => import("./pages/Settings"));

import { Layout } from "./components/layout/Layout";
import LoadingScreen from "./components/3d/LoadingScene";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen progress={0} />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Index />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer
          position={isMobile ? "top-center" : "bottom-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="rounded-xl"
        />
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
