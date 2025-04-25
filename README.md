# Product Feedback App

This project was developed as part of the Acunmedya Akademi bootcamp and allows users to share, filter, and manage product feedback through a modern React interface.

The project was built collaboratively by Buse Savaş, Gaye Dinç, Ömer Kuluç, and Mehmet Akif Küçükyılmaz. The GIT version control system was actively used throughout the development, enabling team-based task distribution and real-time collaboration.

![image](https://github.com/user-attachments/assets/a88e3d26-89f2-43a1-a404-a5ade9fad93a)

## Project Overview

Product Feedback App is a feedback management system where users can submit new feedback, comment on existing ones, and filter or sort them based on category or popularity. With dynamic comment handling, category-based filtering, and a roadmap display, the app provides a seamless user experience.

## Core Features

- Feedback Management: Users can create new feedback, edit, or delete existing ones. Additionally, they can comment on other users' feedback and reply to comments.

![image](https://github.com/user-attachments/assets/25c7f033-6293-4a1c-b608-73e56c7978f2)

- Add Feedback: Users can click the "Add Feedback" button on the homepage to submit new feedback. The form includes fields for title, category, and description.

![image](https://github.com/user-attachments/assets/7ef237df-b345-4116-8017-46c8adcbde16)

- Edit and Delete Feedback: Clicking on a feedback opens a detailed view. From here, users can click the "Edit Feedback" button to update or delete the item, including category, status, and description.

![image](https://github.com/user-attachments/assets/f1c3dc1e-37e8-4113-8613-fa66bf20d8e2)

- Filtering and Sorting: Feedback items can be filtered by tag and sorted by most upvoted, most commented, or newest.

![image](https://github.com/user-attachments/assets/239230ef-70fb-45d4-adac-3b6cb2f8d111)

- Roadmap Page: Feedback items are grouped by three statuses: **Planned**, **In-Progress**, and **Live**. This allows users to easily understand which features are upcoming, in development, or already launched.

![image](https://github.com/user-attachments/assets/ff50d4d2-11fa-434a-b717-45691d694edc)

- Tag-Based Filtering: On the homepage users can click on tags like "All", "Feature", "Enhancement", and "Bug" to view only the feedback items that match the selected category.

![image](https://github.com/user-attachments/assets/331c5bcd-cf38-4968-afc8-b9902c6750ef)

- Page Navigation: Navigation between pages is handled using hash-based routing.

- Notification System: Success messages are displayed to users using the React Hot Toast library.

![image](https://github.com/user-attachments/assets/233c8b25-315b-4226-8c36-af5aff091c2d)

- Persistent Data: All user feedback and comments are stored locally in the browser using localStorage.

- Future Improvements: Plans include adding an authentication system to track user-specific actions and permissions.

## Team Contributions

### Gaye Dinç

- Designed the responsive header component of the application.
- Developed the "Add Feedback" and "Edit Feedback" page layouts.
- Integrated the React Hot Toast library for success message notifications.
- Contributed to the responsive CSS structure to ensure mobile compatibility.

### Buse Savaş

- 

### Mehmet Akif Küçükyılmaz

- 

### Ömer Kuluç

- 

## Live Demo

[https://gaye-buse-omer-akif-product-feedback-app.vercel.app](https://gaye-buse-omer-akif-product-feedback-app.vercel.app)

## Installation

To run this project on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/acunmedyaakademi/gaye-buse-omer-akif-product-feedback-app.git
```

2. Navigate into the project directory:

```bash
cd gaye-buse-omer-akif-product-feedback-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The app will run by default at:  
http://localhost:5173

## Project Structure

```bash
gaye-buse-omer-akif-product-feedback-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Categories.jsx
│   │   ├── FeedbackContext.jsx
│   │   ├── FeedbackDetail.jsx
│   │   ├── NewFeedback.jsx
│   │   ├── Roadmap.jsx
│   │   └── Suggestions.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── Svg.jsx
│   ├── helper.jsx
│   ├── main.jsx
│   └── reset.css
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```
