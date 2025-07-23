import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { PaginationControlsProps } from "../models/components/table.model";

const PaginationControls = ({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 flex items-center gap-1"
        title="Previous"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      <span>
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 flex items-center gap-1"
        title="Next"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PaginationControls;
