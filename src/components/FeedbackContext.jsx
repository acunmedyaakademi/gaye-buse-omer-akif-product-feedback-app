import { createContext, useState, useEffect } from "react";

export const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  // const [selectedNotes, setSelectedNotes] = useState(() => {
  //   return JSON.parse(localStorage.getItem("archivedNotes")) || [];
  // });

  useEffect(() => {
    async function fetchNotes() {
      const data = await fetch("data/data.json").then((r) => r.json());
      setFeedbacks(data.feedbacks);
      localStorage.setItem("feedbackData", JSON.stringify(data.feedbacks));
    }
    fetchNotes();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("archivedNotes", JSON.stringify(selectedNotes));
  // }, [selectedNotes]);

  // const addNote = (newNote) => {
  //   setFeedback([...notes, { ...newNote, id: notes.length + 1, date: new Date().toLocaleDateString() }]);
  // };

  return (
    <FeedbackContext.Provider value={{ feedbacks, setFeedbacks, isEdit, setEdit, currentFeedback, setCurrentFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}