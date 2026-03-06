import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const ViewAllJobs = ({ onPostNew }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/jobs`);

    const data = await res.json();

    setJobs(data);
     setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    });

    fetchJobs();
  };

  return (
    <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-sm w-full">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Current Openings</h2>

        <button
          onClick={onPostNew}
          className="

px-6 py-2.5

rounded-lg

text-white

font-semibold

bg-gradient-to-r

from-[#2E1A6D]

to-[#4B2D73]
cursor-pointer

"
        >
          Post New Job
        </button>
      </div>

      {/* TABLE */}

      {loading ? (
  <div className="flex justify-center items-center h-60">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
  </div>
) : (
  <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-left text-gray-800 text-lg">
            <tr>
              <th className="p-4">Image</th>

              <th className="p-4">Title</th>

              <th className="p-4">Type</th>

              <th className="p-4">Description</th>

              <th className="p-4">Date</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b text-gray-800 text-base hover:bg-gray-100 transition">
                <td className="p-4">
                  <img
                    src={`${API_BASE_URL.replace("/api/v1", "")}/uploads/${job.image}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-4">{job.title}</td>

                <td className="p-4">{job.jobType}</td>

                <td className="p-4">{job.description}</td>

                <td className="p-4">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-500 text-2xl hover:scale-110 transition cursor-pointer"
                  >
                    🗑
                  </button>
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

export default ViewAllJobs;

// import React, { useEffect, useState } from "react";

// const ViewAllJobs = ({ onClose }) => {
//   const [jobs, setJobs] = useState([]);

//   // fetch jobs
//   const fetchJobs = async () => {
//     const res = await fetch("http://localhost:5000/api/jobs");

//     const data = await res.json();

//     setJobs(data);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   // delete job
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this job?")) return;

//     await fetch(`http://localhost:5000/api/jobs/${id}`, {
//       method: "DELETE",
//     });

//     fetchJobs();
//   };

//   return (
//     <div className="w-full">
//       <div className="bg-[#03104C] w-[900px] max-h-[600px] overflow-y-auto rounded-xl p-6 relative">
//         {/* CLOSE BUTTON */}

//         <h2 className="text-2xl font-semibold mb-6">All Jobs</h2>

//         {jobs.map((job) => (
//           <div
//             key={job._id}
//             className="border p-4 rounded-lg mb-4 flex items-center gap-4"
//           >
//             <img
//               src={`http://localhost:5000/uploads/${job.image}`}
//               className="w-20 h-20 object-cover rounded"
//             />

//             <div className="flex-1">
//               <h3 className="font-semibold">{job.title}</h3>

//               <p className="text-sm text-gray-200">{job.jobType}</p>
//             </div>

//             <button
//               onClick={() => handleDelete(job._id)}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewAllJobs;
