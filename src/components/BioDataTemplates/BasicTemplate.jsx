import React, { useState, useEffect } from "react";
import cornerFlowerRight from './images/corner_flower_right.png'
import cornerFlowerLeft from './images/corner_flower_left.png'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import NotoSansFont from "./../../fonts/Noto_Sans/NotoSans-VariableFont_wdth.ttf";

Font.register({
  family: "Noto Sans Devanagari",
  fonts: [
    {
      src: NotoSansFont,
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Noto Sans Devanagari", // Use the registered font
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    border: "8px solid #a63e12",
  },
  title: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "20px",
    color: "#a63e12",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    name: {
      fontSize: "28px",
      fontWeight: "bold",
    },
  },
  watermark: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.1, // Set opacity to make it a watermark
    width: 200, // Set the width of the watermark
    height: 'auto',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const BasicTemplate = (props) => {
  const [personalDetail, setPersonalDetail] = useState({
    fullName: "",
    dateOfBirth: "",
    placeOfBirth: "",
  });

  useEffect(() => {
    let fullName = "";
    let dateOfBirth = "";
    let placeOfBirth = "";
    props.data.forEach((data) => {
      if (data.title === "Personal Details") {
        data.data.forEach((field) => {
          if (field.label === "Full Name") {
            fullName = field.value;
          }
          if (field.label === "Date Of Birth") {
            dateOfBirth = field.value;
          }
          if (field.label === "Place Of Birth") {
            placeOfBirth = field.value;
          }
        });
      }
    });
    setPersonalDetail({
      fullName,
      dateOfBirth,
      placeOfBirth,
    });
  }, [props.data]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
        <Image 
        style={{...styles.watermark, right: 0}}
        src={cornerFlowerRight}
      />
             <Image 
        style={{...styles.watermark, left: 0}}
        src={cornerFlowerLeft}
      />
        </View>
        <View>
          <Text style={styles.title}>ॐ श्री गणेशाय नमः</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.header.name}>{personalDetail.fullName}</Text>
          <Text>Date Of Birth: {personalDetail.dateOfBirth}</Text>
          <Text>Place Of Birth: {personalDetail.placeOfBirth}</Text>
        </View>

        {/* <View style={styles.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default BasicTemplate;
