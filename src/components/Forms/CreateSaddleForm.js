import { FormInput } from "components/Inputs";
import { FormProvider, useForm } from "react-hook-form";
import {
  Condition,
  Fleece,
  SaddleStatus,
  NewOrUsed,
  RiggingType,
  SaddleType,
  SeatMaterial,
  TreeType,
} from "API.ts";
import { Grid } from "@aws-amplify/ui-react";
import ToggleButtonBase from "components/Common/ToggleButtonBase";
import DatePicker from "components/DatePicker/DatePicker";
import { BooleanYesNo, generateEnumItems } from "types/BaseTypes.ts";
import UploadFormRow from "components/Inputs/UploadFormRow";
import { TextArea } from "components/Inputs/TextArea";
import { FaDollarSign } from "react-icons/fa";
import Button from "components/Buttons";
import { useActionsContext } from "context/ActionsContext";
import { createSaddle, updateSaddle } from "services/saddles.ts";
import { css } from "twin.macro";
import moment from "moment";
import { UploadSaddleIcon } from "components/Icons";
import { useNavigate } from "react-router-dom-middleware";
import pickBy from "lodash/pickBy";

const defaultObject = {
  type: SaddleType.WESTERN,
  material: SeatMaterial.GEL,
  // is this should be seat material?
  price: "",
  brandName: "",
  // brand name not found in figma
  size: "",
  color: "",
  model: "",
  // not found in figma
  // status: SaddleStatus.SCAN,
  condition: null,
  yearOfManufacture: "",
  // not found in figma
  maker: null,
  // is this should be brand name
  makerLocation: null,
  finishedSeatSize: null,
  newOrUsed: null,
  serialNumber: null,
  amountOfTooling: null,
  unTooledPortionsTexture: null,
  typeOfTooling: null,
  weight: null,
  skirtLength: null,
  treeType: null,
  treeWarranty: null,
  gulletWidth: null,
  swellWidth: null,
  cantleHeight: null,
  finishedHornHeight: null,
  hornCapWidth: null,
  riggingType: null,
  fleece: null,
  fendersLeathersCutLength: null,
  cantle: null,
  conchoType: null,
  hardwareType: null,
  strings: null,
  stirrups: null,
  frontCinch: null,
  frontBilletLatigo: null,
  rearCinch: null,
  backBilletLatigo: null,
  style: null,
  gullet: null,
  saddleFitNumber: null,
  photo: null,
  description: null,
  availability: null,
};
// const defaultObject = {
//     "type": "OTHER",
//     "material": "PADDED",
//     "price": "",
//     "brandName": "",
//     "size": "",
//     "color": "",
//     "model": "",
//     "condition": "GOOD",
//     "yearOfManufacture": "2024-01-02T20:00:00.000Z",
//     "maker": "Maker",
//     "makerLocation": "Maker location",
//     "finishedSeatSize": "14",
//     "newOrUsed": "USED",
//     "serialNumber": "3252492",
//     "amountOfTooling": "3",
//     "unTooledPortionsTexture": "Texture of Un-tooled Portions",
//     "typeOfTooling": "Type of tooling",
//     "weight": "50",
//     "skirtLength": "33",
//     "treeType": "OTHER",
//     "treeWarranty": "Tree warranty",
//     "gulletWidth": "30",
//     "swellWidth": "30",
//     "cantleHeight": "30",
//     "finishedHornHeight": "60",
//     "hornCapWidth": "60",
//     "riggingType": "FULL",
//     "fleece": "SYNTHETIC",
//     "fendersLeathersCutLength": "true",
//     "cantle": "Cantle",
//     "conchoType": "Concho type / Description",
//     "hardwareType": "Hardware Type / Maker",
//     "strings": "Strings",
//     "stirrups": "Stirrups",
//     "frontCinch": "true",
//     "frontBilletLatigo": "Front billet/Latigo",
//     "rearCinch": "true",
//     "backBilletLatigo": "Back billet/Latigo",
//     "style": null,
//     "gullet": null,
//     "saddleFitNumber": null,
//     "photo": null,
//     "description": null,
//     "availability": null
// }
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ saddle = null }) => {
  const methods = useForm({
    defaultValues: saddle
      ? pickBy(saddle, (v, k) => typeof defaultObject[k] !== "undefined")
      : defaultObject,
  });

  const navigate = useNavigate();

  const { actionState, changeActionState } = useActionsContext();

  const { creatingSaddle = false } = actionState;

  const onSubmit = async (data) => {
    changeActionState({ creatingSaddle: true });
    if (saddle) {
      let updatedObj = {
        ...data,
        id: saddle.id,
      };

      await updateSaddle({
        ...updatedObj,
        yearOfManufacture: moment(updatedObj.yearOfManufacture).format("yyyy"),
      })
        .then((response) => {})
        .catch((error) => {
          alert("Error while updating saddle");
        });
    } else {
      await createSaddle({
        ...data,
        yearOfManufacture: moment(data.yearOfManufacture).format("yyyy"),
      })
        .then((response) => {
          navigate("/dashboard/sale");
        })
        .catch((error) => {
          alert("Error while creating saddle");
        });
    }
    changeActionState({ creatingSaddle: false });
    navigate("/dashboard/sale");
  };

  return (
    <div css={[styles]} className={"create-saddle-form-fields flex flex-col"}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            columnGap="30px"
            width={"100%"}
            templateColumns="repeat(3, auto)"
          >
            <div className="flex flex-col gap-[24px]">
              <FormInput
                className="create-saddle-form-fields__field"
                name="maker"
                label={"Maker"}
                placeholder={"Enter maker"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="makerLocation"
                label={"Saddle maker location"}
                placeholder={"Marker location"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="finishedSeatSize"
                validations={{ isNumber: true }}
                label={"Finished Seat size"}
                placeholder={"Enter size (inches)"}
                required
              ></FormInput>
              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="type"
                label={"Type of saddle"}
                required
                items={generateEnumItems(SaddleType)}
              ></ToggleButtonBase>

              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="newOrUsed"
                label={"New or used"}
                required
                items={generateEnumItems(NewOrUsed)}
              ></ToggleButtonBase>

              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="condition"
                label={"Condition rating"}
                required
                items={generateEnumItems(Condition)}
              ></ToggleButtonBase>
              <DatePicker
                className="create-saddle-form-fields__field"
                name="yearOfManufacture"
                showYearPicker
                label={"Year made"}
                placeholder={"Enter year"}
                dateFormat={"yyyy"}
                required
              ></DatePicker>

              <FormInput
                className="create-saddle-form-fields__field"
                name="serialNumber"
                label={"Serial number"}
                placeholder={"Enter serial number"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="amountOfTooling"
                label={"Amount of tooling"}
                placeholder={"Enter tooling amount"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="unTooledPortionsTexture"
                label={"Texture of Un-tooled Portions"}
                placeholder={"Enter texture"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="typeOfTooling"
                label={"Type of tooling"}
                placeholder={"Enter tooling type"}
                required
              ></FormInput>
              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="material"
                label={"Seat type"}
                required
                items={generateEnumItems(SeatMaterial)}
              ></ToggleButtonBase>
            </div>

            <div className="flex flex-col gap-[24px]">
              <FormInput
                className="create-saddle-form-fields__field"
                name="weight"
                validations={{ isNumber: true }}
                label={"Weight"}
                placeholder={"Enter weight"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="skirtLength"
                validations={{ isNumber: true }}
                label={"Skirt length (Front to back)"}
                placeholder={"Enter length"}
                required
              ></FormInput>
              {/*{Tree construction}*/}
              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="treeType"
                items={generateEnumItems(TreeType)}
                label={"Tree type"}
                required
              ></ToggleButtonBase>

              <FormInput
                className="create-saddle-form-fields__field"
                name="treeWarranty"
                label={"Tree warranty"}
                placeholder={"Enter warranty"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="gulletWidth"
                validations={{ isNumber: true }}
                label={"Gullet Width"}
                placeholder={"Enter width (inches)"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="swellWidth"
                validations={{ isNumber: true }}
                label={"Swell Width"}
                placeholder={"Enter width (inches)"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="cantleHeight"
                validations={{ isNumber: true }}
                label={"Cantle height"}
                placeholder={"Enter height (inches)"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="finishedHornHeight"
                validations={{ isNumber: true }}
                label={"Finished Horn Height"}
                placeholder={"Enter height (inches)"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="hornCapWidth"
                validations={{ isNumber: true }}
                label={"Horn Cap Width"}
                placeholder={"Enter width (inches)"}
                required
              ></FormInput>
              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="riggingType"
                items={generateEnumItems(RiggingType)}
                label={"Rigging type"}
                required
              ></ToggleButtonBase>

              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="fleece"
                label={"Fleece"}
                items={generateEnumItems(Fleece)}
                required
              ></ToggleButtonBase>
            </div>

            <div className="flex flex-col gap-[24px]">
              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="fendersLeathersCutLength"
                label={"Fenders/Leathers Cut from Original Length"}
                items={generateEnumItems(BooleanYesNo)}
                required
              ></ToggleButtonBase>
              <FormInput
                className="create-saddle-form-fields__field"
                name="cantle"
                validations={{ isNumber: true }}
                label={"Cantle"}
                placeholder={"Enter cantle measurement (inches)"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="conchoType"
                label={"Concho type / Description"}
                placeholder={"Enter concho type/description"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="hardwareType"
                label={"Hardware Type / Maker"}
                placeholder={"Enter hardware type/maker"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="strings"
                label={"Strings"}
                placeholder={"Enter strings"}
                required
              ></FormInput>
              <FormInput
                className="create-saddle-form-fields__field"
                name="stirrups"
                label={"Stirrups"}
                placeholder={"Enter stirrups detail"}
                required
              ></FormInput>
              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="frontCinch"
                label={"Front Cinch"}
                items={generateEnumItems(BooleanYesNo)}
                required
              ></ToggleButtonBase>
              <FormInput
                className="create-saddle-form-fields__field"
                name="frontBilletLatigo"
                label={"Front billet/Latigo"}
                placeholder={"Enter details"}
                required
              ></FormInput>
              <ToggleButtonBase
                className="create-saddle-form-fields__field"
                name="rearCinch"
                label={"Real cinch"}
                items={generateEnumItems(BooleanYesNo)}
                required
              ></ToggleButtonBase>
              <FormInput
                className="create-saddle-form-fields__field"
                name="backBilletLatigo"
                label={"Back billet/Latigo"}
                placeholder={"Enter details"}
                required
              ></FormInput>
            </div>
          </Grid>
          <div className="create-saddle-form-fields__main-form mt-[51px] p-[48px] rounded-[31px] bg-primaryLight">
            <Grid
              columnGap="30px"
              width={"100%"}
              templateColumns="repeat(3, 1fr)"
            >
              <div className="flex flex-col gap-[24px]">
                <FormInput
                  className="create-saddle-form-fields__field"
                  name="brandName"
                  label={"Brand"}
                  placeholder={"Scott Thomas"}
                  required
                ></FormInput>
                <FormInput
                  className="create-saddle-form-fields__field"
                  name="color"
                  label={"Color"}
                  placeholder={"Enter color"}
                  required
                ></FormInput>
                <FormInput
                  className="create-saddle-form-fields__field"
                  name="model"
                  label={"Model"}
                  placeholder={"Enter model"}
                  required
                ></FormInput>
                <FormInput
                  className="create-saddle-form-fields__field"
                  name="price"
                  label={"Cost"}
                  placeholder={"Enter price"}
                  prefixIcon={<FaDollarSign />}
                  validations={{ isNumber: true }}
                  required
                ></FormInput>
              </div>

              <div className="flex flex-col gap-[24px]">
                <FormInput
                  className="create-saddle-form-fields__field"
                  name="style"
                  label={"Style"}
                  placeholder={"Western"}
                  required
                ></FormInput>
                <FormInput
                  className="create-saddle-form-fields__field"
                  name="size"
                  validations={{ isNumber: true }}
                  label={"Size"}
                  placeholder={"14"}
                  required
                ></FormInput>
                <div className="flex gap-[20px]">
                  <FormInput
                    className="create-saddle-form-fields__field"
                    name="gullet"
                    validations={{ isNumber: true }}
                    label={"Gullet"}
                    placeholder={"Guller inch"}
                    required
                  ></FormInput>
                  <FormInput
                    className="create-saddle-form-fields__field"
                    name="saddleFitNumber"
                    label={"Saddle fit number"}
                    placeholder={"8"}
                    validations={{ isNumber: true }}
                    required
                  ></FormInput>
                </div>
                <UploadFormRow
                  preview={true}
                  previewSize={"66px"}
                  name="photo"
                  label={"Photo"}
                  className={"create-account-form-fields__field"}
                  previewDefaultIcon={
                    <UploadSaddleIcon
                      viewBox={{ width: "30px", height: "30px" }}
                    />
                  }
                  immediateUpload
                ></UploadFormRow>
              </div>
              <div className="flex flex-col gap-[24px]">
                <TextArea
                  className="create-saddle-form-fields__field h-full"
                  name="description"
                  label={"Description"}
                  placeholder={"Enter description"}
                  required
                ></TextArea>
              </div>

              {/*<FormInput className="create-saddle-form-fields__field" name="availability"*/}
              {/*           label={'LABEL NAME'} placeholder={'Enter availability'}*/}
              {/*           required></FormInput>*/}
            </Grid>
            <div className="flex mt-[58px] justify-center">
              <Button
                loading={creatingSaddle}
                whiteOutline
                type="submit"
                className={"w-[200px]"}
                primary
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const styles = css`
  .form-toggle-button:not(:first-child) {
    margin-top: 16px;
  }
`;
