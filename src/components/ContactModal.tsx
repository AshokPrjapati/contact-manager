import { useState } from "react";
import { Contact } from "../features/contacts/types";

interface ContactModalProps {
  contact?: Contact | null;
  onClose: () => void;
}

const ContactModal = ({ contact, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    state: "Punjab",
    pincode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {};

  const renderModalHeader = () => {
    return (
      <div className="modal-header">
        <div className="modal-title">
          {contact ? "Edit Contact" : "Add Contact"}
        </div>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    );
  };

  const renderModalContent = () => {
    return <form onSubmit={handleSubmit}>content</form>;
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        {renderModalHeader()}
        {renderModalContent()}
      </div>
    </div>
  );
};

export default ContactModal;
