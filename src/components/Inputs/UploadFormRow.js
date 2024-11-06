// import {ReactComponent as UploadIcon} from "assets/icons/actions/upload-icon.svg";
import UploadIcon from "assets/icons/actions/upload.svg?react";
import tw, { css } from "twin.macro";
import React, { useRef, useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { BallTriangle } from "react-loading-icons";
import { useFormContext } from "react-hook-form";
import { validationMessageWithDefault } from "utils/validationErrorMessages";
import S3ImageWrapper from "components/Wrapper/S3ImageWrapper";
import dayjs from "dayjs";

const UploadFormRow = ({
  className,
  multiple = false,
  preview = false,
  children,
  onChange = () => {},
  register: registern = () => {},
  validations = {},
  required,
  name,
  label = "file",
  defaultImage = null,
  previewDefaultIcon = <UploadIcon />,
  immediateUpload = false,
  onUploadedFinished = () => {},
  previewSize = {
    width: "113px",
    height: "113px",
  },
  compact = false,
  onCancelFile = () => {},
}) => {
  const uploadInputRef = useRef();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploadIcon, setIsUploadIcon] = useState(false);

  const methods = useFormContext();

  const {
    register,
    setValue,
    getValues,
    resetField,
    formState: { isDirty, errors },
  } = methods || {
    register: registern,
    formState: { isDirty: false, errors: {} },
  };
  validations.required =
    typeof required !== "undefined" ? true : validations.required;

  const onHandleUploadChange = async (event) => {
    const files = event.target.files;

    setFiles(files);

    onChange(files);

    if (immediateUpload && [...files].length) {
      setLoading(true);

      let successUploadedFiles = [];
      let failUploadedFiles = [];

      for (const file of [...files]) {
        try {
          const result = await uploadData({
            key: `horse/${dayjs().unix()}-${file.name}`,
            data: file,
            options: {
              accessLevel: "guest", // defaults to `guest` but can be 'private' | 'protected' | 'guest',
            },
          }).result;

          successUploadedFiles.push({ ...result, file });
        } catch (error) {
          failUploadedFiles.push({ ...error, file });
        }
      }

      onUploadedFinished(successUploadedFiles, failUploadedFiles);
      setLoading(false);
      if (successUploadedFiles.length === 1) {
        setValue(name, successUploadedFiles[0]?.key);
      } else {
        setValue(name, [...successUploadedFiles.map((file) => file.key)]);
      }
      methods.trigger(name);
    } else if (![...files].length) {
      onCancelFile();
      resetField(name);
      setLoading(false);
      methods.trigger(name);
    }
  };

  return (
    <div
      onClick={() => uploadInputRef.current.click()}
      css={[styles]}
      className={`form-input ${className}`}
    >
      <input
        {...register(name, { ...validations })}
        onChange={onHandleUploadChange}
        name={name}
        className={"hidden"}
        type="file"
        ref={uploadInputRef}
        accept={"image/*"}
        multiple={multiple}
      />
      <div
        className={`form-input-upload flex gap-[24px] flex-wrap ${
          compact ? "flex-col items-end" : ""
        }`}
      >
        {preview && (
          <div
            css={[
              `width: ${previewSize?.width || previewSize};
              height: ${previewSize?.height || previewSize}`,
            ]}
            className={`form-input-upload__icon`}
          >
            {loading ? (
              <BallTriangle />
            ) : files.length || getValues(name) ? (
              children?.pictureThumbnail ? (
                children.pictureThumbnail
              ) : getValues(name) ? (
                <div
                  onMouseLeave={() => setIsUploadIcon(false)}
                  onMouseEnter={() => setIsUploadIcon(true)}
                >
                  <div className="horse-image">
                    <S3ImageWrapper
                      className="w-[113px] h-[113px]"
                      imgKey={getValues(name)}
                    ></S3ImageWrapper>
                  </div>
                  {isUploadIcon && (
                    <div className="overlay-icon">
                      <UploadIcon />
                    </div>
                  )}
                </div>
              ) : defaultImage ? (
                <div
                  onMouseLeave={() => setIsUploadIcon(false)}
                  onMouseEnter={() => setIsUploadIcon(true)}
                >
                  <div className="horse-image hover:bg-red-400">
                    <S3ImageWrapper
                      className="w-[113px] h-[113px]"
                      imgKey={getValues(name)}
                    ></S3ImageWrapper>
                  </div>
                  {isUploadIcon && (
                    <div className="overlay-icon">
                      <UploadIcon />
                    </div>
                  )}
                </div>
              ) : (
                previewDefaultIcon
              )
            ) : defaultImage ? (
              <div
                className="relative"
                onMouseEnter={() => setIsUploadIcon(true)}
                onMouseLeave={() => setIsUploadIcon(false)}
              >
                <S3ImageWrapper
                  className="w-[113px] h-[113px]"
                  imgKey={getValues(name)}
                ></S3ImageWrapper>
                {isUploadIcon && (
                  <div className="overlay-icon">
                    <UploadIcon />
                  </div>
                )}
              </div>
            ) : (
              previewDefaultIcon
            )}
          </div>
        )}
      </div>
      <div className="form-input-upload__text h-[61px] pt-[20px] self-end">
        <div className="form-input-upload-text flex flex-col">
          <div className="form-input-upload-text__header flex gap-[16px]">
            <h4>Change photo</h4>
          </div>
          <div className="form-input-upload-text__subtext w-[100px]">
            PNG, JPG, JPEG Max 5 MB
          </div>
        </div>
      </div>
      {errors[name] ? (
        <span css={[formInputErrors]} className={"form-input__error"}>
          {" "}
          {validationMessageWithDefault(errors[name], label.toLowerCase())}{" "}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

const styles = css`
  ${tw` rounded-[10px] cursor-pointer`}
  .form-input-upload * {
    font-family: Montserrat;
  }

  .form-input-upload__icon {
    ${tw`flex items-center rounded-[10px] justify-center`}
    background: var(--form-upload-color);
  
  

    > 
  }

  .form-input-upload-text__header h4 {
    color: var(--color-charcoal);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px; /* 100% */
  }

  .form-input-upload-text__subtext {
    color: var(--color-charcoal);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  }
`;

const formInputErrors = css`
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  color: var(--color-primary-danger);
  ${tw`mt-[16px] inline-block`}
`;

export default UploadFormRow;
