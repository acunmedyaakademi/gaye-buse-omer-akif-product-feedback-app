import { useContext, useState, useEffect } from "react";
import { FeedbackContext } from "./FeedbackContext";

export default function Suggestions() {
  const { feedbacks, setFeedbacks } = useContext(FeedbackContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hamburger menüyü aç/kapat
  function hamburgerMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  function handleUpvotes(id) {
    setFeedbacks(
      feedbacks.map((item) =>
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
          <div className="hamburger-menu">
            <img
              src={
                isMenuOpen
                  ? "svg/hamburgerCloseIcon.svg"
                  : "svg/hamburgerIcon.svg"
              }
              alt="Hamburger Menu"
              onClick={hamburgerMenu}
              className={isMenuOpen ? "hamburger-icon-none" : ""}
            />
          </div>
          <div
            className={`hamburger-menu-overlay ${
              isMenuOpen ? "block" : "none"
            }`}
          >
            <div
              className={`hamburger-menu-content ${
                isMenuOpen ? "block" : "none"
              }`}
            >
              <div className="categories">
                <button>All</button>
                <button>UI</button>
                <button>UX</button>
              </div>
              <div className="roadmap">
                <div className="roadmap-head">
                  <h3>Roadmap</h3>
                  <button>View</button>
                </div>
                <div className="roadmap-status">
                  <span>Planned</span>
                  <span>In-Progress</span>
                  <span>Live</span>
                </div>
              </div>
            </div>
          </div>
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
          <li className="feedback" key={x.id}>
            <h5
              onClick={() => {
                window.location.hash = `#/feedback-detail/${x.id}`; // 📌 Mobilde detay sayfasına git
              }}
            >
              {x.title}
            </h5>
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
