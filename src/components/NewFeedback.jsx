import { useContext, useState, useEffect } from "react";
import { FeedbackContext } from "./FeedbackContext";

export default function NewFeedback() {
  const { feedbacks, setFeedbacks } = useContext(FeedbackContext);
  const [isEdit, setEdit] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  const createFeedback = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);

    const newFeedbackData = {
      ...formObj,
      id: crypto.randomUUID(),
    };

    setInvoiceData([...feedbacks, newFeedbackData]);
    console.log("Yeni Feedback:", newFeedbackData);
    e.target.reset();
  };

  const updatedFeedback = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);

    const updatedFeedbackData = {
      ...currentFeedback,
      ...formObj,
    };

    setInvoiceData(invoiceData.map(feed => feed.id === currentFeedback.id ? updatedFeedbackData : feed));
    console.log("Güncellenmiş Feedback:", updatedFeedbackData);

    setEdit(false);
    setCurrentFeedback(null);
    e.target.reset();
  };

  return (
    <>
      <div className="new-feedback-container">
        <div className="goBackBtnNewFeed" onClick={() => window.history.back()}>
          <button type="button">Go Back</button>
        </div>
        {isEdit ? (
          <>
            <h1>edit kısmı</h1>
          </>
        ) : (
          <>
            <div className="new-feedback-page">
              <div className="add-icon">
                <img src="" alt="" />
              </div>
              <h2>Create New Feedback</h2>
              <div className="new-feedback-form-section">
                <form autoComplete="off">
                  {/* Feedback Title */}
                  <label htmlFor="feedback-title">Feedback Title</label>
                  <span>Add a short, descriptive headline</span>
                  <input
                    type="text"
                    name="title"
                  />

                  {/* Category Dropdown */}
                  <label htmlFor="category">Category</label>
                  <span>Choose a category for your feedback</span>
                  <select id="category">
                    <option value="feature">Feature</option>
                    <option value="ui">UI</option>
                    <option value="ux">UX</option>
                    <option value="bug">Enhancement</option>
                    <option value="bug">Bug</option>
                  </select>

                  {/* Feedback Detail */}
                  <label htmlFor="feedback-detail">Feedback Detail</label>
                  <textarea
                    id="feedback-detail"
                    placeholder="Include any specific comments on what should be improved, added, etc."
                  />

                  {/* Buttons */}
                  <button type="submit" className="add-feedback-btn">Add Feedback</button>
                  <button type="button" className="cancel-btn">Cancel</button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );

}