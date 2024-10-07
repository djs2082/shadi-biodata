import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import _ from "lodash";
import "./index.scss";
import { useEffect, useRef, useState } from "react";

import BasicTemplate from "../BioDataTemplates/BasicTemplate";
import PrimaryButton from "../UtilComponents/Buttons/PrimaryButton";
import SecondaryButton from "../UtilComponents/Buttons/SecondaryButton";
import { FormDataFields, FormDataPreFilledFields } from "./formDataFields";
import { useSearchParams } from "react-router-dom";
import useBioDataFormViewModel from "./viewModel";
import TodaysCountShow from "./components/TodaysCountShow";
import FormGroup from "./components/FormGroup";
import AddImage from "./components/AddImage";

interface FormDataField {
  id: number;
  label: string;
  type: string;
  value: string;
  required: boolean;
  error?: boolean;
  errorText?: string;
}

interface FormDataFieldGorup {
  id: number;
  title: string;
  data: FormDataField[];
}

const BioDataForm = () => {
  const viewModel = useBioDataFormViewModel();

  const [params] = useSearchParams();
  const isDev = params.get("dev");

  const [fileName, setFileName] = useState<string>();

  const targetDevRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    viewModel.setTodaysBioDataCount();
    viewModel.updateBioDataDataForDev(isDev);
  }, []);

  const validateData = () => {
    if (!viewModel.validateData()) {
      // URL.revokeObjectURL(viewModel.getCroppedImage() || "");
      localStorage.setItem("biodataData", JSON.stringify(viewModel.getData()));
      downloadPdf();
    }
  };

  const downloadPdf = async () => {
    const blob = await pdf(
      <BasicTemplate
        data={viewModel.getData()}
        image={viewModel.getCroppedImage()}
      />
    ).toBlob();
    saveAs(blob, fileName);
    viewModel.setTodaysBioDataCount();
  };

  return (
    <div ref={targetDevRef} className="biodata-form-outer-wrapper">
      <TodaysCountShow />
      <div className="biodata-form-wrapper">
        <div className="biodata-fields-wrapper">
          <FormGroup />
          <div className="biodata-form-buttons-wrpper">
            <PrimaryButton
              onClick={(e) => {
                validateData();
              }}
            >
              Submit
            </PrimaryButton>
            <SecondaryButton onClick={(e) => viewModel.resetFormFields()}>
              Reset Form
            </SecondaryButton>
          </div>
        </div>
        <AddImage />
      </div>
    </div>
  );
};

export default BioDataForm;
