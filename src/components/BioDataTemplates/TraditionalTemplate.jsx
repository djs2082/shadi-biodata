import React, { useEffect, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';

import goldenRing from './images/golden_ring.png';

/* -------------------- Fonts -------------------- */

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
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

/* -------------------- Styles -------------------- */

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    backgroundColor: '#F6F1E7',
    padding: 28,
    position: 'relative',
  },

  /* Borders */
  outerBorder: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    border: '4 solid #B8860B',
  },

  innerBorder: {
    position: 'absolute',
    top: 22,
    left: 22,
    right: 22,
    bottom: 22,
    border: '1 solid #DAA520',
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },

  ganeshText: {
    fontFamily: 'NotoSansDevanagari',
    fontSize: 16,
    color: '#8B4513',
    fontWeight: 700,
  },

  /* Section */
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#5B2C0D',
    marginTop: 14,
    marginBottom: 6,
    borderBottom: '2 solid #B8860B',
    paddingBottom: 4,
    textTransform: 'uppercase',
  },

  fieldRow: {
    flexDirection: 'row',
    fontSize: 10,
    marginBottom: 4,
  },

  fieldLabel: {
    width: 140,
    fontWeight: 700,
    color: '#3E2723',
  },

  fieldColon: {
    width: 8,
    color: '#3E2723',
  },

  fieldValue: {
    flex: 1,
    color: '#3E2723',
  },

  /* Image */
  imageWrapper: {
    position: 'absolute',
    top: 95,
    right: 40,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  goldenRing: {
    position: 'absolute',
    width: 150,
    height: 150,
  },

  profileContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  profileImage: {
    width: 120,
    height: 120,
    objectFit: 'cover',
  },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    fontSize: 8,
    textAlign: 'center',
    color: '#8B6914',
    fontStyle: 'italic',
  },

  /* Watermark */
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: 48,
    fontWeight: 700,
    color: '#DAA520',
    opacity: 0.05,
    transform: 'translate(-50%, -50%) rotate(-35deg)',
  },
});

/* -------------------- Component -------------------- */

const TraditionalTemplate = ({ data = [], image }) => {
  const renderSection = (section) => {
    if (!section?.data?.some((f) => f.value)) return null;

    return (
      <View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {section.data.map(
          (field, idx) =>
            field.value && (
              <View key={idx} style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{field.value}</Text>
              </View>
            )
        )}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Borders */}
        <View style={styles.outerBorder} />
        <View style={styles.innerBorder} />

        {/* Watermark */}
        <Text style={styles.watermark}>SHADI BIODATA</Text>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.ganeshText}>|| श्री गणेशाय नमः ||</Text>
        </View>

        {/* Profile Image */}
        {image && (
          <View style={styles.imageWrapper}>
            <Image src={goldenRing} style={styles.goldenRing} />
            <View style={styles.profileContainer}>
              <Image src={image} style={styles.profileImage} />
            </View>
          </View>
        )}

        {/* Content */}
        <View style={{ paddingRight: image ? 180 : 0 }}>
          {data.map((section, index) => (
            <View key={index}>{renderSection(section)}</View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Created with Love at shadibiodata.com</Text>
      </Page>
    </Document>
  );
};

export default TraditionalTemplate;
