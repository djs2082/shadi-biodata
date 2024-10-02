import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import BasicTemplate from "./BasicTemplate";

const TemplatesSandBox = () => {
  const { template_name } = useParams();



  const getTemplateComponent = () => {
    switch (template_name) {
      case 'basic_template':
        return <BasicTemplate />;
      default:
        <></>

    }
  }
  return (
    <PDFViewer style={{ width: '100%', height: '842px' }}>
      {getTemplateComponent()}
    </PDFViewer>
  );
};

export default TemplatesSandBox;
