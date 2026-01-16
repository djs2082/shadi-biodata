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
    backgroundColor: '#1a2951',
    padding: '30px',
    border: '8px solid #0f1c3f',
  },
  floralDecoration: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '150px',
    height: '150px',
    opacity: 0.4,
  },
  floralDecorationBottom: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    width: '150px',
    height: '150px',
    opacity: 0.4,
    transform: 'rotate(180deg)',
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
    color: '#DAA520',
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
        color: '#E0E0E0',
      },
      name: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#FFFFFF',
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
      backgroundColor: '#0f1c3f',
      color: '#DAA520',
      fontSize: '16px',
      fontWeight: '700',
      textAlign: 'center',
      width: '100%',
      marginTop: '25px',
      marginBottom: '20px',
      paddingVertical: '12px',
      borderTop: '2px solid #DAA520',
      borderBottom: '2px solid #DAA520',
      letterSpacing: '1px',
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
        color: '#B0B0B0',
      },
      colon: {
        width: '5%',
        textAlign: 'center',
        color: '#B0B0B0',
      },
      value: {
        fontWeight: '400',
        width: '50%',
        textAlign: 'left',
        color: '#FFFFFF',
      },
    },
  },
  branding: {
    fontSize: '12',
    color: '#888',
    position: 'absolute',
    bottom: '40',
    right: '40',
  },
});

const NavyFloralTemplate = (props) => {
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

  // Floral SVG decoration
  const FloralDecoration = () => (
    <Svg width="150" height="150" viewBox="0 0 100 100">
      <Path
        d="M50,10 Q60,20 50,30 Q40,20 50,10 M50,30 Q60,40 50,50 Q40,40 50,30 M50,50 Q60,60 50,70 Q40,60 50,50"
        fill="#DAA520"
        opacity="0.3"
      />
      <Path
        d="M30,30 Q40,35 30,40 Q20,35 30,30 M70,30 Q80,35 70,40 Q60,35 70,30 M50,60 Q55,70 50,80 Q45,70 50,60"
        fill="#FFD700"
        opacity="0.4"
      />
    </Svg>
  );

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View fixed style={styles.floralDecoration}>
          <FloralDecoration />
        </View>
        <View fixed style={styles.floralDecorationBottom}>
          <FloralDecoration />
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

export default NavyFloralTemplate;
