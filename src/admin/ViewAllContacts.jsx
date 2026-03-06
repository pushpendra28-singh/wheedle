import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import API_BASE_URL from "../config/api";

const ViewAllContacts = () => {
  const [contacts, setContacts] = useState([]);

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
    const res = await axios.get(`${API_BASE_URL}/contact`);
    setContacts(res.data.contacts);
  };

  const updateStatus = async (id, newStatus) => {
    await axios.put(`${API_BASE_URL}/contact/status/${id}`, {
      status: newStatus,
    });

    fetchContacts();
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    await axios.delete(`${API_BASE_URL}/contact/${id}`);
    fetchContacts();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Applications Management
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-gray-800">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-800">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Looking For</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 text-gray-800">
                <td className="p-3 border font-medium">{item.name}</td>
                <td className="p-3 border">{item.email}</td>
                <td className="p-3 border">{item.phone}</td>
                <td className="p-3 border">{item.lookingFor}</td>

                <td className="p-3 border">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item._id, e.target.value)
                    }
                    className={`px-3 py-2 rounded-lg font-medium cursor-pointer outline-none ${statusColors[item.status]}`}
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
                    onClick={() => deleteContact(item._id)}
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

export default ViewAllContacts;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Trash2 } from "lucide-react";

// const ViewAllContacts = () => {
//   const [contacts, setContacts] = useState([]);

//   const statusColors = {
//     Pending: "bg-yellow-100 text-yellow-700",

//     Contacted: "bg-blue-100 text-blue-700",

//     Selected: "bg-green-100 text-green-700",

//     Rejected: "bg-red-100 text-red-700",
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     const res = await axios.get("http://localhost:5000/api/contact");

//     setContacts(res.data.contacts);
//   };

//   const updateStatus = async (id, newStatus) => {
//     await axios.put(`http://localhost:5000/api/contact/status/${id}`, {
//       status: newStatus,
//     });

//     fetchContacts();
//   };

//   const deleteContact = async (id) => {
//     if (!window.confirm("Delete this contact?")) return;

//     await axios.delete(`http://localhost:5000/api/contact/${id}`);

//     fetchContacts();
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//         Applications Management
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-100 text-gray-800">
//               <th className="p-6 text-left">Name</th>

//               <th className="p-4 text-left">Email</th>

//               <th className="p-4 text-left">Phone</th>

//               <th className="p-4 text-left">Looking For</th>

//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {contacts.map((item) => (
//               <tr key={item._id} className="border-b">
//                 <td className="p-4 text-gray-800 font-medium">{item.name}</td>

//                 <td className="p-4 text-gray-800">{item.email}</td>

//                 <td className="p-4 text-gray-800">{item.phone}</td>

//                 <td className="p-4 text-gray-800">{item.lookingFor}</td>

//                 <td className="p-4">
//                   <select
//                     value={item.status}
//                     onChange={(e) => updateStatus(item._id, e.target.value)}
//                     className={`
//                     px-3 py-2 rounded-lg font-medium cursor-pointer outline-none
//                     ${statusColors[item.status]}
//                     `}
//                   >
//                     <option>Pending</option>

//                     <option>Contacted</option>

//                     <option>Selected</option>

//                     <option>Rejected</option>
//                   </select>

                  
//                 </td>
//                 <td className="p-4">
//                     <Trash2
//                       size={18}
//                       className="text-red-600 cursor-pointer hover:text-red-800"
//                       onClick={() => deleteContact(item._id)}
//                     />
//                   </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewAllContacts;
