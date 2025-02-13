import { useContext, useState, useEffect } from "react";
import { FeedbackContext } from "./FeedbackContext";

export default function Suggestions() {
  const { feedbacks } = useContext(FeedbackContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="suggestionsPage">
      {isMobile ? (
        <div className="suggestionsPageHeader">
          <div className="headerText">
            <h5>Frontend Mentor</h5>
            <p>Feedback Board</p>
          </div>
          <img src="svg/hamburgerIcon.svg" alt="hamburger icon" />
        </div>
      ) : (
        <div className="suggestionsPageHeader">
          <div className="headerText">
            <h5>Frontend Mentor</h5>
            <p>Feedback Board</p>
          </div>
        </div>
      )}
      <ul className="feedbackList">
        {feedbacks.map((x) => (
          <li className="feedback" key={x.id} onClick={() => {
              window.location.hash = `#/feedback-detail/${x.id}`; // 📌 Mobilde detay sayfasına git
          }}>
            <h5>{x.title}</h5>
            <p>{x.description}</p>
            <p>{x.category}</p>
            <button>comments: {x.comments.length}</button>
            <button>{x.upvotes}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

