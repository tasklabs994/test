import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import blogsData from "../blogs.json";
import "../hello.css";

export default function DynamicPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Simulate data fetching delay
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      // Use the exact current pathname for matching
      const currentRoute = location.pathname;
      const foundBlog = blogsData.find(b => b.route === currentRoute);
      setBlog(foundBlog);
      setLoading(false);
    };
    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    if (!loading) {
      const container = document.getElementById("page-content");
      if (container) {
        const hotSpots = container.querySelectorAll(".MCDropDownHotSpot");
        const handleClick = function(e) {
          e.preventDefault();
          const parent = this.closest(".MCDropDown");
          if (parent.classList.contains("MCDropDown_Closed")) {
            parent.classList.remove("MCDropDown_Closed");
            parent.classList.add("MCDropDown_Open");
          } else {
            parent.classList.add("MCDropDown_Closed");
            parent.classList.remove("MCDropDown_Open");
          }
        };
        hotSpots.forEach(element => {
          element.addEventListener("click", handleClick);
        });
        return () => {
          hotSpots.forEach(element => {
            element.removeEventListener("click", handleClick);
          });
        };
      }
    }
  }, [loading]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!blog) {
    return <div>Page not found.</div>;
  }

  return (
    <article id="page-content" dangerouslySetInnerHTML={{ __html: blog.fullData.html }} />
  );
}
