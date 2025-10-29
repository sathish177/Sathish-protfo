import React from 'react';
import { personalInfo, skills, experiences, projects, education, certifications } from '../constants';

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    width: '8.5in',
    minHeight: '11in',
    padding: '0.5in',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    color: 'black',
    boxSizing: 'border-box',
  },
  h1: { margin: 0, padding: 0, fontSize: '32px', fontWeight: 'bold' },
  h2: { margin: 0, padding: 0, fontSize: '18px', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '4px', marginBottom: '8px' },
  h3: { margin: 0, padding: 0, fontSize: '16px', fontWeight: 'bold' },
  p: { margin: 0, padding: 0 },
  ul: { paddingLeft: '20px', margin: '4px 0 0 0' },
  li: { fontSize: '14px', lineHeight: 1.4, marginBottom: '4px' },
  section: { marginTop: '16px' },
  header: { textAlign: 'center', marginBottom: '24px' },
  subHeader: { fontSize: '16px', color: '#333' },
  contactBar: { display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '12px', marginBottom: '16px', flexWrap: 'wrap' },
  summaryText: { fontSize: '14px', lineHeight: 1.5 },
  skillCategory: { marginBottom: '8px' },
  skillCategoryTitle: { fontSize: '14px', fontWeight: 'bold' },
  skillItems: { fontSize: '14px' },
  job: { marginBottom: '12px' },
  jobTitle: { fontSize: '16px', fontWeight: 'bold' },
  company: { fontSize: '14px', fontStyle: 'italic' },
  period: { fontSize: '12px', color: '#555' },
  project: { marginBottom: '12px' },
  projectTechStack: { fontStyle: 'italic', color: '#555', fontSize: '14px' },
  projectDescription: { fontSize: '14px', marginTop: '4px' },
  eduItem: { marginBottom: '12px' },
};


const ResumePDF: React.FC = () => {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>{personalInfo.name}</h1>
        <p style={{...styles.p, ...styles.subHeader}}>{personalInfo.titles.join(' | ')}</p>
      </div>

      <div style={styles.contactBar}>
        {personalInfo.contacts.map((c, i) => (
            <span key={i}>{c.text}</span>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Summary</h2>
        <p style={{...styles.p, ...styles.summaryText}}>{personalInfo.summary}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Skills</h2>
        {skills.map((skillCat, i) => (
          <div key={i} style={styles.skillCategory}>
            <h3 style={{...styles.h3, ...styles.skillCategoryTitle}}>{skillCat.category}</h3>
            <p style={{...styles.p, ...styles.skillItems}}>{skillCat.items.join(', ')}</p>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Experience</h2>
        {experiences.map((exp, i) => (
          <div key={i} style={styles.job}>
            <h3 style={{...styles.h3, ...styles.jobTitle}}>{exp.role}</h3>
            <p style={{...styles.p, ...styles.company}}>{exp.company}</p>
            <p style={{...styles.p, ...styles.period}}>{exp.period} | {exp.location}</p>
            <ul style={styles.ul}>
              {exp.description.map((desc, j) => <li style={styles.li} key={j}>{desc}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Projects</h2>
        {projects.map((proj, i) => (
          <div key={i} style={styles.project}>
            <h3 style={styles.h3}>{proj.title}</h3>
            <p style={{...styles.p, ...styles.projectTechStack}}>Tech Stack: {proj.tags.join(', ')}</p>
            <p style={{...styles.p, ...styles.projectDescription}}>{proj.description}</p>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Education</h2>
        {education.map((edu, i) => (
          <div key={i} style={styles.eduItem}>
            <h3 style={styles.h3}>{edu.institution}</h3>
            <p style={styles.p}>{edu.degree} - {edu.details}</p>
            <p style={{...styles.p, ...styles.period}}>{edu.period}</p>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Certifications</h2>
        <ul style={styles.ul}>
          {certifications.map((cert, i) => (
            <li style={styles.li} key={i}>{cert.name} - {cert.issuer} ({cert.date})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumePDF;