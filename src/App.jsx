import { createContext, useState, useEffect } from "react";
import { FeedbackProvider } from "./components/FeedbackContext";
import { getPage } from "./helper";
import { Toaster } from "react-hot-toast";
import './App.css'

function App() {
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const [activeLink, setActiveLink] = useState(url);
  const PageContext = createContext(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1110);


  useEffect(() => {
    const updateUrl = () => {
      const newUrl = location.hash.substring(1) || "/";
      setUrl(newUrl);
      setActiveLink(newUrl);
    };

    window.addEventListener("hashchange", updateUrl);
    return () => window.removeEventListener("hashchange", updateUrl);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1110);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const page = getPage(url);

  return (
    <FeedbackProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="app-container">
        <div className="page">
          <PageContext.Provider value={page}>
            {page.component}
          </PageContext.Provider>
        </div>
      </div>
    </FeedbackProvider>
  );
}

export default App
