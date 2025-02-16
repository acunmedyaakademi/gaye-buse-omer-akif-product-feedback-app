import { createContext, useState, useEffect } from "react";

export const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  // ✅ **Sayfa yüklendiğinde `localStorage` kontrol et, yoksa `data.json`'dan al**
  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbackData"));

    if (storedFeedbacks && storedFeedbacks.length > 0) {
      setFeedbacks(storedFeedbacks);
    } else {
      async function fetchNotes() {
        const data = await fetch("data/data.json").then((r) => r.json());
        setFeedbacks(data.feedbacks);
        localStorage.setItem("feedbackData", JSON.stringify(data.feedbacks));
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
