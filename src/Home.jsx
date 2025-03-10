import React, { useState, useEffect } from "react";
import "./hello.css";
import blogsData from "./blogs.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("revu21");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // List of available versions
  const versions = ["revu21", "revu20"];

  // Filter blogs based on selected version, search, and category filters.
  useEffect(() => {
    let blogsByVersion = blogsData.filter(blog => blog.version === selectedVersion);
    let filtered = blogsByVersion;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog => {
        const inTitle = blog.name.toLowerCase().includes(query);
        const inSnippet = blog.snippet.toLowerCase().includes(query);
        const inPath = blog.fullPath.toLowerCase().includes(query);
        const fullText = blog.fullData.html.toLowerCase();
        return inTitle || inSnippet || inPath || fullText.includes(query);
      });
    } else if (selectedCategory) {
      filtered = filtered.filter(blog => blog.hierarchy && blog.hierarchy[0] === selectedCategory);
      if (selectedSubcategory) {
        filtered = filtered.filter(blog => blog.hierarchy && blog.hierarchy[1] === selectedSubcategory);
      }
    }
    
    setFilteredBlogs(filtered);
  }, [searchQuery, selectedVersion, selectedCategory, selectedSubcategory]);

  // Extract unique categories (first level of hierarchy) for the selected version
  const categories = [...new Set(blogsData
    .filter(blog => blog.version === selectedVersion && blog.hierarchy && blog.hierarchy.length > 0)
    .map(blog => blog.hierarchy[0])
  )];
  
  // Get subcategories for the selected category
  const subcategories = selectedCategory ? 
    [...new Set(blogsData
      .filter(blog => blog.version === selectedVersion &&
              blog.hierarchy && blog.hierarchy.length > 1 && blog.hierarchy[0] === selectedCategory)
      .map(blog => blog.hierarchy[1])
    )] : [];

  return (
    <div className="container">
      <div className="version-toggle">
        {versions.map(version => (
          <button
            key={version}
            className={`version-button ${selectedVersion === version ? 'active' : ''}`}
            onClick={() => {
              setSelectedVersion(version);
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
          >
            {version.toLowerCase() === "revu21" ? "Revu21" : "Revu20"}
          </button>
        ))}
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search pages..." 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
        />
      </div>
      
      {!searchQuery && (
        <div className="category-navigation">
          <div className="categories">
            {categories.map(category => (
              <div 
                key={category} 
                className={`category ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </div>
            ))}
          </div>
          
          {selectedCategory && subcategories.length > 0 && (
            <div className="subcategories">
              {subcategories.map(subcategory => (
                <div 
                  key={subcategory} 
                  className={`subcategory ${selectedSubcategory === subcategory ? 'active' : ''}`}
                  onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory)}
                >
                  {subcategory}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="blog-cards">
        {filteredBlogs.map((blog, index) => (
          <a key={index} href={blog.route} className="blog-card">
            <span className="breadcrumb">{blog.fullPath}</span>
            <h2>{blog.name}</h2>
            <p>{blog.snippet}...</p>
          </a>
        ))}
        {filteredBlogs.length === 0 && <p>No pages found.</p>}
      </div>
    </div>
  );
}
