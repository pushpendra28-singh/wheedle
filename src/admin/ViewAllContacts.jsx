import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import API_BASE_URL from "../config/api";
import Toast from "./Toast";

const ViewAllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState(null);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Contacted: "bg-blue-100 text-blue-700",
    Selected: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/contact/`);
      setContacts(res.data.contacts || []);
    } catch (_) {
      setToast({ message: "Failed to fetch applications", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/contact/status/${id}/`, {
        status: newStatus,
      });
      showSuccess(`Status updated to ${newStatus}`);
      fetchContacts();
    } catch (_) {
      showError("Failed to update status");
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/contact/${id}`);
      showSuccess("Application deleted successfully");
      fetchContacts();
    } catch (_) {
      showError("Failed to delete application");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected applications?`)) return;

    try {
      setLoading(true);
      await Promise.all(
        selectedIds.map((id) => axios.delete(`${API_BASE_URL}/contact/${id}`))
      );
      showSuccess(`${selectedIds.length} applications deleted successfully`);
      setSelectedIds([]);
      fetchContacts();
    } catch (_) {
      showError("Failed to delete some applications");
      fetchContacts();
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === currentItems.length && currentItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentItems.map((item) => item._id));
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-300 relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Applications Management</h2>
          <p className="text-gray-500 text-sm mt-1">Total: {contacts.length} applications</p>
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="px-6 py-2.5 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-800">
                  <th className="p-4 w-10 border">
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer"
                      checked={selectedIds.length === currentItems.length && currentItems.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 border font-semibold">Name</th>
                  <th className="p-4 border font-semibold">Email</th>
                  <th className="p-4 border font-semibold">Phone</th>
                  <th className="p-4 border font-semibold">Looking For</th>
                  <th className="p-4 border font-semibold">Status</th>
                  <th className="p-4 border font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-gray-50 transition ${selectedIds.includes(item._id) ? "bg-blue-50" : ""
                      }`}
                  >
                    <td className="p-4 border text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                      />
                    </td>
                    <td className="p-4 border font-medium text-gray-800">{item.name}</td>
                    <td className="p-4 border text-gray-600">{item.email}</td>
                    <td className="p-4 border text-gray-600">{item.phone}</td>
                    <td className="p-4 border text-gray-600">{item.lookingFor}</td>

                    <td className="p-4 border">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                        className={`px-3 py-2 rounded-lg font-medium cursor-pointer outline-none w-full ${statusColors[item.status] || "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <option>Pending</option>
                        <option>Contacted</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                      </select>
                    </td>

                    <td className="p-4 border text-center">
                      <Trash2
                        size={22}
                        className="text-red-500 cursor-pointer hover:text-red-700 transition transform hover:scale-110 inline-block"
                        onClick={() => deleteContact(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {contacts.length === 0 && (
              <div className="text-center py-10 text-gray-500 border rounded-b-xl">No applications found.</div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 rounded-lg border transition ${currentPage === i + 1
                      ? "bg-[#2E1A6D] text-white border-[#2E1A6D]"
                      : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewAllContacts;
