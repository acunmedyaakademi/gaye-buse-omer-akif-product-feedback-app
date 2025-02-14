import { FeedbackContext } from "./FeedbackContext";
import { useContext, useEffect, useState } from "react";

export default function Roadmap() {
  const { feedbacks } = useContext(FeedbackContext);
  
  // Kategorileri al ve tekrarsız hale getir
  const uniqueCategories = [...new Set(feedbacks.map(x => x.category))];

  // Seçilen kategori ve filtrelenmiş feedbackler için state
  const [category, setCategory] = useState(getUrlParam());
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    // Seçilen kategori değiştiğinde filtreleme yap
    const updateFeedbacks = () => {
      const selectedCategory = getUrlParam();
      setCategory(selectedCategory);
      setFilteredFeedbacks(feedbacks.filter((x) => x.category === selectedCategory));
    };

    window.addEventListener("hashchange", updateFeedbacks);
    updateFeedbacks(); // Sayfa açıldığında da çalıştır

    return () => window.removeEventListener("hashchange", updateFeedbacks);
  }, [feedbacks]); // feedbacks değiştikçe yeniden hesapla

  return (
    <div className="roadmapPageContainer">
      {/* Header */}
      <div className="roadmapPageHeader">
        <div className="roadmapGoBack">
          <div className="goBackBtnRoadmap" onClick={() => window.history.back()}>
            Go Back
          </div>
          <h5>Roadmap</h5>
        </div>
        <button className="addFeedback">+ Add Feedback</button>
      </div>

      {/* Kategori Seçimi */}
      <div className="roadmapNavigation">
        {uniqueCategories.length > 0 ? (
          <ul>
            {uniqueCategories.map((cat) => (
              <li 
                className={`roadMapPageCategories ${category === cat ? "active" : ""}`} 
                key={cat}
                onClick={() => window.location.hash = `/roadmap/${cat}`} // Seçili kategori değiştirildiğinde URL güncellenir
              >
                {cat}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tags available.</p>
        )}
      </div>

      {/* Filtrelenmiş Feedbackler */}
      <div className="filteredFeedbacks">
        <h5>{category ? `${category} Feedbacks` : "All Feedbacks"}</h5>
        <ul>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <li className="feedbackItem" key={feedback.id}>
                <h5>{feedback.title}</h5>
                <p>{feedback.description}</p>
                <p><strong>Category:</strong> {feedback.category}</p>
                <button>comments: {feedback.comments.length}</button>
                <button>{feedback.upvotes} Upvotes</button>
              </li>
            ))
          ) : (
            <p>No feedbacks available for this category.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

// URL'den seçilen kategoriyi almak için yardımcı fonksiyon
function getUrlParam() {
  return window.location.hash.split("/").at(-1);
}
