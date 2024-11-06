// @ts-ignore
import tw from "twin.macro";
import { ThreeDots } from "react-loading-icons";
import React from "react";
import pickBy from "lodash/pickBy";

const sizes = {
  xl: ["20px", "14px"],
};

export const Button = (props) =>
  (({
    onClick = () => {},
    className,
    AppendIcon,
    primary,
    primaryOutline,
    whiteOutline, // New prop
    lightGlow,
    transparent,
    children,
    disabled = false,
    size = "xl",
    type,
    loading = false,
    loadingColor
  } = props) => (
    <button
      {...pickBy(props, (v, k) => k.includes("attr-"))}
      type={type}
      onClick={onClick}
      className={className}
      disabled={loading || disabled}
      css={[
        tw`text-center hover:opacity-60 transition-opacity capitalize duration-200 flex items-center shrink-0 justify-around`,
        primary && tw`bg-primary`,
        !children && AppendIcon,
        transparent && tw`bg-transparent`,
        primaryOutline && tw`bg-transparent border-primary text-primary`,
        whiteOutline && tw`border-2 border-white text-white shadow-xl`, 
        lightGlow && `background: rgba(255, 255, 255, 0.16); border: none;`,
        sizes[size] && `font-size: ${sizes[size][0]};`,
        sizes[size] && `line-height: ${sizes[size][1]};`,
      ]}
    >
      <div css={[sizes[size] && children && `height: ${sizes[size][1]};`]}>
        {loading === true || loading?.loading === true ? (
          <ThreeDots
            fill={loadingColor || (primaryOutline ? "var(--color-primary)" : "white")}
            height={"100%"}
            width={"100%"}
          />
        ) : (
          <div className="flex">
            {AppendIcon && (
              <span
                className={"append-icon capitalize mr-[12px] lg:mr-[8px] inline-block"}
                css={[!children && tw`mr-0`]}
              >
                {typeof AppendIcon === "object" && !AppendIcon?.render ? (
                  AppendIcon
                ) : (
                  <AppendIcon />
                )}
              </span>
            )}
            {children}
          </div>
        )}
      </div>
    </button>
  ))(props);

export default Button;
