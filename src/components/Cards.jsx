import Button from "../components/Button_x";
 
const Cards = ({ img, title, desc, location, buttonText = "Start Now" }) => {
  return (
    <div
      className="bg-[#0E1228] rounded-[30px] h-[550px] flex flex-col overflow-hidden shadow-lg
      transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03]
      hover:shadow-[0_20px_60px_rgba(41,52,228,0.35)]"
    >
      {/* Image */}
      {img && (
        <img
          src={img}
          alt={title}
          className="w-full h-[200px] object-cover"
        />
      )}
 
      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3 bg-[#0B0F1A]">
        {/* Location / Label */}
        {location && (
          <span className="font-inter font-normal text-[12px] leading-[22px] text-[#2934E4]">
            {location}
          </span>
        )}
 
        {/* Title */}
        <h3 className="font-gotham font-normal text-white text-[24px] lg:text-[28px] leading-[32px] lg:leading-[38px]">
          {title}
        </h3>
 
        {/* Description */}
        <p className="font-inter font-normal text-[14px] leading-[24px] text-white">
          {desc}
        </p>
 
        {/* Button */}
        <Button
          size="md"
          showArrow
          className="mt-auto w-fit bg-white text-black text-[14px] font-medium rounded-full px-[19px] py-[9px] transition"
          padding="12px 32px"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
 
export default Cards;
 



// import Button from "../components/Button_x";

// const Cards = ({ img, title, desc, location, buttonText = "Start Now" }) => {
//   return (
//     <div
//       className="bg-[#0E1228] rounded-[30px] h-[550px] flex flex-col overflow-hidden shadow-lg
//       transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03]
//       hover:shadow-[0_20px_60px_rgba(41,52,228,0.35)]"
//     >
//       {/* Image */}
//       {img && (
//         <img
//           src={img}
//           alt={title}
//           className="w-full h-[200px] object-cover"
//         />
//       )}

//       {/* Content */}
//       <div className="flex flex-col flex-1 p-6 gap-3 bg-[#0B0F1A]">
//         {/* Location / Label */}
//         {location && (
//           <span className="font-inter font-normal text-[12px] leading-[22px] text-[#2934E4]">
//             {location}
//           </span>
//         )}

//         {/* Title */}
//         <h3 className="font-gotham font-normal text-white text-[24px] lg:text-[28px] leading-[32px] lg:leading-[38px]">
//           {title}
//         </h3>

//         {/* Description */}
//         <p className="font-inter font-normal text-[14px] leading-[24px] text-white">
//           {desc}
//         </p>

//         {/* Button */}
//           <Button
//             size="md"
//             showArrow
//             className="mt-4 w-fit bg-white text-black text-[14px] font-medium rounded-full py-[9px] transition"
//             padding="12px 32px"
//           >
//           {buttonText}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Cards;
