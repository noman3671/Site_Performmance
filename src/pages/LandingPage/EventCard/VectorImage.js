// import React from "react";

// function VectorImage({ imageUrl, style }) {
//   return (
//     <div className="relative overflow-hidden !left-[-30%] sm:!left-[-40%] md:!left-[-35%] lg:!left-[-40%] xl:!left-[-15%] 2xl:!left-[-160px]  w-auto top-[-60px] md:top-[-100px] xl:top-[-800px] !h-[356.084px] md:!h-[642.391px] xl:!h-[2495px] object-cover">
//       {/* Background Image Layer */}
//       <img
//         src={imageUrl}
//         alt="background"
//         className="absolute top-0 left-0 w-[200%] h-full object-cover"
//         style={{
//           ...style,
//           zIndex: -2,
//           clipPath:
//             window.innerWidth < 1280
//               ? "inset(0 0 22.10% 0)"
//               : window.innerWidth < 768
//               ? "inset(0 0 69% 0)"
//               : "inset(0 0 32.15% 0)",
//         }}
//       />

//       {/* SVG Masked Layer */}
//       <svg
//         className={`absolute top-0 left-0 w-full h-full object-cover`}
//         viewBox={`${
//           window.innerWidth < 1600 ? "0 0 957 2495" : "0 0 100% 100%"
//         }`}
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ zIndex: 1 }}
//       >
//         <defs>
//           <clipPath id="clip-shape">
//             <path d="M-63.7316 1730.59C-224.866 1917.7 -352.939 2018.75 -438 2072.21L-438 2495C-329.828 2461.1 -94.2252 2349.29 220.982 1982.9C382.758 1794.81 531.695 1712.01 651.102 1645.51C724.286 1604.77 787.52 1569.56 841.125 1518.71C918.161 1445.37 957 1354.09 957 1247.5C957 1140.91 917.84 1049.31 841.124 976.29C787.52 925.438 724.286 890.233 651.102 849.487C531.695 782.988 382.758 700.191 220.982 512.104C-94.2253 145.71 -329.828 33.9013 -438 5.98577e-05L-438 422.788C-352.939 476.247 -224.866 577.299 -63.7316 764.408C142.341 1004 -438 1041.16 -307.68 1113.52C-273.014 1132.76 -227.755 1157.86 -204.965 1175.13C-228.076 1192.41 -273.014 1217.18 -307.68 1236.74C-438 1309.11 142.02 1491 -63.7316 1730.59Z" />
//           </clipPath>
//         </defs>

//         <image
//           href={imageUrl}
//           style={style}
//           x="0"
//           y="0"
//           width="100%"
//           height="100%"
//           clipPath="url(#clip-shape)"
//           preserveAspectRatio="xMidYMid slice"
//         />

//         <g filter="url(#filter0_b_5488_10409)">
//           <path
//             d="M-63.7316 1730.59C-224.866 1917.7 -352.939 2018.75 -438 2072.21L-438 2495C-329.828 2461.1 -94.2252 2349.29 220.982 1982.9C382.758 1794.81 531.695 1712.01 651.102 1645.51C724.286 1604.77 787.52 1569.56 841.125 1518.71C918.161 1445.37 957 1354.09 957 1247.5C957 1140.91 917.84 1049.31 841.124 976.29C787.52 925.438 724.286 890.233 651.102 849.487C531.695 782.988 382.758 700.191 220.982 512.104C-94.2253 145.71 -329.828 33.9013 -438 5.98577e-05L-438 422.788C-352.939 476.247 -224.866 577.299 -63.7316 764.408C142.341 1004 -438 1041.16 -307.68 1113.52C-273.014 1132.76 -227.755 1157.86 -204.965 1175.13C-228.076 1192.41 -273.014 1217.18 -307.68 1236.74C-438 1309.11 142.02 1491 -63.7316 1730.59Z"
//             fill="#F7F7F6"
//             fillOpacity="0.05"
//           />
//         </g>

//         <defs>
//           <filter
//             id="filter0_b_5488_10409"
//             x="-690.3"
//             y="-252.3"
//             width="1899.6"
//             height="2999.6"
//             filterUnits="userSpaceOnUse"
//             colorInterpolationFilters="sRGB"
//           >
//             <feFlood floodOpacity="0" result="BackgroundImageFix" />
//             <feGaussianBlur in="BackgroundImageFix" stdDeviation="126.15" />
//             <feComposite
//               in2="SourceAlpha"
//               operator="in"
//               result="effect1_backgroundBlur_5488_10409"
//             />
//             <feBlend
//               mode="normal"
//               in="SourceGraphic"
//               in2="effect1_backgroundBlur_5488_10409"
//               result="shape"
//             />
//           </filter>
//         </defs>
//       </svg>
//     </div>
//   );
// }

// export default VectorImage;

// // import React, { useState, useEffect } from "react";

// // function VectorImage({ imageUrl, style }) {
// //   const [state, setState] = useState({
// //     left: "-10px",
// //     width: "100%",
// //     height: "100%",
// //     viewBox: "0 0 100% 100%",
// //   });

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth > 320) {
// //         setState((prevState) => ({
// //           ...prevState,
// //           left: "-10px",
// //           width: "957px",
// //           height: "2495px",
// //           viewBox: "0 0 957 2495",
// //         }));
// //       }
// //       else if (window.innerWidth < 540) {
// //         setState((prevState) => ({
// //           ...prevState,
// //           left: "-20px",
// //           width: "957px",
// //           height: "2495px",
// //           viewBox: "0 0 957 2495",
// //         }));
// //       } else if (window.innerWidth < 690) {
// //         setState((prevState) => ({
// //           ...prevState,
// //           left: "-50px",
// //           width: "957px",
// //           height: "2495px",
// //           viewBox: "0 0 957 2495",
// //         }));
// //       } else if (window.innerWidth < 768) {
// //         setState((prevState) => ({
// //           ...prevState,
// //           left: "-70px",
// //           width: "957px",
// //           height: "2495px",
// //           viewBox: "0 0 957 2495",
// //         }));
// //       } else if (window.innerWidth < 1280) {
// //         setState({
// //           left: "-150px",
// //           width: "957px",
// //           height: "2495px",
// //           viewBox: "0 0 957 2495",
// //         });
// //       } else if (window.innerWidth < 1400) {
// //         setState({
// //           left: "-150px",
// //           width: "957px",
// //           height: "2495px",
// //           viewBox: "0 0 957 2495",
// //         });
// //       } else if (window.innerWidth < 1600) {
// //         setState({
// //           left: "-150px",
// //           width: "957px",
// //           height: "2495px",
// //           viewBox: "0 0 957 2495",
// //         });
// //       } else {
// //         setState({
// //           left: "-160px",
// //           width: "100%",
// //           height: "100%",
// //           viewBox: "0 0 100% 100%",
// //         });
// //       }
// //     };

// //     handleResize(); // Set initial state
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   return (
// //     <div
// //       className={`relative overflow-hidden w-auto  top-[-60px] md:top-[-100px] xl:top-[-800px] h-[356.084px] md:h-[642.391px] xl:h-[2495px] object-cover`}
// //       style={{ left: state.left }}
// //     >
// //       {/* Background Image Layer */}
// //       <img
// //         src={imageUrl}
// //         alt="background"
// //         className="absolute top-0 left-0 w-full h-full object-cover"
// //         style={{
// //           ...style,
// //           zIndex: -2,
// //           objectFit: "cover",
// //           clipPath:
// //             window.innerWidth < 1280
// //               ? "inset(0 0 22.10% 0)"
// //               : window.innerWidth < 768
// //               ? "inset(0 0 69% 0)"
// //               : "inset(0 0 32.15% 0)",
// //         }}
// //       />

// //       {/* SVG Masked Layer */}
// //       <svg
// //         className="absolute top-0 left-0 w-[52%] md:w-full h-full object-cover"
// //         width={state.width}
// //         height={state.height}
// //         viewBox={state.viewBox}
// //         fill="none"
// //         xmlns="http://www.w3.org/2000/svg"
// //         style={{ zIndex: 1 }}
// //       >
// //         <defs>
// //           <clipPath id="clip-shape">
// //             <path d="M-63.7316 1730.59C-224.866 1917.7 -352.939 2018.75 -438 2072.21L-438 2495C-329.828 2461.1 -94.2252 2349.29 220.982 1982.9C382.758 1794.81 531.695 1712.01 651.102 1645.51C724.286 1604.77 787.52 1569.56 841.125 1518.71C918.161 1445.37 957 1354.09 957 1247.5C957 1140.91 917.84 1049.31 841.124 976.29C787.52 925.438 724.286 890.233 651.102 849.487C531.695 782.988 382.758 700.191 220.982 512.104C-94.2253 145.71 -329.828 33.9013 -438 5.98577e-05L-438 422.788C-352.939 476.247 -224.866 577.299 -63.7316 764.408C142.341 1004 -438 1041.16 -307.68 1113.52C-273.014 1132.76 -227.755 1157.86 -204.965 1175.13C-228.076 1192.41 -273.014 1217.18 -307.68 1236.74C-438 1309.11 142.02 1491 -63.7316 1730.59Z" />
// //           </clipPath>
// //         </defs>

// //         <image
// //           href={imageUrl}
// //           style={style}
// //           x="0"
// //           y="0"
// //           width="100%"
// //           height="100%"
// //           clipPath="url(#clip-shape)"
// //           preserveAspectRatio="xMidYMid slice"
// //         />

// //         <g filter="url(#filter0_b_5488_10409)">
// //           <path
// //             d="M-63.7316 1730.59C-224.866 1917.7 -352.939 2018.75 -438 2072.21L-438 2495C-329.828 2461.1 -94.2252 2349.29 220.982 1982.9C382.758 1794.81 531.695 1712.01 651.102 1645.51C724.286 1604.77 787.52 1569.56 841.125 1518.71C918.161 1445.37 957 1354.09 957 1247.5C957 1140.91 917.84 1049.31 841.124 976.29C787.52 925.438 724.286 890.233 651.102 849.487C531.695 782.988 382.758 700.191 220.982 512.104C-94.2253 145.71 -329.828 33.9013 -438 5.98577e-05L-438 422.788C-352.939 476.247 -224.866 577.299 -63.7316 764.408C142.341 1004 -438 1041.16 -307.68 1113.52C-273.014 1132.76 -227.755 1157.86 -204.965 1175.13C-228.076 1192.41 -273.014 1217.18 -307.68 1236.74C-438 1309.11 142.02 1491 -63.7316 1730.59Z"
// //             fill="#F7F7F6"
// //             fillOpacity="0.05"
// //           />
// //         </g>

// //         <defs>
// //           <filter
// //             id="filter0_b_5488_10409"
// //             x="-690.3"
// //             y="-252.3"
// //             width="1899.6"
// //             height="2999.6"
// //             filterUnits="userSpaceOnUse"
// //             colorInterpolationFilters="sRGB"
// //           >
// //             <feFlood floodOpacity="0" result="BackgroundImageFix" />
// //             <feGaussianBlur in="BackgroundImageFix" stdDeviation="126.15" />
// //             <feComposite
// //               in2="SourceAlpha"
// //               operator="in"
// //               result="effect1_backgroundBlur_5488_10409"
// //             />
// //             <feBlend
// //               mode="normal"
// //               in="SourceGraphic"
// //               in2="effect1_backgroundBlur_5488_10409"
// //               result="shape"
// //             />
// //           </filter>
// //         </defs>
// //       </svg>
// //     </div>
// //   );
// // }

// // export default VectorImage;


import React from "react";

function VectorImage({ imageUrl, style }) {
  return (
    <svg
      className={`absolute !left-[-10px] xl:!left-[0px] w-auto top-[-60px] md:top-[-100px] xl:top-[-180px]  2xl:!left-[0px] !h-[356.084px] md:!h-[642.391px] xl:!h-[1206.325px] object-cover`}
      width="957"
      height="2495"
      viewBox="0 0 957 2495"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip-shape">
          <path d="M-63.7316 1730.59C-224.866 1917.7 -352.939 2018.75 -438 2072.21L-438 2495C-329.828 2461.1 -94.2252 2349.29 220.982 1982.9C382.758 1794.81 531.695 1712.01 651.102 1645.51C724.286 1604.77 787.52 1569.56 841.125 1518.71C918.161 1445.37 957 1354.09 957 1247.5C957 1140.91 917.84 1049.31 841.124 976.29C787.52 925.438 724.286 890.233 651.102 849.487C531.695 782.988 382.758 700.191 220.982 512.104C-94.2253 145.71 -329.828 33.9013 -438 5.98577e-05L-438 422.788C-352.939 476.247 -224.866 577.299 -63.7316 764.408C142.341 1004 -438 1041.16 -307.68 1113.52C-273.014 1132.76 -227.755 1157.86 -204.965 1175.13C-228.076 1192.41 -273.014 1217.18 -307.68 1236.74C-438 1309.11 142.02 1491 -63.7316 1730.59Z" />
        </clipPath>
      </defs>

      <image
        href={imageUrl}
        style={style}
        x="0"
        y="0"
        width="100%"
        height="100%"
        clip-path="url(#clip-shape)"
        preserveAspectRatio="xMidYMid slice"
      />

      <g filter="url(#filter0_b_5488_10409)">
        <path
          d="M-63.7316 1730.59C-224.866 1917.7 -352.939 2018.75 -438 2072.21L-438 2495C-329.828 2461.1 -94.2252 2349.29 220.982 1982.9C382.758 1794.81 531.695 1712.01 651.102 1645.51C724.286 1604.77 787.52 1569.56 841.125 1518.71C918.161 1445.37 957 1354.09 957 1247.5C957 1140.91 917.84 1049.31 841.124 976.29C787.52 925.438 724.286 890.233 651.102 849.487C531.695 782.988 382.758 700.191 220.982 512.104C-94.2253 145.71 -329.828 33.9013 -438 5.98577e-05L-438 422.788C-352.939 476.247 -224.866 577.299 -63.7316 764.408C142.341 1004 -438 1041.16 -307.68 1113.52C-273.014 1132.76 -227.755 1157.86 -204.965 1175.13C-228.076 1192.41 -273.014 1217.18 -307.68 1236.74C-438 1309.11 142.02 1491 -63.7316 1730.59Z"
          fill="#F7F7F6"
          fill-opacity="0.05"
        />
      </g>

      <defs>
        <filter
          id="filter0_b_5488_10409"
          x="-690.3"
          y="-252.3"
          width="1899.6"
          height="2999.6"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="126.15" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_5488_10409"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_5488_10409"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default VectorImage;