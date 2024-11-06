// import React, { createContext, useContext, useState } from "react";

// const UploadContext = createContext();

// const UploadProvider = ({ children }) => {
//   const [image, setImage] = useState(null);
//   const [imageCropFinished, setImageCropFinished] = useState(false);
//   const [imageResult, setImageResult] = useState(null);
//   const [imageName, setImageName] = useState("");

//   return (
//     <UploadContext.Provider
//       value={{
//         image,
//         imageCropFinished,
//         setImage,
//         setImageCropFinished,
//         imageResult, setImageResult,
//         setImageName, imageName
//       }}
//     >
//       {children}
//     </UploadContext.Provider>
//   );
// };
// const useUploadContext = () => {
//   const context = useContext(UploadContext);
//   if (!context) {
//     throw new Error("useUploadContext must be used within a UploadProvider");
//   }
//   return context;
// };
// export { UploadProvider, useUploadContext };

import React, { createContext, useContext, useState } from "react";

const UploadContext = createContext();

const UploadProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [imageCropFinished, setImageCropFinished] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [imageName, setImageName] = useState("");
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [countryState, setCountryState] = useState("");
  const [countryCity, setCountryCity] = useState("");
  const [countryZipcode, setCountryZipcode] = useState("");

  return (
    <UploadContext.Provider
      value={{
        image,
        imageCropFinished,
        setImage,
        countryState,
        setCountryState,
        countryCity,
        setCountryCity,
        countryZipcode,
        setCountryZipcode,
        placeAutocomplete,
        setPlaceAutocomplete,
        setImageCropFinished,
        imageResult,
        setImageResult,
        setImageName,
        imageName
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within a UploadProvider");
  }
  return context;
};
export { UploadProvider, useUploadContext };
