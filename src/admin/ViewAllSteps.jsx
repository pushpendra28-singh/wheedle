import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import API_BASE_URL from "../config/api";

const ViewAllSteps = ({ setActivePage }) => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/steps`);

    setSteps(res.data);
    setLoading(false);
  };

  const deleteStep = async (id) => {
    await axios.delete(`${API_BASE_URL}/steps/${id}`);

    fetchSteps();
  };

  return (
    <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Steps</h1>

        <button
          onClick={() => setActivePage("addStep")}
          className="px-6 py-2.5

rounded-lg

text-white

font-semibold

bg-gradient-to-r

from-[#2E1A6D]

to-[#4B2D73]
cursor-pointer
"
        >
          Add Step
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100 text-left text-gray-800 text-lg">
            <tr>
              <th className="p-3 text-left">Title</th>

              <th className="p-3">Image</th>

              <th>Description</th>

              <th>Date</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {steps.map((step) => (
              <tr key={step._id} className="border-t text-gray-800">
                <td className="p-3">{step.title}</td>

                <td className="p-3">
                  <img
                    src={`http://localhost:5000/uploads/${step.image}`}
                    className="w-16 h-16 object-cover"
                  />
                </td>

                <td className="p-3">{step.description}</td>

                <td>{new Date(step.createdAt).toLocaleDateString()}</td>

                <td>
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteStep(step._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default ViewAllSteps;
