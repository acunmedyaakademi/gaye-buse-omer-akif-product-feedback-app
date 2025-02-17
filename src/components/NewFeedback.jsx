import { useContext, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";
import { LeftSvg } from "../Svg";
import toast from "react-hot-toast";

export default function NewFeedback() {
  const {
    feedbacks,
    setFeedbacks,
    isEdit,
    setEdit,
    currentFeedback,
    setCurrentFeedback,
  } = useContext(FeedbackContext);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Feature");
  const [selectedStatus, setSelectedStatus] = useState("Suggestion");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    formObj.id = crypto.randomUUID();
    formObj.upvotes = 0;
    formObj.status = "Planned";
    formObj.category = selectedCategory;
    formObj.comments = [];

    setFeedbacks((prevFeedbacks) => {
      const updatedFeedbacks = [formObj, ...prevFeedbacks];
      localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
      return updatedFeedbacks;
    });

    setCurrentFeedback(formObj);
    window.location.hash = `#/`;
    toast.success("Feedback added successfully!");
  }

  function handleDelete(feedbackId) {
    const updatedFeedbacks = feedbacks.filter((feedback) => feedback.id !== feedbackId);

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

    setCurrentFeedback(null);
    setEdit(false);

    window.location.hash = "#/";
    toast.success("Feedback deleted successfully!");
  }


  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setOpenDropdown(null);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setOpenDropdown(null);
  };

  const updatedComments = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);

    const updatedFeedback = {
      ...currentFeedback,
      title: formObj.title || currentFeedback.title,
      description: formObj.description || currentFeedback.description,
      category: selectedCategory || currentFeedback.category,
      status: selectedStatus || currentFeedback.status,
    };

    const updatedFeedbacks = feedbacks.map((inv) =>
      inv.id === currentFeedback.id ? updatedFeedback : inv
    );

    setCurrentFeedback(updatedFeedback);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
    setEdit(false);
    setCurrentFeedback(null);
    e.target.reset();

    window.location.hash = "#/";
    toast.success("Feedback updated successfully!");
  };

  return (
    <div className="new-feedback-container">
      <div className="new-feedback-container-inner">
        <div className="goBack-new-edit-page">
          <LeftSvg />
          <a href="#/">
            <span>Go Back</span>
          </a>
        </div>
        {isEdit ? (
          <div className="edit-feedback-page">
            <div className="add-icon">
              <img src="/svg/edit-icon.svg" alt="Edit Icon" />
            </div>
            <h2>Editing '{currentFeedback.title}'</h2>
            <div className="edit-feedback-form-section">
              <form autoComplete="off" onSubmit={updatedComments}>
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
                    className={`select-wrapper ${openDropdown === "category" ? "active" : ""
                      }`}
                    onClick={() => toggleDropdown("category")}
                  >
                    <div className="selected-option">
                      <p>{selectedCategory}</p>
                      <img src="/svg/dropdown-icon.svg" alt="Dropdown Icon" />
                    </div>
                    {openDropdown === "category" && (
                      <div className="dropdown-options">
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("Feature")}
                        >
                          Feature
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("UI")}
                        >
                          UI
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("UX")}
                        >
                          UX
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("Enhancement")}
                        >
                          Enhancement
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("Bug")}
                        >
                          Bug
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="status-part">
                  <label>Status</label>
                  <span>Change feature state</span>
                  <div
                    className={`select-wrapper ${openDropdown === "status" ? "active" : ""
                      }`}
                    onClick={() => toggleDropdown("status")}
                  >
                    <div className="selected-option">
                      <p>{selectedStatus}</p>
                      <img src="/svg/dropdown-icon.svg" alt="Dropdown Icon" />
                    </div>
                    {openDropdown === "status" && (
                      <div className="dropdown-options">
                        <div
                          className="option-item"
                          onClick={() => handleStatusSelect("Suggestion")}
                        >
                          Suggestion
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleStatusSelect("Planned")}
                        >
                          Planned
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleStatusSelect("In-Progress")}
                        >
                          In-Progress
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleStatusSelect("Live")}
                        >
                          Live
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Feedback Detail */}
                <div className="feedback-detail-part">
                  <label htmlFor="feedback-detail">Feedback Detail</label>
                  <span>
                    Include any specific comments on what should be improved,
                    added, etc.
                  </span>
                  <textarea name="description" required />
                </div>

                {/* Buttons */}
                <div className="btns-part-edit">
                  <button type="button" className="delete-btn" onClick={() => handleDelete(currentFeedback.id)}>
                    Delete
                  </button>
                  <div className="btns-right-side">
                    <button type="button" className="cancel-btn" onClick={() => (window.location.hash = "#/")}>
                      Cancel
                    </button>
                    <button type="submit" className="save-changes-btn">
                      Save Changes
                    </button>
                  </div>
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
              <form autoComplete="off" onSubmit={handleSubmit}>
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
                    className={`select-wrapper ${openDropdown === "category" ? "active" : ""
                      }`}
                    onClick={() => toggleDropdown("category")}
                  >
                    <div className="selected-option">
                      <p>{selectedCategory}</p>
                      <img src="/svg/dropdown-icon.svg" alt="Dropdown Icon" />
                    </div>
                    {openDropdown === "category" && (
                      <div className="dropdown-options">
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("Feature")}
                        >
                          Feature
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("UI")}
                        >
                          UI
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("UX")}
                        >
                          UX
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("Enhancement")}
                        >
                          Enhancement
                        </div>
                        <div
                          className="option-item"
                          onClick={() => handleCategorySelect("Bug")}
                        >
                          Bug
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Feedback Detail */}
                <div className="feedback-detail-part">
                  <label htmlFor="feedback-detail">Feedback Detail</label>
                  <span>
                    Include any specific comments on what should be improved,
                    added, etc.
                  </span>
                  <textarea name="description" required />
                </div>

                {/* Buttons */}
                <div className="btns-part">
                  <button type="submit" className="add-feedback-btn">Add Feedback</button>
                  <button type="button" className="cancel-btn" onClick={() => (window.location.hash = "#/")}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
