import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/partner/`);

      setPartners(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full py-8 lg:py-16">
      <div className="w-full px-4 lg:px-25 flex flex-col items-center gap-6 lg:gap-10">
        {/* Text */}
        <p className="text-[13px] lg:text-[16px] text-white text-center">
          Trusted by Industry’s Leading Organizations: Reliable. Equipped. Ahead
        </p>

        {/* Partner Logos */}
        {/* Partner Logos Moving */}
        <div className="w-full overflow-hidden">
          <div className="flex items-center gap-10 animate-scroll">

            {[...partners, ...partners].map((item, index) => (
              <div
                key={index}
                className="w-[80px] h-[34px] sm:w-[95px] sm:h-[40px] md:w-[110px] md:h-[46px] lg:w-[125px] lg:h-[53px] flex items-center justify-center flex-shrink-0"
              >
                <img
                  src={`${API_BASE_URL}/uploads/${item.logo}`}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}

          </div>
        </div>
        {/* <div className="w-full flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((item) => (
            <img
              key={item._id}
              src={`http://localhost:5000/uploads/${item.logo}`}
              alt={item.name}
              className="
        object-contain
        w-[80px] h-[34px]
        sm:w-[95px] sm:h-[40px]
        md:w-[110px] md:h-[46px]
        lg:w-[125px] lg:h-[53px]
        opacity-100
        transition-transform duration-300 hover:scale-110
      "
            />
          ))}
        </div> */}
        {/* <div className="w-full flex flex-wrap items-center justify-center gap-6 lg:gap-10 overflow-hidden">
          {partners.map((item) => (
            <img
              key={item._id}
              src={`http://localhost:5000/uploads/${item.logo}`}
              alt={item.name}
              className="object-contain h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default Partners;

// import react, { useState, useEffect } from "react";
// import axios from "axios";
// function Partners() {

//   return (
//     <section className="w-full py-8 lg:py-16">
//       <div className="w-full px-4 lg:px-25 flex flex-col items-center gap-6 lg:gap-10">
//         {/* Text */}
//         <p className="text-[13px] lg:text-[16px] text-white text-center">
//           Trusted by Industry’s Leading Organizations: Reliable. Equipped. Ahead
//         </p>

//         {/* Partner Logos */}
//         <div className="w-full flex flex-wrap items-center justify-center overflow-hidden">
//           <img
//             src="/Parnter.png"
//             alt="Our Partners"
//             className="object-contain max-w-full h-auto scale-90 lg:scale-100"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Partners;
