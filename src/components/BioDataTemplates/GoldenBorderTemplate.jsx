import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import { useState, useEffect } from 'react';

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

Font.register({
  family: 'NotoSansDevanagari',
  src: 'https://cdn.jsdelivr.net/npm/@expo-google-fonts/noto-sans-devanagari@0.2.3/NotoSansDevanagari_400Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFDF8',
    padding: 28,
    position: 'relative',
  },
  outerBorder: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    bottom: 14,
    border: '4px solid #B8860B',
  },
  decorativeBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: '1px solid #DAA520',
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 15,
    color: '#8B4513',
    fontFamily: 'NotoSansDevanagari',
    fontWeight: 700,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
    alignItems: 'center',
    header: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: 30,
      justifyContent: 'center',
      text: {
        marginVertical: 3,
        fontSize: 13,
        color: '#555',
      },
      name: {
        fontSize: 22,
        fontWeight: 700,
        color: '#3E2723',
        marginBottom: 10,
      },
    },
    profileImageWrapper: {
      width: 220,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 30,
      profileImage: {
        width: 160,
        height: 200,
        border: '3px solid #DAA520',
      },
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 30,
    sectionHeader: {
      backgroundColor: '#FFFFFF',
      color: '#5B2C0D',
      fontSize: 14,
      fontWeight: 700,
      textAlign: 'left',
      width: '100%',
      marginTop: 20,
      marginBottom: 12,
      paddingBottom: 6,
      borderBottom: '2px solid #DAA520',
      textTransform: 'uppercase',
    },
    fieldsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 12,
      width: '100%',
    },
    fieldsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 8,
      paddingLeft: 8,
      width: '100%',
      label: {
        fontWeight: 700,
        width: '35%',
        textAlign: 'left',
        color: '#3E2723',
      },
      colon: {
        width: '5%',
        textAlign: 'center',
        color: '#3E2723',
      },
      value: {
        fontWeight: 400,
        width: '60%',
        textAlign: 'left',
        color: '#3E2723',
      },
    },
  },
  decorativeCorner: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 40,
    height: 40,
    borderTop: '3px solid #B8860B',
    borderLeft: '3px solid #B8860B',
  },
  decorativeCornerBottomRight: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    borderBottom: '3px solid #B8860B',
    borderRight: '3px solid #B8860B',
  },
  branding: {
    fontSize: 8,
    color: '#8B6914',
    fontStyle: 'italic',
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    textAlign: 'center',
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
          {props.image && (
            <View style={styles.headerWrapper.profileImageWrapper}>
              <Image
                style={styles.headerWrapper.profileImageWrapper.profileImage}
                src={props.image}
              />
            </View>
          )}
          <View style={styles.headerWrapper.header}>
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
        </View>
        {getPageUI(personalDetails)}
      </>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Borders */}
        <View fixed style={styles.outerBorder} />
        <View fixed style={styles.decorativeBorder} />
        <View fixed style={styles.decorativeCorner} />
        <View fixed style={styles.decorativeCornerBottomRight} />

        {/* Header */}
        <View fixed style={{ alignItems: 'center', marginBottom: 12 }}>
          <Text style={styles.title}>|| श्री गणेशाय नमः ||</Text>
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
