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
import ContactModal from "./ContactModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ContactList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const contacts = useSelector(selectAllContacts);
  const selectedIds = useSelector(selectSelectedIds);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    contactIds: string[];
    isBulk: boolean;
  } | null>(null);

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

  const handleBulkDeleteClick = () => {
    setDeleteConfirm({ contactIds: selectedIds, isBulk: true });
  };

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

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowAddModal(true);
  };

  const handleDeleteClick = (contactId: string) => {
    setDeleteConfirm({ contactIds: [contactId], isBulk: false });
  };

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
          <span className="search-icon">
            <img src="/assets/search-icon.svg" alt="Search" />
          </span>
        </div>
        <div className="action-buttons">
          {selectedIds.length > 0 && (
            <button className="btn btn-primary" onClick={handleBulkDeleteClick}>
              Bulk Delete ({selectedIds.length})
            </button>
          )}

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingContact(null);
              setShowAddModal(true);
            }}
          >
            Add Contact
          </button>
        </div>
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
                <td>
                  {contact.addressLine1},{contact.addressLine2 ?? ""},{" "}
                  {contact.pincode}
                </td>
                <td>
                  <div className="action-cell">
                    <div className="">
                      <button
                        className="btn-icon"
                        onClick={() => handleEdit(contact)}
                        title="Edit"
                        style={{ background: "#EFF6FF" }}
                      >
                        <img src="/assets/edit.svg" alt="Edit" />
                      </button>
                      <p>Edit</p>
                    </div>

                    <div className="">
                      <button
                        className="btn-icon danger"
                        onClick={() => handleDeleteClick(contact.id)}
                        title="Delete"
                        style={{ background: "#FFF1F2" }}
                      >
                        <img src="/assets/delete.svg" alt="Delete" />
                      </button>
                      <p>Delete</p>
                    </div>
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
      <div className="contact-list-container">
        {renderActionBar()}
        {filteredContacts.length === 0 ? (
          <div className="table-container">
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <div className="empty-state-text">
                {searchQuery
                  ? "No contacts found"
                  : 'No contacts yet. Click "Add Contact" to get started!'}
              </div>
            </div>
          </div>
        ) : (
          renderContactsTable()
        )}
      </div>

      {showAddModal && (
        <ContactModal
          contact={editingContact}
          onClose={() => {
            setShowAddModal(false);
            setEditingContact(null);
          }}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirmModal
          count={deleteConfirm.contactIds.length}
          isBulk={deleteConfirm.isBulk}
          onConfirm={() => {
            setDeleteConfirm(null);
          }}
          onCancel={() => setDeleteConfirm(null)}
          contactIds={deleteConfirm.contactIds}
        />
      )}
    </div>
  );
};

export default ContactList;
