import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import topLeft from './images/template_twenty_five/top_left.png';
import topRight from './images/template_twenty_five/top_right.png';
import bottomLeft from './images/template_twenty_five/bottom_left.png';
import bottomRight from './images/template_twenty_five/bottom_right.png';

// Register fonts
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

// Register Times New Roman style italic font for labels
Font.register({
  family: 'TimesRoman',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times%20New%20Roman.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-bold@1.0.4/Times%20New%20Roman%20Bold.ttf',
      fontWeight: 700,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-italic@1.0.4/Times%20New%20Roman%20Italic.ttf',
      fontWeight: 400,
      fontStyle: 'italic',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman-bold-italic@1.0.4/Times%20New%20Roman%20Bold%20Italic.ttf',
      fontWeight: 700,
      fontStyle: 'italic',
    },
  ],
});

const BORDER_COLOR = '#8B6914';
const TEXT_COLOR = '#5D4E37';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'TimesRoman',
    backgroundColor: '#FFFFFF',

    position: 'relative',
  },

  // Outer page border
  pageBorder: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    bottom: 18,
    border: `1px solid ${BORDER_COLOR}`,
  },

  // Corner decorations - smaller size matching reference
  corner: {
    position: 'absolute',
    width: 70,
    height: 70,
  },
  topLeft: { top: 18, left: 18 },
  topRight: { top: 18, right: 18 },
  bottomLeft: { bottom: 18, left: 18 },
  bottomRight: { bottom: 18, right: 18 },

  contentWrapper: {
    marginTop: 50,
    marginHorizontal: 50,
  },

  headerRow: {
    marginTop: 30,
    flexDirection: 'row',
    marginBottom: 20,
  },

  leftHeader: {
    flex: 1,
    paddingRight: 30,
    paddingTop: 10,
  },

  // Section title with italic bold and underline
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    fontStyle: 'italic',
    color: TEXT_COLOR,
    marginBottom: 4,
  },

  sectionTitleUnderline: {
    width: 180,
    height: 1,
    backgroundColor: TEXT_COLOR,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 12,
    fontSize: 16,
    alignItems: 'center',
  },

  labelPersonalInformation: {
    width: 130,
    color: TEXT_COLOR,
    fontStyle: 'italic',
    fontWeight: 400,
  },

  label: {
    width: 200,
    color: TEXT_COLOR,
    fontStyle: 'italic',
    fontWeight: 400,
  },

  colon: {
    width: 20,
    textAlign: 'center',
    color: TEXT_COLOR,
  },

  value: {
    flex: 1,
    color: '#333',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },

  photoWrapper: {
    width: 180,
    alignItems: 'center',
  },

  photoFrame: {
    width: 150,
    height: 190,
    border: `2px solid ${BORDER_COLOR}`,
    padding: 3,
    backgroundColor: '#FFFFFF',
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  sectionBlock: {
    marginTop: 30,
  },

  footerBranding: {
    position: 'absolute',
    bottom: 24,
    right: 30,
    fontSize: 9,
    color: '#999',
    fontFamily: 'Roboto',
  },
});

const TemplateTwentyFive = (props) => {
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

    props.data.forEach((section) => {
      if (section.title === 'Personal Details') {
        section.data.forEach((field) => {
          if (field.label === 'Full Name') fullName = field.value;
          if (field.label === 'Date Of Birth') dateOfBirth = field.value;
          if (field.label === 'Place Of Birth') placeOfBirth = field.value;
          if (field.label === 'Time Of Birth') timeOfBirth = field.value;
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

  const renderFields = (data) => {
    const hasValues = data.data.some((field) => field.value);
    if (!hasValues) return null;

    return (
      <View style={styles.sectionBlock} wrap={false}>
        <Text style={styles.sectionTitle}>{data.title.toUpperCase()}</Text>
        <View style={styles.sectionTitleUnderline} />
        {data.data.map(
          (field) =>
            field.value && (
              <View key={field.label} style={styles.row}>
                <Text style={styles.label}>{field.label}</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{field.value}</Text>
              </View>
            )
        )}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Page Border */}
        <View style={styles.pageBorder} fixed />

        {/* Corner Decorations */}
        <Image src={topLeft} style={[styles.corner, styles.topLeft]} fixed />
        <Image src={topRight} style={[styles.corner, styles.topRight]} fixed />
        <Image
          src={bottomLeft}
          style={[styles.corner, styles.bottomLeft]}
          fixed
        />
        <Image
          src={bottomRight}
          style={[styles.corner, styles.bottomRight]}
          fixed
        />

        <View style={styles.contentWrapper}>
          {/* Header Section with Photo */}
          <View style={styles.headerRow}>
            <View style={styles.leftHeader}>
              <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
              <View style={styles.sectionTitleUnderline} />

              <View style={styles.row}>
                <Text style={styles.labelPersonalInformation}>Name</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{personalDetail.fullName}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.labelPersonalInformation}>
                  Date Of Birth
                </Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{personalDetail.dateOfBirth}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.labelPersonalInformation}>
                  Place Of Birth
                </Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{personalDetail.placeOfBirth}</Text>
              </View>

              {personalDetail.timeOfBirth && (
                <View style={styles.row}>
                  <Text style={styles.labelPersonalInformation}>
                    Time Of Birth
                  </Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{personalDetail.timeOfBirth}</Text>
                </View>
              )}
            </View>

            {/* Photo */}
            {props.image && (
              <View style={styles.photoWrapper}>
                <View style={styles.photoFrame}>
                  <Image src={props.image} style={styles.photo} />
                </View>
              </View>
            )}
          </View>

          {/* Other Sections */}
          {props.data.slice(1).map((section, index) => (
            <View key={index}>{renderFields(section)}</View>
          ))}
        </View>

        {/* Branding */}
        <View style={styles.footerBranding} fixed>
          <Text>shadibiodata.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TemplateTwentyFive;
