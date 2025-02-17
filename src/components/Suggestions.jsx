import { useContext, useState, useEffect } from "react";
import { FeedbackContext } from "./FeedbackContext";
import {
  CommentIconSvg,
  DownIconSvg,
  SuggestionIconSvg,
  TickIconSvg,
  UpIconSvg,
} from "../Svg";

export default function Suggestions() {
  const {
    feedbacks,
    setFeedbacks,
    isEdit,
    setEdit,
    currentFeedback,
    setCurrentFeedback,
  } = useContext(FeedbackContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [sortOption, setSortOption] = useState("Most Upvotes");
  const [sortBy, setSortBy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const uniqueCategory = [...new Set(feedbacks.map((x) => x.category))];
  const uniqueStatuses = [...new Set(feedbacks.map((x) => x.status))];

  const filteredFeedbacks =
    selectedCategory === "All"
      ? feedbacks
      : feedbacks.filter((x) => x.category === selectedCategory);

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    switch (sortOption) {
      case "Most Upvotes":
        return b.upvotes - a.upvotes; // En çok upvote’a göre azalan sıralama
      case "Least Upvotes":
        return a.upvotes - b.upvotes; // En az upvote’a göre artan sıralama
      case "Most Comments":
        return b.comments.length - a.comments.length; // En çok yoruma göre azalan sıralama
      case "Least Comments":
        return a.comments.length - b.comments.length; // En az yoruma göre artan sıralama
      default:
        return 0;
    }
  });

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    if (storedFeedbacks.length > 0) {
      setFeedbacks(storedFeedbacks);
    }
  }, []); // Sayfa yüklendiğinde sadece 1 kez çalışır



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function hamburgerMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  function handleUpvotes(id) {
    setFeedbacks(
      feedbacks.map((item) =>
        item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
      )
    );
  }

  function handleAddClick() {
    setEdit(false);
    setCurrentFeedback(feedback);
    window.location.hash = "#/new-feedback";
  }

  const getStatusClass = (status) => {
    if (status === "Planned") return "planned";
    if (status === "InProgress") return "inProgress";
    if (status === "Live") return "live";
    return "";
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <div className="suggestionsPage">
      {!isMobile && (
        <div className="tabletHeaderSection">
          <div className="tabletHeaderTextBox">
            <div className="tabletHeaderText">
              <h5>Frontend Mentor</h5>
              <p>Feedback Board</p>
            </div>
          </div>
          <div className="tabletCategoriesBox">
            <div className="tabletCategories">
              <button
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => handleCategorySelect("All")}
              >
                All
              </button>
              {uniqueCategory.map((x) => (
                <button
                  key={x}
                  className={selectedCategory === x ? "active" : ""}
                  onClick={() => handleCategorySelect(x)}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="tabletRoadmapBox">
            <div className="tabletRoadmapBoxHeader">
              <h6>Roadmap</h6>
              <a href="#/roadmap">View</a>
            </div>
            <ul>
              {uniqueStatuses.map((status) => (
                <li key={status} className={`${getStatusClass(status)}`}>
                  <h6>
                    <span></span>
                    {status}
                  </h6>
                  <p>{status.length}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {isMobile && (
        <>
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
              className={`hamburger-menu-overlay ${isMenuOpen ? "block" : "none"
                }`}
            >
              <div
                className={`hamburger-menu-content ${isMenuOpen ? "block" : "none"
                  }`}
              >
                <div className="hamburgerCategoriesBox">
                  <div className="hamburgerCategories">
                    <button
                      className={selectedCategory === "All" ? "active" : ""}
                      onClick={() => handleCategorySelect("All")}
                    >
                      All
                    </button>
                    {uniqueCategory.map((x) => (
                      <button
                        key={x}
                        className={selectedCategory === x ? "active" : ""}
                        onClick={() => handleCategorySelect(x)}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="hamburgerRoadmapBox">
                  <div className="hamburgerRoadmapBoxHeader">
                    <h6>Roadmap</h6>
                    <a href="#/roadmap">View</a>
                  </div>
                  <ul>
                    {uniqueStatuses.map((status) => (
                      <li key={status} className={`${getStatusClass(status)}`}>
                        <h6>
                          <span></span>
                          {status}
                        </h6>
                        <p>{status.length}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!isEmpty ? (
        <div className="suggestionPageInner">
          <div className="selection-area">
            {!isMobile && (
              <div className="selection-area-text">
                <SuggestionIconSvg />
                <p>{sortedFeedbacks.length} Suggestions</p>
              </div>
            )}
            <div className="sort-menu">
              <button
                className="sort-button"
                onClick={() => setSortBy(!sortBy)}
              >
                Sort by : <span> {sortOption}</span>{" "}
                {sortBy ? <UpIconSvg /> : <DownIconSvg />}
              </button>

              {sortBy && (
                <ul className="dropdown">
                  {[
                    "Most Upvotes",
                    "Least Upvotes",
                    "Most Comments",
                    "Least Comments",
                  ].map((option) => (
                    <li
                      key={option}
                      className={sortOption === option ? "selected" : ""}
                      onClick={() => {
                        setSortOption(option);
                        setSortBy(false);
                      }}
                    >
                      {sortOption === option ? (
                        <div className="selectedOption">
                          {option}
                          <TickIconSvg />
                        </div>
                      ) : (
                        option
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="addFeedbackBtn" onClick={handleAddClick}>
              + Add Feedback
            </button>
          </div>
          <ul className="feedbackList">
            {isMobile
              ? sortedFeedbacks.map((x) => (
                <li className="feedback" key={x.id}>
                  <h5
                    onClick={() => {
                      setCurrentFeedback(x);
                      window.location.hash = `#/feedback-detail/${x.id}`;
                    }}
                  >
                    {x.title}
                  </h5>
                  <p
                    onClick={() => {
                      setCurrentFeedback(x);
                      window.location.hash = `#/feedback-detail/${x.id}`;
                    }}
                  >
                    {x.description}
                  </p>
                  <h6
                    className="feedbackCategory"
                    onClick={() => {
                      setCurrentFeedback(x);
                      window.location.hash = `#/feedback-detail/${x.id}`;
                    }}
                  >
                    {x.category}
                  </h6>
                  <div className="feedbackBtn">
                    <button
                      className="upvote-section"
                      onClick={() => handleUpvotes(x.id)}
                    >
                      <img src="/svg/upvote-icon.svg" alt="" />
                      <p>{x.upvotes}</p>
                    </button>
                    <button
                      className="commentsBtn"
                      onClick={() => {
                        setCurrentFeedback(x);
                        window.location.hash = `#/feedback-detail/${x.id}`;
                      }}
                    >
                      <CommentIconSvg />
                      <span>{x.comments?.length}</span>
                    </button>
                  </div>
                </li>
              ))
              : sortedFeedbacks.map((x) => (
                <li className="feedback feedback-tablet" key={x.id}>
                  <button
                    className="upvote-section"
                    onClick={() => handleUpvotes(x.id)}
                  >
                    <img src="/svg/upvote-icon.svg" alt="" />
                    <p>{x.upvotes}</p>
                  </button>
                  <div
                    className="feedbackText"
                    onClick={() => {
                      setCurrentFeedback(x);
                      window.location.hash = `#/feedback-detail/${x.id}`;
                    }}
                  >
                    <h5>{x.title}</h5>
                    <p>{x.description}</p>
                    <h6 className="feedbackCategory">{x.category}</h6>
                  </div>
                  <button
                    className="commentsBtn"
                    onClick={() => {
                      setCurrentFeedback(x);
                      window.location.hash = `#/feedback-detail/${x.id}`;
                    }}
                  >
                    <CommentIconSvg />
                    <span>{x.comments.length}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="empty-page">
          <img src="/public/images/empty-page-icon.svg" />
          <h3>There is no feedback yet.</h3>
          <p>
            Got a suggestion? Found a bug that needs to be squashed? We love
            hearing about new ideas to improve our app.
          </p>
          <button onClick={handleAddClick}>+ Add Feedback</button>
        </div>
      )}
    </div>
  );
}
