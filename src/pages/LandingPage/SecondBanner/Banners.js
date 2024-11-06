import React from "react";
import VectorTransparent from "../../../assets/icons/vectorTransparent.svg";

export const LeftBanner = ({ mediaUrl }) => {
  const isJustifyStart = mediaUrl.position === "justify-start";

  const svgPathData =
    "M-0.00012207 2344C103.209 2312.15 328.003 2207.11 628.749 1862.89C783.103 1686.19 925.207 1608.4 1039.14 1545.93C1108.96 1507.64 1169.3 1474.57 1220.44 1426.8C1293.94 1357.89 1331 1272.14 1331 1172C1331 1071.86 1293.64 985.803 1220.44 917.204C1169.3 869.43 1108.96 836.355 1039.14 798.075C925.207 735.601 783.103 657.814 628.749 481.111C328.003 136.892 103.209 31.8495 -0.00012207 0C-0.00012207 856.071 -0.00012207 1383.68 -0.00012207 2344Z";

  const svgMask = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1331 2344">
      <path d="${svgPathData}" fill="black"/>
    </svg>
  `;
  const encodedMask = `url('data:image/svg+xml;utf8,${encodeURIComponent(
    svgMask
  )}')`;

  return mediaUrl?.image ? (
    <div
      className={`absolute sm:block hidden overflow-hidden w-full h-auto sm:w-[1153px] lg:w-[1525.346px] sm:h-[727px] lg:h-[1348.935px]
        ${
          isJustifyStart &&
          "top-[-80px] sm:top-[-180px] left-[-540px] sm:left-[-440px] md:left-[-375px] lg:top-[-350px] lg:left-[-552px] xl:left-[-385px]"
        }
      `}
    >
      <svg
        viewBox="0 0 1331 2344"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <clipPath id="svgMask">
            <path
              d="M-0.00012207 2344C103.209 2312.15 328.003 2207.11 628.749 1862.89C783.103 1686.19 925.207 1608.4 1039.14 1545.93C1108.96 1507.64 1169.3 1474.57 1220.44 1426.8C1293.94 1357.89 1331 1272.14 1331 1172C1331 1071.86 1293.64 985.803 1220.44 917.204C1169.3 869.43 1108.96 836.355 1039.14 798.075C925.207 735.601 783.103 657.814 628.749 481.111C328.003 136.892 103.209 31.8495 -0.00012207 0C-0.00012207 856.071 -0.00012207 1383.68 -0.00012207 2344Z"
              fill="url(#paint0_linear_7012_626)"
            />
          </clipPath>
        </defs>

        <g clipPath="url(#svgMask)" style={{ WebkitClipPath: "url(#svgMask)" }}>
          {mediaUrl.image && (
            <>
              <image
                href={mediaUrl.image}
                preserveAspectRatio="xMidYMid slice"
                width="1331"
                height="2344"
                style={{
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  background: mediaUrl?.overlayColor,
                  position: "absolute",
                  opacity: 0.45,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </>
          )}
        </g>
      </svg>

      <img
        className="absolute top-0 left-0 rotate-90 sm:-rotate-180 sm:block hidden sm:w-[1153px] sm:h-[727px] lg:w-[1525.346px] lg:h-[1348.935px]"
        src={VectorTransparent}
      />
    </div>
  ) : (
    <div
      className={`absolute sm:block hidden overflow-hidden w-full h-auto sm:w-[1153px] lg:w-[1525.346px] sm:h-[727px] lg:h-[1348.935px]
      ${
        isJustifyStart &&
        "top-[-80px] sm:top-[-180px] left-[-540px] sm:left-[-440px] md:left-[-375px] lg:top-[-350px] lg:left-[-552px] xl:left-[-385px]"
      }
    `}
      style={{
        WebkitMaskImage: encodedMask,
        maskImage: encodedMask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        backgroundColor: "transparent",
      }}
    >
      {mediaUrl.video && (
        <>
          <video
            src={mediaUrl.video}
            autoPlay
            playsInline
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              background: mediaUrl?.overlayColor,
              position: "absolute",
              opacity: 0.45,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
        </>
      )}

      <img
        className="absolute top-0 left-0 rotate-90 sm:-rotate-180 sm:block hidden sm:w-[1153px] sm:h-[727px] lg:w-[1525.346px] lg:h-[1348.935px]"
        src={VectorTransparent}
      />
    </div>
  );
};

export const RightBanner = ({ mediaUrl }) => {
  const isJustifyEnd = mediaUrl.position === "justify-end";

  const svgPathData =
    "M-0.00012207 2344C103.209 2312.15 328.003 2207.11 628.749 1862.89C783.103 1686.19 925.207 1608.4 1039.14 1545.93C1108.96 1507.64 1169.3 1474.57 1220.44 1426.8C1293.94 1357.89 1331 1272.14 1331 1172C1331 1071.86 1293.64 985.803 1220.44 917.204C1169.3 869.43 1108.96 836.355 1039.14 798.075C925.207 735.601 783.103 657.814 628.749 481.111C328.003 136.892 103.209 31.8495 -0.00012207 0C-0.00012207 856.071 -0.00012207 1383.68 -0.00012207 2344Z";

  const svgMask = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1331 2344">
      <path d="${svgPathData}" fill="black"/>
    </svg>
  `;
  const encodedMask = `url('data:image/svg+xml;utf8,${encodeURIComponent(
    svgMask
  )}')`;

  return mediaUrl?.image ? (
    <div
      className={`absolute sm:block hidden overflow-hidden w-[1200px] h-[697px] sm:w-[1153px] lg:w-[1525.346px] sm:h-[727px] lg:h-[1348.935px]
        ${
          isJustifyEnd &&
          "rotate-90 sm:rotate-0 top-[-80px] overflow-hidden  sm:top-[-180px] right-[-540px] sm:right-[-550px] md:right-[-435px] lg:top-[-350px] lg:right-[-780px] xl:right-[-600px]"
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1349 1526"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <clipPath id="svgMask">
            <path d="M864.971 1525.35C797.898 1504.62 651.813 1436.26 456.368 1212.27C356.059 1097.28 263.71 1046.66 189.673 1006C144.294 981.093 105.086 959.569 71.8487 928.481C24.0822 883.641 -3.59467e-05 827.84 -3.3117e-05 762.673C-3.02873e-05 697.506 24.2812 641.507 71.8487 596.866C105.086 565.777 144.294 544.254 189.673 519.343C263.711 478.689 356.059 428.07 456.369 313.081C651.813 89.0823 797.899 20.7266 864.971 0.00068725L1348.93 3.80608e-05L1348.93 1525.35L864.971 1525.35Z" />
          </clipPath>
        </defs>

        <g clipPath="url(#svgMask)" style={{ WebkitClipPath: "url(#svgMask)" }}>
          <image
            href={mediaUrl.image}
            preserveAspectRatio="xMidYMid slice"
            width="1349"
            height="1526"
          />
          <div
            style={{
              background: mediaUrl?.overlayColor,
              position: "absolute",
              opacity: 0.45,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
        </g>
      </svg>
    </div>
  ) : (
    <div
      className={`absolute sm:block hidden overflow-hidden w-full h-auto sm:w-[1153px] lg:w-[1525.346px] sm:h-[727px] lg:h-[1348.935px]
        ${
          isJustifyEnd &&
          "top-[-80px] sm:top-[-180px] right-[-540px] sm:right-[-440px] md:right-[-375px] lg:top-[-350px] lg:right-[-552px] xl:right-[-385px]"
        }
      `}
      style={{
        WebkitMaskImage: encodedMask,
        maskImage: encodedMask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        backgroundColor: "transparent",
        rotate: "-180deg",
      }}
    >
      {mediaUrl?.video && (
        <>
          <video
            src={mediaUrl.video}
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              rotate: "180deg",
            }}
          />
          <div
            style={{
              background: mediaUrl?.overlayColor,
              position: "absolute",
              opacity: 0.45,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
        </>
      )}
      <img
        className="absolute top-0 right-0 rotate-90 sm:-rotate-180 sm:block hidden sm:w-[1153px] sm:h-[727px] lg:w-[1525.346px] lg:h-[1348.935px]"
        src={VectorTransparent}
        alt="Vector Decoration"
      />
    </div>
  );
};

export const MobileLeftVideoBanner = ({ videoUrl }) => {
  return (
    <div className="svg-container">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask
            id="videoMask"
            x="0"
            y="0"
            width="375"
            height="298"
            maskUnits="userSpaceOnUse"
          >
            <path
              d="M202.742 610.376C266.937 666.46 301.606 460.935 319.948 490.541L465 490.541C453.369 452.891 415.009 370.887 289.304 261.177C224.774 204.869 196.368 153.031 173.553 111.47C159.573 85.9979 147.495 63.9888 130.048 45.3314C104.885 18.5182 73.5706 4.99996 37 4.99996C0.429291 4.99997 -30.9969 18.63 -56.0484 45.3314C-73.4949 63.9888 -85.5733 85.9979 -99.5529 111.47C-122.368 153.031 -150.774 204.869 -215.304 261.177C-341.009 370.887 -379.369 452.891 -391 490.541L-245.947 490.541C-227.606 460.935 -192.937 666.46 -128.742 610.376C-46.5422 538.651 -33.7928 740.643 -8.96497 695.284C-2.36658 683.218 6.2449 667.465 12.1723 659.533C18.0996 667.577 26.5993 683.218 33.3095 695.284C58.1373 740.643 120.542 538.762 202.742 610.376Z"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <video
        src={videoUrl}
        autoPlay
        playsInline
        loop
        muted
        className="masked-video"
      ></video>

      <svg
        className="svg-overlay"
        width="375"
        height="298"
        viewBox="0 0 375 298"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-128.742 360.146C-192.937 416.052 -227.606 460.488 -245.948 490L-391 490C-379.369 452.469 -341.009 370.726 -215.304 261.364C-150.774 205.235 -122.368 153.561 -99.553 112.133C-85.5734 86.7409 -73.4949 64.8017 -56.0483 46.2034C-30.885 19.4754 0.429321 6 37 6C73.5707 6 104.997 19.5868 130.048 46.2034C147.495 64.8017 159.573 86.7409 173.553 112.133C196.368 153.561 224.774 205.235 289.304 261.364C415.009 370.726 453.369 452.469 465 490L319.947 490C301.606 460.488 266.937 416.052 202.742 360.146C120.542 288.649 82.9649 220.381 58.1371 175.166C51.5388 163.138 42.9274 147.436 37 139.529C31.0726 147.547 22.5729 163.138 15.8627 175.166C-8.96509 220.381 -46.5423 288.76 -128.742 360.146Z"
          fill="white"
          fillOpacity="0.54"
        />
        <path
          d="M464.664 489.752C452.93 452.13 414.461 370.578 289.142 261.551C224.675 205.477 196.24 153.843 173.439 112.44L173.336 112.252C159.353 86.8549 147.289 64.9443 129.868 46.3728C104.863 19.806 73.5023 6.24753 37 6.24753C0.497467 6.24753 -30.7517 19.6948 -55.8678 46.3728C-73.2894 64.9443 -85.3535 86.8549 -99.3362 112.252L-99.553 112.133L-99.3362 112.252L-99.4391 112.439C-122.24 153.842 -150.675 205.477 -215.142 261.551C-340.462 370.578 -378.93 452.13 -390.664 489.752L-246.085 489.752C-227.71 460.216 -193.03 415.806 -128.905 359.96L-128.742 360.146L-128.905 359.959C-46.7385 288.603 -9.17831 220.255 15.6457 175.047L15.6465 175.045C16.3521 173.781 17.0777 172.476 17.8181 171.145C24.1139 159.826 31.4865 146.571 36.801 139.382L36.9986 139.114L37.1981 139.38C43.1243 147.286 51.7184 162.951 58.3062 174.96L58.3541 175.047C83.1781 220.255 120.738 288.491 202.905 359.96L202.742 360.146L202.905 359.96C267.03 415.806 301.71 460.216 320.085 489.752L464.664 489.752ZM36.8467 139.737C31.5547 146.958 24.2718 160.052 18.034 171.266C17.2938 172.597 16.5684 173.901 15.8627 175.166L36.8467 139.737Z"
          stroke="white"
          strokeOpacity="0.08"
          strokeWidth="0.495054"
        />
      </svg>
    </div>
  );
};

export const MobileRightVideoBanner = ({ videoUrl }) => {
  return (
    <div className="svg-container">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask
            id="videoMask"
            x="0"
            y="0"
            width="375"
            height="298"
            maskUnits="userSpaceOnUse"
          >
            <path
              d="M172.258 610.376C108.064 666.46 73.3942 460.935 55.0529 490.541L-89.9995 490.541C-78.3684 452.891 -40.0085 370.887 85.6962 261.177C150.226 204.869 178.633 153.031 201.447 111.47C215.427 85.9979 227.506 63.9888 244.952 45.3314C270.115 18.5182 301.43 4.99996 338.001 4.99996C374.571 4.99997 405.997 18.63 431.049 45.3314C448.495 63.9888 460.574 85.9979 474.553 111.47C497.368 153.031 525.775 204.869 590.305 261.177C716.009 370.887 754.369 452.891 766 490.541L620.948 490.541C602.607 460.935 567.937 666.46 503.743 610.376C421.543 538.651 408.793 740.643 383.965 695.284C377.367 683.218 368.756 667.465 362.828 659.533C356.901 667.577 348.401 683.218 341.691 695.284C316.863 740.643 254.458 538.762 172.258 610.376Z"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <video
        src={videoUrl}
        autoPlay
        playsInline
        loop
        muted
        className="masked-video"
      ></video>

      <svg
        className="svg-overlay"
        width="375"
        height="298"
        viewBox="0 0 375 298"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M503.743 359.146C567.937 415.052 602.607 459.488 620.948 489L766 489C754.369 451.469 716.01 369.726 590.305 260.364C525.775 204.235 497.368 152.561 474.554 111.133C460.574 85.7409 448.495 63.8017 431.049 45.2034C405.886 18.4754 374.571 5 338 5C301.43 5 270.004 18.5868 244.952 45.2034C227.506 63.8017 215.427 85.7409 201.448 111.133C178.633 152.561 150.226 204.235 85.6963 260.364C-40.0084 369.726 -78.3685 451.469 -89.9995 489L55.0531 489C73.3943 459.488 108.064 415.052 172.258 359.146C254.458 287.649 292.036 219.381 316.863 174.166C323.462 162.138 332.073 146.436 338 138.529C343.928 146.547 352.428 162.138 359.138 174.166C383.966 219.381 421.543 287.76 503.743 359.146Z"
          fill="white"
          fillOpacity="0.54"
        />
        <path
          d="M-89.6633 488.752C-77.9295 451.13 -39.4609 369.578 85.8588 260.551C150.325 204.477 178.76 152.843 201.561 111.44L201.664 111.252C215.647 85.8549 227.711 63.9443 245.133 45.3728C270.137 18.806 301.498 5.24753 338 5.24753C374.503 5.24753 405.752 18.6948 430.868 45.3728C448.29 63.9443 460.354 85.8549 474.337 111.252L474.554 111.133L474.337 111.252L474.44 111.439C497.24 152.842 525.676 204.477 590.142 260.551C715.462 369.578 753.93 451.13 765.664 488.752L621.086 488.752C602.711 459.216 568.031 414.806 503.905 358.96L503.743 359.146L503.905 358.959C421.739 287.603 384.179 219.255 359.355 174.047L359.354 174.045C358.648 172.781 357.923 171.476 357.182 170.145C350.887 158.826 343.514 145.571 338.2 138.382L338.002 138.114L337.802 138.38C331.876 146.286 323.282 161.951 316.694 173.96L316.646 174.047C291.822 219.255 254.262 287.491 172.096 358.96L172.258 359.146L172.096 358.96C107.97 414.806 73.2906 459.216 54.9155 488.752L-89.6633 488.752ZM338.154 138.737C343.446 145.958 350.729 159.052 356.966 170.266C357.707 171.597 358.432 172.901 359.138 174.166L338.154 138.737Z"
          stroke="white"
          strokeOpacity="0.08"
          strokeWidth="0.495054"
        />
      </svg>
    </div>
  );
};
