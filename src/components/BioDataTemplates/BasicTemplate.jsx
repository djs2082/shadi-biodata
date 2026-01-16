import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import React, { useState, useEffect } from 'react';

import cornerBottomFlower from './images/corner_bottom_flower.jpeg';
import cornerRangoli from './images/corner_rangoli.jpeg';
import Tags from './tags';

// Register Google Fonts for PDF rendering
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    // fontFamily: "Noto Sans Devanagari", // Use the registered font
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    border: '8px solid #a63e12',
    padding: '12px 16px',
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '12px',
    marginTop: '8px',
    color: '#a63e12',
    fontFamily: 'Roboto',
  },

  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    width: '100%',
    header: {
      width: 'calc(100% - 320px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '20px',
      text: {
        margin: 4,
        textAlign: 'center',
      },
      name: {
        fontSize: '30px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '4px',
      },
    },
    profileImageWrapper: {
      width: '240px',
      profileImage: {
        width: '200px',
        height: '280px',
        margin: '0 12px',
      },
    },
  },
  watermark: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.1, // Set opacity to make it a watermark
    width: 400, // Set the width of the watermark
    height: 'auto',
  },
  watermarkBottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    watermarkBottom: {
      opacity: 0.1, // Set opacity to make it a watermark
      width: 400, // Set the width of the watermark
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    width: 'auto',
    text: {
      margin: 4,
    },
    subHeader: {
      backgroundColor: '#8a3e07' /* Brownish color */,
      color: 'white' /* White text */,
      fontSize: '14px',
      fontWeight: '700' /* Bold text */,
      borderRadius: '24px' /* Rounded corners */,
      padding: '6px 20px' /* Add padding to the button */,
      textAlign: 'center',
      justifyContent: 'center',
      display: 'inline-block',
      boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.06)',
      width: '200px',
      margin: '18px auto',
    },
    fieldsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '16px',
      width: '100%',
    },
    fieldsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: '10px',
      columnGap: '6%',
      width: '100%',
      padding: '0 40px 6px 40px',
      label: {
        fontWeight: '600',
        width: '38%',
        justifySelf: 'left',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: '0px',
        fontSize: '12px',
        color: '#333',
      },
      value: {
        fontWeight: '600',
        width: '56%',
        justifySelf: 'left',
        alignSelf: 'flex-start',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingRight: '0px',
        fontSize: '12px',
        color: '#222',
      },
    },
  },
  branding: {
    fontSize: '18',
    color: 'grey',
    position: 'absolute',
    bottom: '20',
    right: '20',
  },
});

const BasicTemplate = (props) => {
  const [personalDetail, setPersonalDetail] = useState({
    fullName: '',
    dateOfBirth: '',
    placeOfBirth: '',
  });

  useEffect(() => {
    let fullName = '';
    let dateOfBirth = '';
    let placeOfBirth = '';
    props.data.forEach((data) => {
      if (data.title === 'Personal Details') {
        data.data.forEach((field) => {
          if (field.label === 'Full Name') {
            fullName = field.value;
          }
          if (field.label === 'Date Of Birth') {
            dateOfBirth = field.value;
          }
          if (field.label === 'Place Of Birth') {
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

  const checkIfTitlePrintable = (data) => {
    let isAllowed = false;
    data.forEach((item) => {
      if (item.value.length > 0) {
        isAllowed = true;
        return;
      }
    });
    return isAllowed;
  };

  const getPageUI = (data) => {
    return (
      <View style={styles.body} wrap={false}>
        {checkIfTitlePrintable(data.data) && (
          <View>
            <Text style={styles.body.subHeader}>{data.title}</Text>
          </View>
        )}
        <View style={styles.body.fieldsWrapper}>
          {data.data.map(
            (field) =>
              field.value.length > 0 && (
                <View key={field.label} style={styles.body.fieldsContainer}>
                  <Text style={styles.body.fieldsContainer.label}>
                    {field.label}
                  </Text>
                  <Text style={styles.body.fieldsContainer.value}>
                    {field.value}
                  </Text>
                </View>
              )
          )}
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
            <Text
              style={{
                ...styles.headerWrapper.header.text,
                ...styles.headerWrapper.header.name,
              }}
            >
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
      <Page size="A4" style={styles.page}>
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
