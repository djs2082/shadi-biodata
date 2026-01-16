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
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-lightitalic-webfont.ttf',
      fontWeight: 300,
      fontStyle: 'italic',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontWeight: 400,
      fontStyle: 'italic',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-mediumitalic-webfont.ttf',
      fontWeight: 500,
      fontStyle: 'italic',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bolditalic-webfont.ttf',
      fontWeight: 700,
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#9DC209',
    padding: '24px 32px',
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '60px',
    color: '#7FA307',
    fontWeight: 700,
    opacity: 0.08,
    transform: 'translate(-50%, -50%) rotate(-35deg)',
  },
  content: {
    position: 'relative',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1F1F1F',
    marginBottom: '6px',
    marginLeft: '12px',
    marginTop: '8px',
  },
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    marginLeft: '6px',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '3px',
    fontSize: '10px',
    alignItems: 'flex-start',
  },
  fieldLabel: {
    width: '110px',
    color: '#1F1F1F',
    fontWeight: 400,
  },
  fieldColon: {
    width: '12px',
    color: '#1F1F1F',
    textAlign: 'center',
  },
  fieldValue: {
    flex: 1,
    color: '#1F1F1F',
    fontWeight: 400,
    paddingLeft: '4px',
  },
  imageWrapper: {
    position: 'absolute',
    top: '24px',
    right: '32px',
    width: '120px',
    height: '160px',
  },
  profileImage: {
    width: '120px',
    height: '160px',
  },
  footer: {
    position: 'absolute',
    bottom: '12px',
    left: '0',
    right: '0',
    fontSize: '8px',
    color: '#5A7302',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

const FreeTemplate = (props) => {
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

  const renderSection = (sectionData) => {
    if (!sectionData || !sectionData.data) return null;

    const hasContent = sectionData.data.some((field) => field.value.length > 0);
    if (!hasContent) return null;

    return (
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{sectionData.title}</Text>
        <View style={styles.fieldsWrapper}>
          {sectionData.data.map(
            (field, index) =>
              field.value.length > 0 && (
                <View key={index} style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>{field.value}</Text>
                </View>
              )
          )}
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <View style={styles.watermark}>
          <Text>SHADIBIODATA.COM</Text>
        </View>

        {/* Profile Image */}
        {props.image && (
          <View style={styles.imageWrapper}>
            <Image style={styles.profileImage} src={props.image} />
          </View>
        )}

        {/* Content */}
        <View style={{ paddingRight: props.image ? '130px' : '0' }}>
          {props.data.map((section, index) => (
            <View key={index}>{renderSection(section)}</View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Powered by shadibiodata.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FreeTemplate;
