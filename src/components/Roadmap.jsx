import { CommentIconSvg, LeftSvg, UpIconSvg } from "../Svg";
import { FeedbackContext } from "./FeedbackContext";
import { useContext, useEffect, useState } from "react";

export default function Roadmap() {
  const { feedbacks, setFeedbacks } = useContext(FeedbackContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const uniqueStatuses = [...new Set(feedbacks.map((x) => x.status))];

  const [selectedStatus, setSelectedStatus] = useState("InProgress");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSelectedStatus(uniqueStatuses[0] || "InProgress");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uniqueStatuses]);

  useEffect(() => {
    if (!selectedStatus || !uniqueStatuses.includes(selectedStatus)) {
      setSelectedStatus("InProgress");
    }
  }, [isMobile, selectedStatus, uniqueStatuses]);


  const getStatusClass = (status) => {
    if (status === "Planned") return "planned";
    if (status === "InProgress") return "inProgress";
    if (status === "Live") return "live";
    return "";
  };

  function handleUpvotes(id) {
    setFeedbacks(
      feedbacks.map((item) =>
        item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
      )
    );
  }

  return (
    <div className="roadmapPageContainer">
      <div className="roadmapPageHeader">
        <div className="roadmapGoBack">
          <div
            className="goBackBtnRoadmap"
            onClick={() => window.history.back()}
          >
            <LeftSvg />
            <span>Go Back</span>
          </div>
          <h5>Roadmap</h5>
        </div>
        <a href="#/new-feedback" className="addFeedbackBtnRoadmap">
          + Add Feedback
        </a>
      </div>

      {isMobile && (
        <div className="roadmapNavigation">
          <ul>
            {uniqueStatuses.map((status) => (
              <li
                key={status}
                className={`roadMapPageCategories ${
                  selectedStatus === status ? "active" : ""
                } ${getStatusClass(status)}`}
                onClick={() => isMobile && setSelectedStatus(status)}
              >
                {status} ({feedbacks.filter((f) => f.status === status).length})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="filteredFeedbacks">
        {uniqueStatuses.map((status) => {
          const filteredFeedbacks = feedbacks.filter(
            (x) => x.status === status
          );
          return (
            (!isMobile || selectedStatus === status) && (
              <div
                key={status}
                className={`statusSection ${getStatusClass(status)}`}
              >
                <h5>
                  {status} ({filteredFeedbacks.length})
                </h5>
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
                        <button
                          className="roadmapUpvotesBtn"
                          onClick={() => handleUpvotes(feedback.id)}
                        >
                          <UpIconSvg />
                          <span>{feedback.upvotes}</span>
                        </button>
                        <button
                          className="roadmapCommentsBtn"
                          onClick={() => {
                            window.location.hash = `#/feedback-detail/${feedback.id}`;
                          }}
                        >
                            <CommentIconSvg />
                            <span>{feedback.comments.length}</span>
                        </button>
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
