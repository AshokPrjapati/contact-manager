import { useState } from "react";

const ContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderActionBar = () => {
    return (
      <div className="action-bar">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Name, Contact, Email, State..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="page-title">Contact Manager</h1>
      {renderActionBar()}
    </div>
  );
};

export default ContactList;
