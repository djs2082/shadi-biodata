import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import React from 'react';

// Import decorative elements
import topLeftCorner from './images/navy_gold/top_left_corner.png';
import bottomRightCorner from './images/navy_gold/bottom_right_corner.png';
import dividerTop from './images/navy_gold/divider_top.png';
import dividerMiddle from './images/navy_gold/divider_middle.png';
import dividerBottom from './images/navy_gold/divider_bottom.png';
import photoFrame from './images/navy_gold/photo_frame.png';
import bottomBanner from './images/navy_gold/bottom_banner.png';

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
    backgroundColor: '#1a3a52',
    padding: 0,
    position: 'relative',
  },
  // Decorative corner ornaments
  topLeftOrnament: {
    position: 'absolute',
    top: 20,
    left: 30,
    width: 320,
    height: 320,
  },
  bottomRightOrnament: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 160,
    height: 160,
  },
  // Main border
  mainBorder: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    border: '3px solid #d4af37',
    borderRadius: 4,
  },
  innerBorder: {
    position: 'absolute',
    top: 22,
    left: 22,
    right: 22,
    bottom: 22,
    border: '1px solid #d4af37',
  },
  // Content container
  contentContainer: {
    padding: '50px 60px',
    position: 'relative',
    zIndex: 1,
  },
  // Name section
  nameSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerTop: {
    width: 250,
    height: 20,
    marginBottom: 15,
  },
  name: {
    fontSize: 36,
    fontWeight: 700,
    color: '#d4af37',
    letterSpacing: 3,
    marginVertical: 15,
    textTransform: 'uppercase',
  },
  dividerBottom: {
    width: 250,
    height: 20,
    marginTop: 15,
  },
  // Photo frame
  photoFrameContainer: {
    position: 'absolute',
    top: 230,
    right: 90,
    width: 240,
    height: 290,
    zIndex: 10,
  },
  photoFrameBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 240,
    height: 290,
    zIndex: 2,
  },
  photoContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 210,
    height: 260,
    overflow: 'hidden',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // Content sections
  contentWrapper: {
    width: '60%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#d4af37',
    marginTop: 25,
    marginBottom: 15,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  dividerSection: {
    width: 400,
    height: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    width: '45%',
    fontSize: 11,
    color: '#d4af37',
    fontWeight: 400,
  },
  detailColon: {
    width: '5%',
    fontSize: 11,
    color: '#d4af37',
  },
  detailValue: {
    width: '50%',
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 400,
  },
  // Bottom banner
  bottomBannerContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    height: 60,
  },
  bottomBannerImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#d4af37',
    zIndex: 2,
  },
});

const NavyGoldRoyalTemplate = (props) => {
  const { data } = props;

  const renderDetailRow = (label, value) => {
    if (!value) return null;
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailColon}>:</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Decorative Borders */}
        <View style={styles.mainBorder} />
        <View style={styles.innerBorder} />

        {/* Decorative Corners */}
        <Image style={styles.topLeftOrnament} src={topLeftCorner} />
        <Image style={styles.bottomRightOrnament} src={bottomRightCorner} />

        {/* Photo Frame */}
        {props.image && (
          <View style={styles.photoFrameContainer}>
            <View style={styles.photoContainer}>
              <Image style={styles.photo} src={props.image} />
            </View>
            <Image style={styles.photoFrameBorder} src={photoFrame} />
          </View>
        )}

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Name Section */}
          <View style={styles.nameSection}>
            <Image style={styles.dividerTop} src={dividerTop} />
            <Text style={styles.name}>
              {data?.personalDetails?.[0]?.value || 'Your Name'}
            </Text>
            <Image style={styles.dividerBottom} src={dividerTop} />
          </View>

          {/* Content Wrapper */}
          <View style={styles.contentWrapper}>
            {/* Personal Details */}
            <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
            <Image style={styles.dividerSection} src={dividerMiddle} />

            {data?.personalDetails?.map((detail, index) => (
              <React.Fragment key={index}>
                {renderDetailRow(detail.label, detail.value)}
              </React.Fragment>
            ))}

            {/* Family Details */}
            <Text style={styles.sectionTitle}>FAMILY DETAILS</Text>
            <Image style={styles.dividerSection} src={dividerMiddle} />

            {data?.familyDetails?.map((detail, index) => (
              <React.Fragment key={index}>
                {renderDetailRow(detail.label, detail.value)}
              </React.Fragment>
            ))}

            {/* Contact Details */}
            <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
            <Image style={styles.dividerSection} src={dividerMiddle} />

            {data?.contactDetails?.map((detail, index) => (
              <React.Fragment key={index}>
                {renderDetailRow(detail.label, detail.value)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Bottom Banner */}
        <View style={styles.bottomBannerContainer}>
          <Image style={styles.bottomBannerImage} src={bottomBanner} />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Created with ❤ at shadibiodata.com</Text>
      </Page>
    </Document>
  );
};

export default NavyGoldRoyalTemplate;
