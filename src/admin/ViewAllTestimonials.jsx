import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const ViewAllTestimonials = ({ onClose }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH TESTIMONIALS
  const fetchTestimonials = async () => {
    setLoading
    const res = await fetch(`${API_BASE_URL}/testimonial`);

    const data = await res.json();

    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // DELETE TESTIMONIAL
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    await fetch(`${API_BASE_URL}/testimonial/${id}`, {
      method: "DELETE",
    });

    fetchTestimonials();
  };

  return (
    <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-sm w-full">
      
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-semibold text-gray-800">
          All Testimonials
        </h2>

        <button
          onClick={onClose}
          className="
          px-6 py-2.5
          rounded-lg
          text-white
          font-semibold
          bg-gradient-to-r
          from-[#2E1A6D]
          via-[#3A2371]
          to-[#4B2D73]
          cursor-pointer
          "
        >
          Post New Testimonial
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

              <th className="p-4">Name & Position</th>

              <th className="p-4">Description</th>

              <th className="p-4">Date</th>

              <th className="p-4">Action</th>

            </tr>

          </thead>


          <tbody>

            {testimonials.map((item) => (

              <tr
                key={item._id}
                className="
                border-b
                text-gray-800
                text-base
                hover:bg-gray-100
                transition
                "
              >

                {/* IMAGE */}

                <td className="p-4">

                  <img
                    src={`${API_BASE_URL}/uploads/${item.image}`}
                    className="w-16 h-16 object-cover rounded"
                  />

                </td>


                {/* NAME POSITION */}

                <td className="p-4">

                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {item.position}
                  </p>

                </td>


                {/* DESCRIPTION */}

                <td className="p-4">

                  {item.description}

                </td>


                {/* DATE */}

                <td className="p-4">

                  {new Date(item.createdAt || item.date).toLocaleDateString()}

                </td>


                {/* DELETE */}

                <td className="p-4">

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="
                    text-red-500
                    text-2xl
                    hover:scale-110
                    transition
                    "
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

export default ViewAllTestimonials;





// import React, { useEffect, useState } from "react";

// const ViewAllTestimonials = ({ onClose }) => {
//   const [testimonials, setTestimonials] = useState([]);

//   // FETCH TESTIMONIALS
//   const fetchTestimonials = async () => {
//     const res = await fetch("http://localhost:5000/api/testimonials");

//     const data = await res.json();

//     setTestimonials(data);
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   // DELETE TESTIMONIAL
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this testimonial?")) return;

//     await fetch(`http://localhost:5000/api/testimonials/${id}`, {
//       method: "DELETE",
//     });

//     fetchTestimonials();
//   };

//   return (
//   <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-sm w-full">

//     {/* HEADER */}

//     <div className="flex justify-between items-center mb-6">

//       <h2 className="text-2xl font-semibold text-black">
//         All Testimonials
//       </h2>

//       <button
//         onClick={onClose}
//         className="
//         px-6 py-2.5
//         rounded-lg
//         text-white
//         font-semibold

//         bg-gradient-to-r
//         from-[#2E1A6D]
//         via-[#3A2371]
//         to-[#4B2D73]
//         "
//       >
//         Post New Testimonial
//       </button>

//     </div>


//     {/* LIST */}

//     {testimonials.map((item) => (

//       <div
//         key={item._id}
//         className="
//         border border-gray-300
//         p-5
//         rounded-lg
//         mb-4
//         flex items-center gap-5
//         bg-white
//         "
//       >

//         <img
//           src={`http://localhost:5000/uploads/${item.image}`}
//           className="w-20 h-20 object-cover rounded"
//         />

//         <div className="flex-1">

//           <h3 className="font-semibold text-lg text-black">
//             {item.name}
//           </h3>

//           <p className="text-gray-600">
//             {item.position}
//           </p>

//         </div>


//         <button
//           onClick={() => handleDelete(item._id)}
//           className="
//           text-red-500
//           text-xl
//           "
//         >
//           🗑
//         </button>

//       </div>

//     ))}

//   </div>
// );
  
//   // return (
//   //   <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//   //     <div className="bg-[#03104C] w-[900px] max-h-[600px] overflow-y-auto rounded-xl p-6 relative">
//   //       {/* CLOSE BUTTON */}

//   //       <button
//   //         onClick={onClose}
//   //         className="absolute top-3 right-4 text-2xl font-bold text-white"
//   //       >
//   //         ✕
//   //       </button>

//   //       <h2 className="text-2xl font-semibold mb-6 text-white">
//   //         All Testimonials
//   //       </h2>

//   //       {testimonials.map((item) => (
//   //         <div
//   //           key={item._id}
//   //           className="border p-4 rounded-lg mb-4 flex items-center gap-4 border-white"
//   //         >
//   //           <img
//   //             src={`http://localhost:5000/uploads/${item.image}`}
//   //             className="w-20 h-20 object-cover rounded"
//   //           />

//   //           <div className="flex-1">
//   //             <h3 className="font-semibold">{item.name}</h3>

//   //             <p className="text-sm text-gray-300">{item.position}</p>
//   //           </div>

//   //           <button
//   //             onClick={() => handleDelete(item._id)}
//   //             className="bg-red-500 text-white px-4 py-2 rounded"
//   //           >
//   //             Delete
//   //           </button>
//   //         </div>
//   //       ))}
//   //     </div>
//   //   </div>
//   // );
// };

// export default ViewAllTestimonials;
