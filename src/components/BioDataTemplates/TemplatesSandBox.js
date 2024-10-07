import { useScrollTrigger } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageFromDB } from "../../services/indexedDB";
import BasicTemplate from "./BasicTemplate";
import Data from "./data";

const TemplatesSandBox = () => {
  const { template_name } = useParams();
  const [croppedImage, setCroppedImage] = useState();

  const resizeImage = (imageBlob, width, height) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(imageBlob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, "image/jpeg", 0.7); // Compressing the image
      };
    });
  };

  useEffect(() => {
    getImageFromDB()
      .then((result) => {
        resizeImage(result, 800, 600).then((resizedBlob) => {
          const objectURL = URL.createObjectURL((resizedBlob));
          setCroppedImage(objectURL); // Set the resized image for rendering
        });
        // console.log(result);
        // setCroppedImage(URL.createObjectURL(result));
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      URL.revokeObjectURL(croppedImage || "");
    };
  }, []);

  const getTemplateComponent = () => {
    switch (template_name) {
      case 'basic_template':
        return <BasicTemplate data={Data} image={croppedImage} />;
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
