import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const BLUE = "#2563eb";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },

  /* ---------- HEADER ---------- */
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
    marginTop: 1,
  },
  contactLine: {
    textAlign: "left",
    marginBottom: 6,
  },
  linkLine: {
    textAlign: "left",
    marginBottom: 6,
  },
  linklinelast:{
    textAlign: "left",
    marginBottom: 18,
  },
  link: {
    color: BLUE,
    textDecoration: "none",
  },

  /* ---------- SECTION ---------- */
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  blueBar: {
    width: 3,
    height: 14,
    backgroundColor: BLUE,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    flexGrow: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#999",
    marginTop: 2,
    marginBottom: 4,
  },

  /* ---------- TEXT ---------- */
  paragraph: {
    textAlign: "justify",
  },

  /* ---------- EXPERIENCE ---------- */
  roleTitle: {
    fontWeight: "bold",
  },
  dateText: {
    marginBottom: 4,
  },

  /* ---------- EDUCATION ---------- */
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subText: {
    color: "#555",
    fontSize: 10,
  },
});

const ResumePDF = ({ data, dateFormat, fresher }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* ---------- HEADER ---------- */}
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.jobTitle}>({data.title})</Text>

      <Text style={styles.contactLine}>
        Email: {data.email} | Phone: {data.phone} | {data.address}
      </Text>

      <Text style={styles.linkLine}>
        Linkedin:{" "}
        <Link src={data.linkedin} style={styles.link}>
          {data.linkedin}
        </Link>
      </Text>

      <Text style={styles.linklinelast}>
        Portfolio:{" "}
        <Link src={data.portfolio} style={styles.link}>
          {data.portfolio}
        </Link>
      </Text>

      {/* ---------- PROFESSIONAL SUMMARY ---------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.blueBar} />
          <Text style={styles.sectionTitle}>Professional Summary</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.paragraph}>{data.summary}</Text>
      </View>

      {/* ---------- WORK EXPERIENCE ---------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.blueBar} />
          <Text style={styles.sectionTitle}>{fresher==="Projects"? "Projects" : "Work Experience"}</Text>
        </View>
        <View style={styles.divider} />

        {data.experience.map((exp, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <Text style={styles.roleTitle}>
              {i + 1} {exp.role} at {exp.company}
            </Text>
            <Text style={styles.dateText}>
              {exp.startDate} – {exp.endDate} ({exp.duration})
            </Text>
          </View>
        ))}

      {/* ---------- Projects ---------- */}

        {data.projects.map((project, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <Text style={styles.roleTitle}>
              {project.projectName}
            </Text>
            <Text style={styles.dateText}>
              {project.projectDesc}
            </Text>
            <Link src={project.projectLink} style={styles.link}>
          {project.projectLink}
        </Link>
          </View>
        ))}
      </View>

      {/* ---------- EDUCATION ---------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.blueBar} />
          <Text style={styles.sectionTitle}>Education</Text>
        </View>
        <View style={styles.divider} />

        {data.education.map((edu, i) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <View style={styles.eduRow}>
              <Text style={styles.roleTitle}>{edu.degree} in {edu.field}</Text>
              <Text>{edu.startDate} – {edu.endDate==dateFormat(new Date().toISOString().split('T')[0])?"Currently pursuing":edu.endDate}</Text>
            </View>
            <Text style={styles.dateText}>{edu.institute}</Text>
          </View>
        ))}
      </View>

      {/* ---------- SKILLS ---------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.blueBar} />
          <Text style={styles.sectionTitle}>Skills</Text>
        </View>
        <View style={styles.divider} />
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
        {data.skills.map((skill, index) => (
        <View key={index} >
          <Text>{`${skill.skill} | `}</Text>
        </View>
        ))}
        </View>
      </View>
      
      

      {/* ---------- LANGUAGES ---------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.blueBar} />
          <Text style={styles.sectionTitle}>Languages</Text>
        </View>
        <View style={styles.divider} />
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
        {data.languages.map((lang, index) => (
        <View key={index} >
          <Text>{`${lang.language} | `}</Text>
        </View>
        ))}
        </View>
      </View>

    </Page>
  </Document>
);

export default ResumePDF;
