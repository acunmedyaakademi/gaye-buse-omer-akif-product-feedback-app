import { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";

export default function FeedbackDetail() {
  const { feedbacks, setFeedbacks, isEdit, setEdit, currentFeedback, setCurrentFeedback } = useContext(FeedbackContext);
  const [feedbackId, setFeedbackId] = useState(getUrlParam());
  const [feedback, setFeedback] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [charCount, setCharCount] = useState(250);

  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

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
              imageUrl: 'images/@anonymous.png',
                replies: [] 
            },
          ],
        }
        : fb
    );

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks)); 
    setNewComment("");
    setCharCount(250);
  }

  function handleReply(parentId) {
    if (replyContent.trim() === "") return;
    
    const updatedFeedbacks = feedbacks.map((fb) =>
      fb.id === feedback.id
        ? {
            ...fb,
            comments: fb.comments.map((comment) =>
              comment.id === parentId
                ? {
                    ...comment,
                    replies: [
                      ...(comment.replies || []),
                      {
                        id: Date.now(),
                        author: "Anonymous",
                        username: "@anonymous",
                        content: replyContent,
                        imageUrl: 'images/@anonymous.png',
                      },
                    ],
                  }
                : comment
            ),
          }
        : fb
    );

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks)); 
    setReplyTo(null);
    setReplyContent("");
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
        <button className="editBtn">Edit Feedback</button>
      </div>

      <div className="detailPageFeedback">
        <h5>{feedback.title}</h5>
        <p>{feedback.description}</p>
        <p className="feedbackCategory">{feedback.category}</p>
        <div className="button-flex">
          <button>comments: {feedback.comments.length}</button>
          <button>{feedback.upvotes}</button>
        </div>
      </div>

      <div className="commentsSection">
        <h5>{feedback.comments.length} Comments</h5>
        <ul className="commentsList">
          {feedback.comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="commentHeader">
                <div className="authorSection">
                  <div className="commentAuthor">
                    <p>{comment.author}</p>
                    <p>{comment.username}</p>
                  </div>
                </div>
                <div className="replyBtnArea">
                  <button className="replyBtn" onClick={() => setReplyTo(comment.id)}>Reply</button>
                </div>
              </div>
              <p>{comment.content}</p>

              {replyTo === comment.id && (
                <div className="ma">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    maxLength={250}
                    placeholder="Type your reply here..."
                    required
                  />
                  <div className="replyFooter">
                    <p>{250 - replyContent.length} Characters left</p>
                    <button onClick={() => handleReply(comment.id)} disabled={replyContent.trim() === ""}>
                      Post Reply
                    </button>
                  </div>
                </div>
              )}

              {comment.replies && comment.replies.map((reply) => (
                <div key={reply.id} className="reply">
                  <img src={reply.imageUrl} alt="" className="commentAvatar" />
                  <div className="replyContent">
                    <p className="commentAuthor">
                      <strong>{reply.author}</strong> 
                      <span className="username">{reply.username}</span>
                    </p>
                    <p>{reply.content}</p>
                  </div>
                </div>
              ))}
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
