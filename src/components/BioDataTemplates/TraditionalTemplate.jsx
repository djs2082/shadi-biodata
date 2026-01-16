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
import goldenRing from './images/golden_ring.png';

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

// Register Noto Sans Devanagari for Sanskrit text
Font.register({
  family: 'NotoSansDevanagari',
  src: 'https://cdn.jsdelivr.net/npm/@expo-google-fonts/noto-sans-devanagari@0.2.3/NotoSansDevanagari_400Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F5EFE7',
    padding: '28px',
    position: 'relative',
  },
  border: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    right: '16px',
    bottom: '16px',
    border: '4px solid #B8860B',
    borderRadius: '4px',
  },
  innerBorder: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    bottom: '20px',
    border: '1px solid #DAA520',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
    paddingTop: '8px',
  },
  ganeshText: {
    fontFamily: 'NotoSansDevanagari',
    fontSize: '16px',
    color: '#8B4513',
    fontWeight: 700,
    marginTop: '8px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#5B2C0D',
    marginBottom: '8px',
    marginTop: '12px',
    textTransform: 'uppercase',
    borderBottom: '2px solid #B8860B',
    paddingBottom: '4px',
  },
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '4px',
    fontSize: '10px',
    alignItems: 'flex-start',
  },
  fieldLabel: {
    width: '140px',
    color: '#3E2723',
    fontWeight: 700,
  },
  fieldColon: {
    width: '8px',
    color: '#3E2723',
  },
  fieldValue: {
    flex: 1,
    color: '#3E2723',
    fontWeight: 400,
  },
  imageWrapper: {
    position: 'absolute',
    top: '100px',
    right: '45px',
    width: '150px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldenRingFrame: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    zIndex: 2,
  },
  profileImageContainer: {
    position: 'absolute',
    width: '120px',
    height: '120px',
    borderRadius: '100px',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  profileImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
  },
  footer: {
    position: 'absolute',
    bottom: '24px',
    left: '0',
    right: '0',
    fontSize: '8px',
    color: '#8B6914',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  decorativeCorner: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    opacity: 0.3,
  },
  topLeftCorner: {
    top: '32px',
    left: '32px',
  },
  topRightCorner: {
    top: '32px',
    right: '32px',
  },
  bottomLeftCorner: {
    bottom: '32px',
    left: '32px',
  },
  bottomRightCorner: {
    bottom: '32px',
    right: '32px',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '50px',
    color: '#DAA520',
    fontWeight: 700,
    opacity: 0.05,
    transform: 'translate(-50%, -50%) rotate(-35deg)',
  },
});

const TraditionalTemplate = (props) => {
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
      <View>
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
        {/* Borders */}
        <View style={styles.border} />
        <View style={styles.innerBorder} />

        {/* Watermark */}
        <View style={styles.watermark}>
          <Text>SHADI BIODATA</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.ganeshText}>|| श्री गणेशाय नमः ||</Text>
        </View>

        {/* Profile Image */}
        {props.image && (
          <View style={styles.imageWrapper}>
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} src={props.image} />
            </View>
            <Image style={styles.goldenRingFrame} src={goldenRing} />
          </View>
        )}

        {/* Content */}
        <View
          style={{
            paddingRight: props.image ? '160px' : '0',
            paddingLeft: '12px',
          }}
        >
          {props.data.map((section, index) => (
            <View key={index}>{renderSection(section)}</View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Created with Love at shadibiodata.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TraditionalTemplate;
