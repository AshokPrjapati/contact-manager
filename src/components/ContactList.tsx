import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAllContacts,
  selectSelectedIds,
} from "../features/contacts/contactSlice";

const ContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const contacts = useSelector(selectAllContacts);
  const selectedIds = useSelector(selectSelectedIds);

  const handleBulkDeleteClick = () => {};

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
        {selectedIds.length > 0 && (
          <button className="btn btn-danger" onClick={handleBulkDeleteClick}>
            Bulk Delete ({selectedIds.length})
          </button>
        )}

        <button className="btn btn-primary" onClick={() => {}}>
          Add Contact
        </button>
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
