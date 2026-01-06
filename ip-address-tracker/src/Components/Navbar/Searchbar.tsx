import { useState } from "react";
import "./NavAndSearch.css";
import type { SearchbarProps } from "../../Types";

export default function Searchbar({ onSearch, isLoading }: SearchbarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- Defensive Coding ---
    if (!query.trim()) return; // Don't search if empty
    if (isLoading) return;     // Don't search if already fetching
    
    onSearch(query);
  };

  return (
   <form className="search-container" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search for any IP address or domain"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="search-btn"
        aria-label="Search"
      >
        {isLoading ? '...' : '>'}
      </button>
    </form>
  )
}
