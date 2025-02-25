import { createContext, useState, useEffect } from "react";

export const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  useEffect(() => {
    const storedFeedbacks = localStorage.getItem("feedbackData");
  
    if (storedFeedbacks) {
      try {
        const parsedFeedbacks = JSON.parse(storedFeedbacks);
        if (Array.isArray(parsedFeedbacks)) {
          setFeedbacks(parsedFeedbacks);
        } else {
          // Verinin geçerli bir dizi olmadığını kontrol et
          localStorage.removeItem("feedbackData");
        }
      } catch (error) {
        console.error("Geçersiz JSON verisi:", error);
        localStorage.removeItem("feedbackData");  // Geçersiz veri varsa temizle
      }
    } else {
      // localStorage'da veri yoksa fetch ile veri al
      async function fetchNotes() {
        try {
          const data = await fetch("data/data.json").then((r) => r.json());
          setFeedbacks(data.feedbacks || []);
          localStorage.setItem("feedbackData", JSON.stringify(data.feedbacks || []));
        } catch (err) {
          console.error("Veri alınırken hata oluştu:", err);
        }
      }
      fetchNotes();
    }
  }, []);  

  // ✅ **`feedbacks` değiştiğinde `localStorage`'ı güncelle**
  useEffect(() => {
    if (feedbacks.length > 0) {
      localStorage.setItem("feedbackData", JSON.stringify(feedbacks));
    }
  }, [feedbacks]);

  return (
    <FeedbackContext.Provider
      value={{ feedbacks, setFeedbacks, isEdit, setEdit, currentFeedback, setCurrentFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
