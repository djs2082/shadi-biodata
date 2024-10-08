import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import "./index.scss";
import { useEffect, useRef } from "react";

import BasicTemplate from "../BioDataTemplates/BasicTemplate";
import PrimaryButton from "../UtilComponents/Buttons/PrimaryButton";
import SecondaryButton from "../UtilComponents/Buttons/SecondaryButton";
import { useSearchParams } from "react-router-dom";
import useBioDataFormViewModel from "./viewModel";
import TodaysCountShow from "./components/TodaysCountShow";
import FormGroup from "./components/FormGroup";
import AddImage from "./components/AddImage";
import Media from "react-media";
import MobileAddImage from "./components/MobileAddImage";

const BioDataForm = () => {
  const viewModel = useBioDataFormViewModel();

  const [params] = useSearchParams();
  const isDev = params.get("dev");

  const targetDevRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    viewModel.setTodaysBioDataCount();
    viewModel.updateBioDataDataForDev(isDev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    saveAs(blob, viewModel.getDownloadFileName());
    viewModel.setTodaysBioDataCount();
  };

  return (
    <div ref={targetDevRef} className="biodata-form-outer-wrapper">
      <TodaysCountShow />
      <Media queries={{ mobile: "(max-width: 480px)" }}>
        {(matches) => <>{matches.mobile && <MobileAddImage />}</>}
      </Media>
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
        <Media queries={{ web: "(min-width: 480px)" }}>
          {(matches) => <>{matches.web && <AddImage />}</>}
        </Media>
      </div>
    </div>
  );
};

export default BioDataForm;
