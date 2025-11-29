import { useEffect, useState } from "react";
import { Contact } from "../features/contacts/types";
import { validateContact, ValidationErrors } from "../utils/validation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addContact, updateContact } from "../features/contacts/contactSlice";
import { STATES } from "../constant";

interface ContactModalProps {
  contact?: Contact | null;
  onClose: () => void;
}

const ContactModal = ({ contact, onClose }: ContactModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    state: "Punjab",
    pincode: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        addressLine1: contact.addressLine1,
        addressLine2: contact.addressLine2 || "",
        state: contact.state,
        pincode: contact.pincode,
      });
    }
  }, [contact]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change if field has been touched
    if (touched.has(name)) {
      const validationErrors = validateContact(formData);
      if (validationErrors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validationErrors[name],
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    const newTouched = new Set(touched);
    newTouched.add(name);
    setTouched(newTouched);

    const validationErrors = validateContact(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name] || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContact(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched(new Set(Object.keys(validationErrors)));
      return;
    }

    const contactData = {
      ...formData,
      id: contact?.id || Date.now().toString(),
    };

    if (contact) {
      dispatch(updateContact(contactData as Contact));
    } else {
      dispatch(addContact(contactData as Contact));
    }

    onClose();
  };

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
    return (
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="label-required">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Contact No.</label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Enter contact no."
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="label-required">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="addressLine1" className="label-required">
                Address Line 1
              </label>
              <input
                id="addressLine1"
                type="text"
                name="addressLine1"
                placeholder="Enter address"
                value={formData.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.addressLine1 ? "error" : ""}
              />
              {errors.addressLine1 && (
                <span className="error-message">{errors.addressLine1}</span>
              )}
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
              <input
                id="addressLine2"
                type="text"
                name="addressLine2"
                placeholder="Enter address"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pincode" className="label-required">
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.pincode ? "error" : ""}
              />
              {errors.pincode && (
                <span className="error-message">{errors.pincode}</span>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {contact ? "Update Contact" : "Add Contact"}
          </button>
        </div>
      </form>
    );
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
