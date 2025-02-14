import { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";

export default function FeedbackDetail() {
  const { feedbacks, setFeedbacks, isEdit, setEdit, currentFeedback, setCurrentFeedback } = useContext(FeedbackContext);
  const [feedbackId, setFeedbackId] = useState(getUrlParam());
  const [feedback, setFeedback] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [charCount, setCharCount] = useState(250);

  useEffect(() => {
    const updateFeedback = () => {
      const newFeedbackId = getUrlParam();
      setFeedbackId(newFeedbackId);
      const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || feedbacks;

      const foundFeedback = storedFeedbacks.find((x) => x.id === Number(newFeedbackId));
      setFeedback(foundFeedback);
    };

    window.addEventListener("hashchange", updateFeedback);
    updateFeedback();

    return () => window.removeEventListener("hashchange", updateFeedback);
  }, [feedbacks]);

  if (!feedback) {
    return <p>Feedback not found.</p>;
  }

  function handleAddComment(event) {
    event.preventDefault();

    if (newComment.trim() === "" || charCount <= 0) return;

    const updatedFeedbacks = feedbacks.map((fb) =>
      fb.id === feedback.id
        ? {
          ...fb,
          comments: [
            ...fb.comments,
            {
              id: Date.now(),
              author: "Anonymous",
              username: "@anonymous",
              content: newComment,
              imageUrl: 'images/@anonymous.png'
            },
          ],
        }
        : fb
    );

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks)); // ✅ Local Storage'a kaydet
    setNewComment("");
    setCharCount(250);
  }


  function handleEditClick() {
    setEdit(true);
    setCurrentFeedback(feedback); 
    window.location.hash = "#/new-feedback";
  }

  return (
    <div className="detailPage">
      <div className="detailPageHeader">
        <div className="goBack" onClick={() => window.history.back()}>
          Go Back
        </div>
        <button className="editBtn" onClick={handleEditClick} >Edit Feedback</button>
      </div>

      <div className="detailPageFeedback">
        <h5>{feedback.title}</h5>
        <p>{feedback.description}</p>
        <p>{feedback.category}</p>
        <div className="button-flex">
          <button className="comment-button">
            <img src="/public/images/comment-icon.svg"/>
            {feedback.comments.length}</button>
          <button>
           <img src="/public/images/upvote-icon.svg"/>
            {feedback.upvotes}
            </button>
        </div>
      </div>

      <div className="commentsSection">
        <h5>{feedback.comments.length} Comments</h5>
        <ul className="commentsList">
          {feedback.comments.map((comment) => (
            <li key={comment.id} className="comment">
              <img src={`images/${comment.username}.png`} alt="" />
              <p className="commentAuthor"><strong>{comment.author}</strong> <span>{comment.username}</span></p>
              <p>{comment.content}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>

      <div className="addComment">
        <h5>Add Comment</h5>
        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              setCharCount(250 - e.target.value.length);
            }}
            maxLength={250}
            placeholder="Type your comment here..."
            required
          />
          <div className="commentFooter">
            <p>{charCount} Characters left</p>
            <button type="submit" disabled={newComment.trim() === ""}>
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getUrlParam() {
  const parts = window.location.hash.split("/");
  const id = parts[parts.length - 1];
  return id ? id : null;
}
