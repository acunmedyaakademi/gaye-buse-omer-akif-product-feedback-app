import { LeftSvg } from "../Svg";
import { FeedbackContext } from "./FeedbackContext";
import { useContext, useEffect, useState } from "react";

export default function Roadmap() {
  const { feedbacks } = useContext(FeedbackContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Statüleri al ve tekrarsız hale getir
  const uniqueStatuses = [...new Set(feedbacks.map((x) => x.status))];

  // Seçilen statü
  const [selectedStatus, setSelectedStatus] = useState(getUrlParam() || (isMobile ? null : uniqueStatuses[0]));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSelectedStatus(uniqueStatuses[0]);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uniqueStatuses]);

  // Duruma göre CSS sınıfı belirleyen fonksiyon
  const getStatusClass = (status) => {
    if (status === "Planned") return "planned";
    if (status === "InProgress") return "inProgress";
    if (status === "Live") return "live";
    return "";
  };

  return (
    <div className="roadmapPageContainer">
      {/* Header */}
      <div className="roadmapPageHeader">
        <div className="roadmapGoBack">
          <div className="goBackBtnRoadmap" onClick={() => window.history.back()}>
            <LeftSvg />
            <span>Go Back</span>
          </div>
          <h5>Roadmap</h5>
        </div>
        <a href="#/new-feedback" className="addFeedbackBtnRoadmap">+ Add Feedback</a>
      </div>

      {/* Kategori Seçimi */}
      {isMobile &&  
        <div className="roadmapNavigation">
          <ul>
            {uniqueStatuses.map((status) => (
              <li
                key={status}
                className={`roadMapPageCategories ${selectedStatus === status ? "active" : ""} ${getStatusClass(status)}`}
                onClick={() => isMobile && setSelectedStatus(status)}
              >
                {status} ({feedbacks.filter(f => f.status === status).length})
              </li>
            ))}
          </ul>
        </div>
      }

      {/* Filtrelenmiş Feedbackler */}
      <div className="filteredFeedbacks">
        {uniqueStatuses.map((status) => {
          const filteredFeedbacks = feedbacks.filter((x) => x.status === status);
          return (
            (!isMobile || selectedStatus === status) && (
              <div key={status} className={`statusSection ${getStatusClass(status)}`}>
                <h5>{status} ({filteredFeedbacks.length})</h5>
                <ul>
                  {filteredFeedbacks.map((feedback) => (
                    <li key={feedback.id} className="feedbackItem">
                      <h2 className="feedbackRoadmapPageStatus">
                        <span></span>
                        {status}
                      </h2>
                      <h5>{feedback.title}</h5>
                      <p>{feedback.description}</p>
                      <div className="roadmapFeedbackCategories">
                        <h6>{feedback.category}</h6>
                      </div>
                      <div className="roadmapFeedbackBtns">
                        <button>{feedback.upvotes} Upvotes</button>
                        <button>comments: {feedback.comments.length}</button>
                      </div>
                    </li>
                  ))}
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
