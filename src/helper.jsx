import Suggestions from "./components/Suggestions";
import Roadmap from "./components/Roadmap";
import Categories from "./components/Categories";
import FeedbackDetail from "./components/FeedbackDetail";
import  NewFeedback  from "./components/NewFeedback";


const routes = [
  { title: "Home", url: "/", component: <Suggestions /> },
  { title: "Roadmap", url: "/roadmap", component: <Roadmap /> },
  { title: "Categories", url: "/categories", component: <Categories /> },
  { url: "/feedback-detail", component: <FeedbackDetail /> },   
  { title: 'New Feedback', url: '/new-feedback', component: <NewFeedback /> },
];

const notFound = {
  component: <NotFound />,
};

export function getPage(url) {
  const exactPage = routes.find((x) => x.url === url);
  if (exactPage) return exactPage;

  if (url.startsWith("/feedback-detail/")) {
    return { title: "Feedback Detail", component: <FeedbackDetail /> };
  }

  // if (url.startsWith("/tags/")) {
  //   return { title: "Tagged Notes", component: <TaggedNotes /> };
  // }

  return notFound;
}

function NotFound() {
  return <h1>Bu sayfa bulunamadı.</h1>;
}
