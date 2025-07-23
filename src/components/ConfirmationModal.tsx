import React from "react";
import type { ConfirmationModalProps } from "../models/components/modal.model";
import Spinner from "./Spinner";


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title = "Are you sure?",
  message,
  onCancel,
  onConfirm,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
           {loading && <Spinner />}
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
