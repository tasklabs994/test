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
        const handleClick = (e) => {
          // First check if the clicked element (or one of its ancestors)
          // is a dropdown toggle (has class "MCDropDownHotSpot")
          const dropDownHotSpot = e.target.closest(".MCDropDownHotSpot");
          if (dropDownHotSpot) {
            e.preventDefault();
            const parent = dropDownHotSpot.closest(".MCDropDown");
            if (parent) {
              if (parent.classList.contains("MCDropDown_Closed")) {
                parent.classList.remove("MCDropDown_Closed");
                parent.classList.add("MCDropDown_Open");
              } else {
                parent.classList.add("MCDropDown_Closed");
                parent.classList.remove("MCDropDown_Open");
              }
              return; // Dropdown toggling handled; do not process further.
            }
          }

          // If not a dropdown toggle, check for a regular anchor link.
          const anchor = e.target.closest("a");
          if (anchor) {
            const href = anchor.getAttribute("href");
            if (href) {
              // Convert absolute URLs to relative ones if needed.
              const currentOrigin = window.location.origin;
              const relativeHref = href.startsWith(currentOrigin)
                ? href.slice(currentOrigin.length)
                : href;
              // If the link is an internal route (e.g., starting with "/blog")
              if (relativeHref.startsWith("/blog")) {
                e.preventDefault();
                navigate(relativeHref);
              }
            }
          }
        };

        container.addEventListener("click", handleClick);
        return () => {
          container.removeEventListener("click", handleClick);
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
