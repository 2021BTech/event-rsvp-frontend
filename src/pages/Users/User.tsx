import { useEffect, useState } from "react";
import { ReusableTable } from "../../components/ReusableTable";
import type { User } from "../../models/users/user.model";
import PaginationControls from "../../components/PaginationControls";
import EventService from "../../services/event.service";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import ConfirmationModal from "../../components/ConfirmationModal";
import { showToast } from "../../utils/Toast";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await EventService.getAdminUsers(currentPage, pageSize);
      if (response) {
        setUsers(response.data);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      } else {
        console.error("Failed to fetch users: null response");
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setDeleting(true);

    try {
      const res = await EventService.deleteAdminUser(userToDelete._id);
      if (res?.message) {
        showToast("success", res.message);
        fetchUsers(page);
      }
    } catch (err) {
      showToast("error", "Failed to delete user.");
      console.error(err);
    } finally {
      setShowConfirm(false);
      setUserToDelete(null);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      {/* Summary Card */}
      <div className="mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Total Users</h2>
            <p className="text-gray-500">All registered users</p>
          </div>
          <span className="text-4xl font-bold text-indigo-600">{total}</span>
        </div>
      </div>

      {/* User Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading users...</div>
      ) : (
        <ReusableTable<User>
          data={users}
          columns={[
            {
              label: "#",
              key: "_id",
              className: "pl-4 pr-3 sm:pl-6",
              render: (_val, _row, index) => (page - 1) * pageSize + index + 1,
            },
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            {
              label: "Role",
              key: "role",
              render: (role) => (
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    role === "admin"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {role}
                </span>
              ),
            },
          ]}
          actions={[
            {
              label: "View",
              icon: <FiEye className="w-5 h-5" />,
              onClick: (user) => alert(`Viewing user ${user.name}`),
            },
            {
              label: "Edit",
              icon: <FiEdit className="w-5 h-5" />,
              onClick: (user) => alert(`Editing user ${user.name}`),
            },
            {
              label: "Delete",
              icon: <FiTrash className="w-5 h-5 text-red-600" />,
              onClick: (user) => {
                setUserToDelete(user);
                setShowConfirm(true);
              },
            },
          ]}
        />
      )}

      {/* Pagination Controls (Server-side) */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirm}
        message={`Are you sure you want to delete "${userToDelete?.name}"?`}
        onCancel={() => {
          setShowConfirm(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDeleteUser}
        confirmText="Delete User"
        loading={deleting}
      />
    </div>
  );
};

export default UserPage;
