import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import blogsData from "../blogs.json";
import "../hello.css";

export default function DynamicPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Simulate data fetching delay
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      // Use the exact current pathname for matching
      const currentRoute = location.pathname;
      const foundBlog = blogsData.find((b) => b.route === currentRoute);
      setBlog(foundBlog);
      setLoading(false);
    };
    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    if (!loading) {
      const container = document.getElementById("page-content");
      if (container) {
        // Intercept click events on links within the container
        const handleLinkClick = (e) => {
          // Check if the clicked element or any parent is an anchor tag
          const anchor = e.target.closest("a");
          if (anchor) {
            const href = anchor.getAttribute("href");
            // If the href is an internal route (for example, starting with "/blog")
            // you can modify the condition to match your routing needs
            if (href && href.startsWith("/blog")) {
              e.preventDefault();
              navigate(href);
            }
          }
        };

        container.addEventListener("click", handleLinkClick);
        return () => {
          container.removeEventListener("click", handleLinkClick);
        };
      }
    }
  }, [loading, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!blog) {
    return <div>Page not found.</div>;
  }

  return (
    <article
      id="page-content"
      dangerouslySetInnerHTML={{ __html: blog.fullData.html }}
    />
  );
}
