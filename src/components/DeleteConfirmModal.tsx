import { useDispatch } from "react-redux";
import { deleteBulk, deleteContact } from "../features/contacts/contactSlice";
import { AppDispatch } from "../app/store";

interface DeleteConfirmModalProps {
  count: number;
  isBulk: boolean;
  contactIds: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({
  count,
  isBulk,
  contactIds,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (isBulk) {
      dispatch(deleteBulk(contactIds));
    } else {
      dispatch(deleteContact(contactIds[0]));
    }
    onConfirm();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            <span className="modal-icon">
              <img
                src="/assets/delete.svg"
                alt="delete"
                width={20}
                height={20}
              />
            </span>
            Delete Contact{isBulk ? `(${count})` : ""}
          </div>
          <button className="modal-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p>
            {isBulk
              ? `Are you sure you want to delete all ${count} contacts?`
              : "Are you sure you want to delete this contact?"}
          </p>
          <p style={{ color: "#64748b", fontSize: "13px", marginTop: "8px" }}>
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
