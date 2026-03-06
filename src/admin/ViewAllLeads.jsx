import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import API_BASE_URL from "../config/api";

const ViewAllLeads = () => {
  const [leads, setLeads] = useState([]);
  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/leads`);
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads();
  }, []);

  

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/leads/${id}`, { status });

      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? { ...lead, status } : lead)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/leads/${id}`);

      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Contacted: "bg-blue-100 text-blue-700",
    Selected: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Leads</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-gray-800">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-800">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Value</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead._id} className="hover:bg-gray-50 text-gray-800">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border capitalize">{lead.type}</td>
                <td className="p-3 border">{lead.value}</td>
                <td className="p-3 border">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                    className={`px-3 py-2 rounded-lg font-medium cursor-pointer outline-none ${statusColors[lead.status]}`}
                  >
                    <option>Pending</option>
                    <option>Contacted</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                  </select>
                </td>

                <td className="p-3 border text-center">
                  <Trash2
                    size={18}
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => deleteLead(lead._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllLeads;
