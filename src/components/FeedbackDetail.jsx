import { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";
import { LeftSvg, CommentIconSvg } from "../Svg";

export default function FeedbackDetail() {
  const {
    feedbacks,
    setFeedbacks,
    isEdit,
    setEdit,
    currentFeedback,
    setCurrentFeedback,
  } = useContext(FeedbackContext);
  const [feedbackId, setFeedbackId] = useState(getUrlParam());
  const [feedback, setFeedback] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [charCount, setCharCount] = useState(250);

  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    const storedFeedbacks =
      JSON.parse(localStorage.getItem("feedbacks")) || feedbacks;
    setFeedbacks(storedFeedbacks);
    const foundFeedback = storedFeedbacks.find(
      (x) => x.id.toString() === feedbackId
    );
    setFeedback(foundFeedback);
  }, []);

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
              imageUrl: "images/@anonymous.png",
              replies: [],
            },
          ],
        }
        : fb
    );

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

    const updatedFeedback = updatedFeedbacks.find(
      (fb) => fb.id === feedback.id
    );
    setFeedback(updatedFeedback);

    setNewComment("");
    setCharCount(250);
  }

  function handleReply(parentId, username) {
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
                    content: `<span class="username">${username}</span> ${replyContent}`,
                    imageUrl: "images/@anonymous.png",
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


    const updatedFeedback = updatedFeedbacks.find(
      (fb) => fb.id === feedback.id
    );
    setFeedback(updatedFeedback);

    setReplyTo(null);
    setReplyContent("");
  }

  function handleEditClick() {
    setEdit(true);
    setCurrentFeedback(feedback);
    window.location.hash = "#/new-feedback";
  }

  function handleUpvotes(id) {
    const storedFeedbacks =
      JSON.parse(localStorage.getItem("feedbacks")) || feedbacks;

    const updatedFeedbacks = storedFeedbacks.map((item) =>
      item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
    );

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

    const updatedFeedback = updatedFeedbacks.find((fb) => fb.id === id);
    setFeedback(updatedFeedback);
  }

  function formatUsernames(text) {
    return text.replace(/(@\w+)/g, '<span class="username">$1</span>');
  }


  return (
    <>
      <div className="detailPageContainer">
        <div className="detailPage">
          <div className="detailPageHeader">
            <div className="goBack" onClick={() => window.history.back()}>
              <LeftSvg />
              <span>Go Back</span>
            </div>
            <button className="editBtn" onClick={handleEditClick}>
              Edit Feedback
            </button>
          </div>

          <div className="detailPageFeedback">
            <h5 className="feedbackTitleHeader">{feedback.title}</h5>
            <p className="feedbackDescription">{feedback.description}</p>
            <span className="feedbackCategory">{feedback.category}</span>
            <div className="upvoteCommentsSection">
              <button
                className="upvoteSection"
                onClick={() => handleUpvotes(feedback.id)}
              >
                <img src="/svg/upvote-icon.svg" alt="" />
                <p className="upvoteCount">{feedback.upvotes}</p>
              </button>
              <button className="commentsBtn">
                <CommentIconSvg />
                <span className="commentCountNumber">
                  {feedback.comments ? feedback.comments.length : 0}
                </span>
              </button>
            </div>
          </div>

          <div className="commentsSection">
            <h5>{feedback.comments.length} Comments</h5>
            <ul className="commentsList">
              {feedback.comments
                .slice()
                .reverse()
                .map((comment) => (
                  <li key={comment.id} className="comment">
                    <div className="commentHeader">
                      <div className="authorSection">
                        <img src={`images/${comment.username}.png`} alt="" />
                        <div className="commentAuthor">
                          <p className="commentAuthorName">{comment.author}</p>
                          <p className="commentAuthorUserName">
                            {comment.username}
                          </p>
                        </div>
                      </div>
                      <div className="replyBtnArea">
                        <button
                          className="replyBtn"
                          onClick={() => setReplyTo(comment.id)}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                    <p className="commentContent" dangerouslySetInnerHTML={{ __html: formatUsernames(comment.content) }}></p>
                    {replyTo === comment.id && (
                      <div className="addComment">
                        <h5 className="addCommentHeader">Add Comment</h5>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleReply(comment.id, comment.username);
                          }}
                        >
                          <textarea
                            className="addCommentTextArea"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            maxLength={250}
                            placeholder="Type your reply here..."
                            required
                          />
                          <div className="commentFooter">
                            <button
                              className="postCommentButton"
                              type="submit"
                              disabled={replyContent.trim() === ""}
                            >
                              Post Reply
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <div key={reply.id} className="replyArea">
                          <div className="replyUserInfo">
                            <img
                              src={`images/${reply.username}.png`}
                              alt=""
                              className="commentAvatar"
                            />
                            <div className="replyCommentAuthor">
                              <span className="replyAuthorName">
                                {reply.author}
                              </span>
                              <span className="replyAuthorUsername">
                                {reply.username}
                              </span>
                            </div>
                          </div>
                          <div className="replyContent">
                            <p dangerouslySetInnerHTML={{ __html: formatUsernames(reply.content) }}></p>

                          </div>
                        </div>
                      ))}
                    <hr />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="addComment">
          <h5 className="addCommentHeader">Add Comment</h5>
          <form onSubmit={handleAddComment}>
            <textarea
              className="addCommentTextArea"
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
              <p className="leftCharactersCount">{charCount} Characters left</p>
              <button
                className="postCommentButton"
                type="submit"
                disabled={newComment.trim() === ""}
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function getUrlParam() {
  const parts = window.location.hash.split("/");
  const id = parts[parts.length - 1];
  return id ? id : null;
}
