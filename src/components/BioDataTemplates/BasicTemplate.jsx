import React, { useState, useEffect } from "react";
import cornerRangoli from "./images/corner_rangoli.jpeg";
import cornerBottomFlower from "./images/corner_bottom_flower.jpeg";
import Tags from "./tags";
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
import LibreBaskervilleBold from "./../../fonts/LibreBaskerville/LibreBaskerville-Bold.ttf";
import LibreBaskervilleRegular from "./../../fonts/LibreBaskerville/LibreBaskerville-Regular.ttf";
import TimesNewRomanRegular from "./../../fonts/TimesNewRoman/times_new_roman_regular.ttf";
import TimesNewRomanBold from "./../../fonts/TimesNewRoman/times_new_roman_bold.ttf";

Font.register({
  family: "Noto Sans Devanagari",
  fonts: [
    {
      src: NotoSansFont,
      fontWeight: 900,
    },
  ],
});

Font.register({
  family: "Libre Baskerville",
  fonts: [
    {
      src: LibreBaskervilleBold,
      fontWeight: 700,
    },
    {
      src: LibreBaskervilleRegular,
      fontWeight: 600,
    },
  ],
});

Font.register({
  family: "Times New Roman",
  fonts: [
    {
      src: TimesNewRomanBold,
      fontWeight: 700,
    },
    {
      src: TimesNewRomanRegular,
      fontWeight: 600,
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    // fontFamily: "Noto Sans Devanagari", // Use the registered font
    fontFamily: "Times New Roman",
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
    fontFamily: "Noto Sans Devanagari",
  },

  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    width: "100%",
    header: {
      width: "calc ( 100% - 304px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginHorizontal: "auto",
      marginLeft: "auto",
      marginRight: "auto",
      alignSelf: "flex-start",
      justifySelf: "flex-start",
      justifyContent: "center",
      padding: "120px",
      text: {
        margin: 4,
      },
      name: {
        fontSize: "28px",
        fontWeight: "700",
      },
    },
    profileImageWrapper: {
      width: "304px",
      profileImage: {
        width: "240px",
        height: "343px",
        margin: "0 32px",
      },
    },
  },
  watermark: {
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0.1, // Set opacity to make it a watermark
    width: 400, // Set the width of the watermark
    height: "auto",
  },
  watermarkBottomWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    watermarkBottom: {
      opacity: 0.1, // Set opacity to make it a watermark
      width: 400, // Set the width of the watermark
    },
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    alignSelf: "center",
    justifyContent: "flex-start",
    width: "auto",
    text: {
      margin: 4,
    },
    subHeader: {
      backgroundColor: "#8a3e07" /* Brownish color */,
      color: "white" /* White text */,
      fontSize: "18px",
      fontWeight: "700" /* Bold text */,
      border: "none" /* Remove default border */,
      borderRadius: "50px" /* Fully rounded corners */,
      padding: "10px 30px" /* Add padding to the button */,
      cursor: "pointer" /* Change cursor to pointer on hover */,
      textAlign: "center",
      justifyContent: "center",
      display: "inline-block",
      boxShadow:
        "0px 4px 6px rgba(0, 0, 0, 0.1)" /* Optional shadow for a nice effect */,
      width: "240px",
      margin: "40px 0",
    },
    fieldsWrapper: {
      display: "flex",
      flexDirection: "column",
      fontSize: "18px",
      width: "100vw",
    },
    fieldsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: "10px",
      columnGap: "10%",
      width: "100%",
      padding: "0 40px 10px 40px",
      label: {
        fontWeight: "600",
        width: "40%",
        justifySelf: "left",
        alignSelf: "flex-start",
        textAlign: "left",
        paddingLeft: "40px",
      },
      value: {
        fontWeight: "600",
        width: "75%",
        // textAlign: "left",
        justifySelf: "left",
        alignSelf: "flex-start",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        paddingRight: "48px",
      },
    },
  },
  branding: {
    fontSize: "18",
    color: "grey",
    position: "absolute",
    bottom: "20",
    right: "20",
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

  const getPageUI = (data) => {
    return (
      <View style={styles.body} wrap={false}>
        <View>
          <Text style={styles.body.subHeader}>{data.title}</Text>
        </View>
        <View style={styles.body.fieldsWrapper}>
          {data.data.map((field) => (
            <View style={styles.body.fieldsContainer}>
              <Text style={styles.body.fieldsContainer.label}>
                {field.label}
              </Text>
              <Text style={styles.body.fieldsContainer.value}>
                {field.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const createPersonalDetailsPage = (personalDetails) => {
    return (
      <>
        <View style={styles.headerWrapper}>
          {props.image && (
            <View style={styles.headerWrapper.profileImageWrapper}>
              <Image
                style={styles.headerWrapper.profileImageWrapper.profileImage}
                src={props.image}
              />
            </View>
          )}
          <View style={styles.headerWrapper.header}>
            <Text style={{ ...styles.headerWrapper.header.text, ...Tags.h1 }}>
              {personalDetail.fullName}
            </Text>
            <Text
              style={{ ...styles.headerWrapper.header.text, ...Tags.paragraph }}
            >
              Date Of Birth : {personalDetail.dateOfBirth}
            </Text>
            <Text
              style={{ ...styles.headerWrapper.header.text, ...Tags.paragraph }}
            >
              Place Of Birth : {personalDetail.placeOfBirth}
            </Text>
          </View>
        </View>
        {getPageUI(personalDetails)}
      </>
    );
  };

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View fixed>
          <Image
            style={{ ...styles.watermark, right: 0 }}
            src={cornerRangoli}
          />
        </View>
        <View fixed>
          <Text style={styles.title}>ॐ श्री गणेशाय नमः</Text>
        </View>
        {createPersonalDetailsPage(props.data[0])}
        {getPageUI(props.data[1])}
        {getPageUI(props.data[2])}
        <View fixed style={styles.watermarkBottomWrapper}>
          <Image
            style={{ ...styles.watermarkBottomWrapper.watermarkBottom }}
            src={cornerBottomFlower}
          />
        </View>
        <View style={styles.branding} fixed>
          <Text>www.shadibiodata.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BasicTemplate;
