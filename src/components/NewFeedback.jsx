import { useContext, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";

export default function NewFeedback() {
  const { feedbacks, setFeedbacks, isEdit, setEdit, currentFeedback } = useContext(FeedbackContext);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const createFeedback = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);

    const newFeedbackData = {
      ...formObj,
      id: crypto.randomUUID(),
    };

    setFeedbacks([...feedbacks, newFeedbackData]);
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
    <div className="new-feedback-container">
      <div className="goBackBtnNewFeed" onClick={() => window.history.back()}>
        <button type="button">Go Back</button>
      </div>
      {isEdit ? (
        <div className="edit-feedback-page">
          <div className="add-icon">
            <img src="/svg/edit-icon.svg" alt="Edit Icon" />
          </div>
          <h2>Editing `{currentFeedback.title}`</h2>
          <div className="edit-feedback-form-section">
            <form autoComplete="off">
              {/* Feedback Title */}
              <div className="feedback-title">
                <label>Feedback Title</label>
                <span>Add a short, descriptive headline</span>
                <input type="text" name="title" required />
              </div>

              {/* Category Dropdown */}
              <div className="category-part">
                <label>Category</label>
                <span>Choose a category for your feedback</span>
                <div
                  className={`select-wrapper ${openDropdown === 'category' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('category')}
                >
                  <div className="selected-option">
                    <p>Feature</p>
                    <img src="/svg/dropdown-icon.svg" alt="Dropdown Icon" />
                  </div>
                  {openDropdown === 'category' && (
                    <div className="dropdown-options">
                      <div className="option-item">Feature</div>
                      <div className="option-item">UI</div>
                      <div className="option-item">UX</div>
                      <div className="option-item">Enhancement</div>
                      <div className="option-item">Bug</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="status-part">
                <label>Status</label>
                <span>Change feature state</span>
                <div
                  className={`select-wrapper ${openDropdown === 'status' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('status')}
                >
                  <div className="selected-option">
                    <p>Suggestion</p>
                    <img src="/svg/dropdown-icon.svg" alt="Dropdown Icon" />
                  </div>
                  {openDropdown === 'status' && (
                    <div className="dropdown-options">
                      <div className="option-item">Suggestion</div>
                      <div className="option-item">Planned</div>
                      <div className="option-item">In-Progress</div>
                      <div className="option-item">Live</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback Detail */}
              <div className="feedback-detail-part">
                <label htmlFor="feedback-detail">Feedback Detail</label>
                <span>Include any specific comments on what should be improved, added, etc.</span>
                <textarea required />
              </div>

              {/* Buttons */}
              <div className="btns-part">
                <button type="submit" className="save-changes-btn">Save Changes</button>
                <button type="button" className="cancel-btn">Cancel</button>
                <button type="button" className="delete-btn">Delete</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="new-feedback-page">
          <div className="add-icon">
            <img src="/svg/plus.svg" alt="Add Plus Icon" />
          </div>
          <h2>Create New Feedback</h2>
          <div className="new-feedback-form-section">
            <form autoComplete="off">
              {/* Feedback Title */}
              <div className="feedback-title">
                <label>Feedback Title</label>
                <span>Add a short, descriptive headline</span>
                <input type="text" name="title" required />
              </div>

              {/* Category Dropdown */}
              <div className="category-part">
                <label>Category</label>
                <span>Choose a category for your feedback</span>
                <div
                  className={`select-wrapper ${openDropdown === 'category' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('category')}
                >
                  <div className="selected-option">
                    <p>Feature</p>
                    <img src="/svg/dropdown-icon.svg" alt="Dropdown Icon" />
                  </div>
                  {openDropdown === 'category' && (
                    <div className="dropdown-options">
                      <div className="option-item">Feature</div>
                      <div className="option-item">UI</div>
                      <div className="option-item">UX</div>
                      <div className="option-item">Enhancement</div>
                      <div className="option-item">Bug</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback Detail */}
              <div className="feedback-detail-part">
                <label htmlFor="feedback-detail">Feedback Detail</label>
                <span>Include any specific comments on what should be improved, added, etc.</span>
                <textarea required />
              </div>

              {/* Buttons */}
              <div className="btns-part">
                <button type="submit" className="add-feedback-btn">Add Feedback</button>
                <button type="button" className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
