import { FeedbackContext } from "./FeedbackContext";
import { useContext, useEffect, useState } from "react";

export default function Roadmap() {
  const { feedbacks } = useContext(FeedbackContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Kategorileri al ve tekrarsız hale getir
  const uniqueCategories = [...new Set(feedbacks.map((x) => x.category))];

  // Seçilen kategori ve filtrelenmiş feedbackler için state
  const [selectedCategory, setSelectedCategory] = useState(getUrlParam() || (isMobile ? null : uniqueCategories[0]));

  useEffect(() => {
    // Ekran boyutu değiştikçe durumu güncelle
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Eğer ekran büyürse ilk kategoriyi seçili hale getir
      if (window.innerWidth >= 768) {
        setSelectedCategory(uniqueCategories[0]);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uniqueCategories]);

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
     {isMobile &&  
     <div className="roadmapNavigation">
        {uniqueCategories.length > 0 ? (
          <ul>
            {uniqueCategories.map((cat) => (
              <li
                className={`roadMapPageCategories ${selectedCategory === cat ? "active" : ""}`}
                key={cat}
                onClick={() => isMobile && setSelectedCategory(cat)} // Sadece mobilde kategori seçimini değiştir
              >
                {cat}
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories available.</p>
        )}
      </div>}

      {/* Filtrelenmiş Feedbackler */}
      <div className="filteredFeedbacks">
        {uniqueCategories.map((category) => {
          const filteredFeedbacks = feedbacks.filter((x) => x.category === category);
          return (
            (!isMobile || selectedCategory === category) && (
              <div key={category} className="categorySection">
                <h5>{category} Feedbacks</h5>
                <ul>
                  {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map((feedback) => (
                      <li className="feedbackItem" key={feedback.id}>
                        <h5>{feedback.title}</h5>
                        <p>{feedback.description}</p>
                        <button>comments: {feedback.comments.length}</button>
                        <button>{feedback.upvotes} Upvotes</button>
                      </li>
                    ))
                  ) : (
                    <p>No feedbacks available for this category.</p>
                  )}
                </ul>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

// URL'den seçilen kategoriyi almak için yardımcı fonksiyon
function getUrlParam() {
  return window.location.hash.split("/").at(-1);
}
