import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelected,
  selectAllContacts,
  selectSelectedIds,
  toggleSelected,
} from "../features/contacts/contactSlice";
import { AppDispatch } from "../app/store";
import { Contact } from "../features/contacts/types";

const ContactList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const contacts = useSelector(selectAllContacts);
  const selectedIds = useSelector(selectSelectedIds);

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;

    const query = searchQuery.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  const isAllSelected =
    filteredContacts.length > 0 &&
    selectedIds.length === filteredContacts.length;

  const handleBulkDeleteClick = () => {};

  const handleSelectAll = () => {
    if (
      selectedIds.length === filteredContacts.length &&
      selectedIds.length > 0
    ) {
      dispatch(clearSelected());
    } else {
      dispatch(clearSelected());
      filteredContacts.forEach((contact) => {
        dispatch(toggleSelected(contact.id));
      });
    }
  };

  const handleEdit = (contact: Contact) => {};

  const handleDeleteClick = (contactId: string) => {};

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

  const renderContactsTable = () => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th style={{ width: "100px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedIds.includes(contact.id)}
                    onChange={() => dispatch(toggleSelected(contact.id))}
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.addressLine1}</td>
                <td>
                  <div className="action-cell">
                    <button
                      className="btn-icon"
                      onClick={() => handleEdit(contact)}
                      title="Edit"
                    >
                      <img src="/assets/edit.svg" alt="Edit" />
                    </button>
                    <button
                      className="btn-icon danger"
                      onClick={() => handleDeleteClick(contact.id)}
                      title="Delete"
                    >
                      <img src="/assets/delete.svg" alt="Delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="page-title">Contact Manager</h1>
      {renderActionBar()}
      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        renderContactsTable()
      )}
    </div>
  );
};

export default ContactList;
