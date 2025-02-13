import { useContext, useState, useEffect } from "react";
import { FeedbackContext } from "./FeedbackContext";

export default function Suggestions() {
  const {feedback, setFeedback } = useContext(FeedbackContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("feedbackData");
  //   storedData && setFeedback(JSON.parse(storedData));
  // }, []);
  
  // useEffect(() => {
  //   localStorage.setItem("feedbackData", JSON.stringify(feedback));
  // }, [feedback]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleUpvotes(id) {
    setFeedback(
      feedback.map((item) =>
        item.id ===id ? {...item, upvotes : item.upvotes + 1 } : item
      )
    );
  };

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
        {feedback.map((x) => (
          <li className="feedback" key={x.id}>
            <h5>{x.title}</h5>
            <p>{x.description}</p>
            <p>{x.category}</p>
            <button>comments: {x.comments.length}</button>
            <button className="upvote-section" onClick = {() => handleUpvotes(x.id)}>
              <img src="/svg/upvote-icon.svg" alt="" />
              <p>{x.upvotes}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

