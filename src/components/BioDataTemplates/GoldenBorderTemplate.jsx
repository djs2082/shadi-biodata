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
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: '30px',
    border: '12px solid #B8860B',
    borderRadius: '8px',
  },
  decorativeBorder: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    bottom: '20px',
    borderWidth: '3px',
    borderColor: '#DAA520',
    borderStyle: 'solid',
    borderRadius: '4px',
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '26px',
    textAlign: 'center',
    marginBottom: '30px',
    marginTop: '20px',
    color: '#B8860B',
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: '30px',
    header: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: '40px',
      justifyContent: 'center',
      text: {
        margin: 4,
        fontSize: '14px',
        color: '#333',
      },
      name: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#000',
        marginBottom: '8px',
      },
    },
    profileImageWrapper: {
      width: '280px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: '40px',
      profileImage: {
        width: '200px',
        height: '286px',
        border: '3px solid #DAA520',
      },
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: '40px',
    sectionHeader: {
      backgroundColor: '#FFFFFF',
      color: '#B8860B',
      fontSize: '18px',
      fontWeight: '700',
      textAlign: 'center',
      width: '100%',
      marginTop: '25px',
      marginBottom: '20px',
      paddingVertical: '10px',
      borderBottom: '2px solid #DAA520',
    },
    fieldsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px',
      width: '100%',
    },
    fieldsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: '12px',
      width: '100%',
      label: {
        fontWeight: '500',
        width: '45%',
        textAlign: 'left',
        color: '#555',
      },
      colon: {
        width: '5%',
        textAlign: 'center',
        color: '#555',
      },
      value: {
        fontWeight: '400',
        width: '50%',
        textAlign: 'left',
        color: '#000',
      },
    },
  },
  decorativeCorner: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '60px',
    height: '60px',
    borderTop: '4px solid #DAA520',
    borderLeft: '4px solid #DAA520',
  },
  decorativeCornerBottomRight: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '60px',
    height: '60px',
    borderBottom: '4px solid #DAA520',
    borderRight: '4px solid #DAA520',
  },
  branding: {
    fontSize: '12',
    color: '#999',
    position: 'absolute',
    bottom: '40',
    right: '40',
  },
});

const GoldenBorderTemplate = (props) => {
  const [personalDetail, setPersonalDetail] = useState({
    fullName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    timeOfBirth: '',
  });

  useEffect(() => {
    let fullName = '';
    let dateOfBirth = '';
    let placeOfBirth = '';
    let timeOfBirth = '';
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
          if (field.label === 'Time Of Birth') {
            timeOfBirth = field.value;
          }
        });
      }
    });
    setPersonalDetail({
      fullName,
      dateOfBirth,
      placeOfBirth,
      timeOfBirth,
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
            <Text style={styles.body.sectionHeader}>
              {data.title.toUpperCase()}
            </Text>
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
                  <Text style={styles.body.fieldsContainer.colon}>:</Text>
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
          <View style={styles.headerWrapper.header}>
            <Text style={styles.body.sectionHeader}>PERSONAL DETAILS</Text>
            <Text style={styles.headerWrapper.header.name}>
              {personalDetail.fullName}
            </Text>
            <Text style={styles.headerWrapper.header.text}>
              Date of Birth: {personalDetail.dateOfBirth}
            </Text>
            {personalDetail.timeOfBirth && (
              <Text style={styles.headerWrapper.header.text}>
                Time of Birth: {personalDetail.timeOfBirth}
              </Text>
            )}
            <Text style={styles.headerWrapper.header.text}>
              Place of Birth: {personalDetail.placeOfBirth}
            </Text>
          </View>
          {props.image && (
            <View style={styles.headerWrapper.profileImageWrapper}>
              <Image
                style={styles.headerWrapper.profileImageWrapper.profileImage}
                src={props.image}
              />
            </View>
          )}
        </View>
        {getPageUI(personalDetails)}
      </>
    );
  };

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View fixed style={styles.decorativeBorder} />
        <View fixed style={styles.decorativeCorner} />
        <View fixed style={styles.decorativeCornerBottomRight} />
        <View fixed>
          <Text style={styles.title}>ॐ श्री गणेशाय नमः</Text>
        </View>
        {createPersonalDetailsPage(props.data[0])}
        {getPageUI(props.data[1])}
        {getPageUI(props.data[2])}
        <View style={styles.branding} fixed>
          <Text>www.shadibiodata.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default GoldenBorderTemplate;
