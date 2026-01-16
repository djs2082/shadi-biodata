import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Svg,
  Path,
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
    backgroundColor: '#FFF9F0',
    padding: '20px',
  },
  ornateHeader: {
    width: '100%',
    height: '80px',
    backgroundColor: '#D4AF37',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '25px',
    color: '#8B4513',
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: '25px',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #D4AF37',
    header: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: '30px',
      justifyContent: 'center',
      text: {
        margin: 4,
        fontSize: '13px',
        color: '#555',
      },
      name: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#8B4513',
        marginBottom: '6px',
      },
    },
    profileImageWrapper: {
      width: '280px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: '30px',
      profileImage: {
        width: '180px',
        height: '257px',
        border: '4px solid #D4AF37',
        borderRadius: '4px',
      },
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: '20px',
    sectionWrapper: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      marginBottom: '15px',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #D4AF37',
    },
    sectionHeader: {
      backgroundColor: '#8B4513',
      color: '#FFFFFF',
      fontSize: '16px',
      fontWeight: '700',
      textAlign: 'left',
      width: '100%',
      marginBottom: '15px',
      paddingVertical: '8px',
      paddingHorizontal: '20px',
      borderRadius: '4px',
    },
    fieldsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '13px',
      width: '100%',
    },
    fieldsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: '10px',
      width: '100%',
      label: {
        fontWeight: '600',
        width: '40%',
        textAlign: 'left',
        color: '#8B4513',
      },
      colon: {
        width: '5%',
        textAlign: 'center',
        color: '#555',
      },
      value: {
        fontWeight: '400',
        width: '55%',
        textAlign: 'left',
        color: '#333',
      },
    },
  },
  ornatePattern: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '100px',
    backgroundColor: '#D4AF37',
    opacity: 0.1,
  },
  branding: {
    fontSize: '12',
    color: '#999',
    position: 'absolute',
    bottom: '30',
    right: '30',
  },
});

const OrnateGoldTemplate = (props) => {
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
          <View style={styles.body.sectionWrapper}>
            <Text style={styles.body.sectionHeader}>
              {data.title.toUpperCase()}
            </Text>
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
        )}
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

  // Ornate Pattern SVG
  const OrnatePattern = () => (
    <Svg width="100%" height="100" viewBox="0 0 800 100">
      <Path
        d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <Path
        d="M100,40 L120,30 L140,40 L120,50 Z M300,40 L320,30 L340,40 L320,50 Z M500,40 L520,30 L540,40 L520,50 Z M700,40 L720,30 L740,40 L720,50 Z"
        fill="#D4AF37"
        opacity="0.6"
      />
    </Svg>
  );

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View fixed style={styles.ornateHeader}>
          <OrnatePattern />
        </View>
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

export default OrnateGoldTemplate;
