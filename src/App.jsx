import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

function getPageFromPath() {
  return window.location.pathname === "/signup" ? "signup" : "login";
}

export default function App() {
  const [page, setPage] = useState(getPageFromPath);

  useEffect(() => {
    const handlePopState = () => setPage(getPageFromPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPage) => {
    const path = nextPage === "signup" ? "/signup" : "/login";
    window.history.pushState({}, "", path);
    setPage(nextPage);
  };

  return page === "signup" ? (
    <SignupPage onNavigate={navigate} />
  ) : (
    <LoginPage onNavigate={navigate} />
  );
}
