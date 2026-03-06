import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const ViewAllPartners = ({ setActivePage }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/partner`);

    setPartners(res.data);
    setLoading(false);
  };

  const deletePartner = async (id) => {
    await axios.delete(`${API_BASE_URL}/partner/${id}`);

    fetchPartners();
  };

  return (
    <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-sm w-full">
    
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-black">All Partners</h1>

        <button
          onClick={() => setActivePage("addPartner")}
          className="px-6 py-2.5

rounded-lg

text-white

font-semibold

bg-gradient-to-r

from-[#2E1A6D]

to-[#4B2D73]
cursor-pointer"

        >
          Add Partner
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
        <table className="w-full bg-white">
          <thead className="bg-gray-100 text-left text-gray-800 text-lg">
            <tr>
              <th className="p-3 text-left text-black">Logo</th>

            <th className="text-black">Name</th>

            <th className="text-black">Date</th>

            <th className="text-black">Action</th>
          </tr>
        </thead>

        <tbody>
          {partners.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-3">
                <img
                  src={`${API_BASE_URL}/uploads/${item.logo}`}
                  
                  className="h-14"
                />
              </td>

              <td className="text-black">{item.name}</td>

              <td className="text-black">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>

              <td>
                <button
                  onClick={() => deletePartner(item._id)}
                  className="text-red-500 text-2xl hover:scale-110 transition cursor-pointer"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default ViewAllPartners;
