import { Github, Linkedin, Mail, Phone, Code, Cpu, Database, Server, Wrench, Shield, Bot, GraduationCap, Award, Briefcase, Star, Blocks, Mountain, Scan, Languages, Waves } from 'lucide-react';

export const personalInfo = {
  name: "Sathish M.",
  titles: ["Full Stack Developer", "AI/ML Enthusiast", "DevOps Automation Adept"],
  summary: "Motivated and detail-oriented Full Stack Developer with practical experience building scalable web applications using React.js, Node.js and PostgreSQL. Skilled in designing intuitive UIs, developing secure REST APIs, and collaborating in Agile teams. Experienced in AI-powered chatbot development using NLP and Machine Learning for EdTech solutions. Currently learning DevOps practices and actively developing an automated DevOps agent using Agentic AI solutions to streamline software delivery and deployment processes. Passionate about integrating advanced AI and DevOps technologies to create efficient, scalable, and intelligent digital products.",
  contacts: [
    { icon: Phone, text: "6384574029", href: "tel:6384574029" },
    { icon: Mail, text: "msathishrajam19@gmail.com", href: "mailto:msathishrajam19@gmail.com" },
    { icon: Linkedin, text: "linkedin.com/in/sathish-m-6a5022331", href: "https://linkedin.com/in/sathish-m-6a5022331" },
    { icon: Github, text: "GitHub - MSathish01", href: "https://github.com/MSathish01" },
  ],
};

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Image Magic', href: '#image-editor'},
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const skills = [
  { 
    category: "Full Stack Development", 
    icon: Code,
    items: ["React.js", "Node.js", "Express.js", "REST APIs", "Redux", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"]
  },
  { 
    category: "Backend & Database", 
    icon: Server,
    items: ["SQL", "PostgreSQL", "MongoDB", "API Security", "JWT"]
  },
  { 
    category: "AI & Machine Learning", 
    icon: Cpu,
    items: ["Python", "Machine Learning", "NLP", "Dialogflow", "Model Training", "Scikit-learn", "Flask", "Google Gemini AI"]
  },
  { 
    category: "Tools & Platforms",
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", "Firebase", "Docker", "Cursor", "Kiro", "Vite"]
  },
];

export const experiences = [
  {
    role: "Full-Stack Developer",
    company: "One Yes Infotech Solution Pvt.Ltd",
    period: "Mar 2025 - Apr 2025",
    location: "Chennai, Tamil Nadu",
    description: [
      "Developed an interactive EdTech platform using React.js, Node.js, and PostgreSQL, with features like live quizzes, gamification, and progress tracking.",
      "Built responsive UI and secure REST APIs, implemented JWT-based authentication, optimized SQL queries, and collaborated in an Agile environment."
    ]
  },
  {
    role: "Chatbot Developer (AI/ML)",
    company: "Edunet Foundation",
    period: "Nov 2024 - Feb 2025",
    location: "Remote",
    description: [
      "Designed and deployed an AI-powered chatbot for student support using NLP, Machine Learning, and Dialogflow, enabling real-time query resolution.",
      "Trained ML models on academic datasets to improve chatbot accuracy; integrated the bot with web platforms using Python, Flask, and REST APIs."
    ]
  }
];

export const projects = [
  {
    title: "Blockchain SCM for Agriculture",
    icon: Blocks,
    description: "Developed a decentralized supply chain management system using blockchain to ensure transparency and traceability for agricultural products from farm to table.",
    tags: ["Blockchain", "Supply Chain", "React", "Node.js", "Solidity"],
    github: "https://github.com/MSathish01",
    image: "https://picsum.photos/seed/blockchain-scm/600/400"
  },
  {
    title: "Rockfall Prediction System",
    icon: Mountain,
    description: "Engineered an AI-powered system to predict rockfall events in open-pit mines, analyzing geological data to enhance safety and prevent accidents.",
    tags: ["Machine Learning", "Python", "Data Analysis", "Safety", "Scikit-learn"],
    github: "https://github.com/MSathish01",
    image: "https://picsum.photos/seed/rockfall-prediction/600/400"
  },
  {
    title: "Mining Activity Detection & 3D Visualization",
    icon: Scan,
    description: "Created a system for detecting open crust mining activities from satellite imagery and generating interactive 3D visualizations of the mining sites.",
    tags: ["Computer Vision", "3D Visualization", "Python", "OpenCV", "Satellite Imagery"],
    github: "https://github.com/MSathish01",
    image: "https://picsum.photos/seed/mining-detection/600/400"
  },
  {
    title: "LLM Vulnerability Scanner",
    icon: Shield,
    description: "Implemented an advanced vulnerability scanner that leverages Large Language Models (LLMs) to detect complex security flaws in source code with high accuracy.",
    tags: ["AI", "Cybersecurity", "LLM", "Google Gemini AI", "Python"],
    github: "https://github.com/MSathish01",
    image: "https://picsum.photos/seed/llm-scanner/600/400"
  },
  {
    title: "Autonomous DevOps Agent",
    icon: Bot,
    description: "Built an autonomous DevOps agent using Agentic AI concepts to automate software deployment, monitoring, and CI/CD pipeline management.",
    tags: ["Agentic AI", "DevOps", "CI/CD", "Automation", "Python"],
    github: "https://github.com/MSathish01",
    image: "https://picsum.photos/seed/auto-devops/600/400"
  },
  {
    title: "Speaker Identification & Translation System",
    icon: Languages,
    description: "Developed a comprehensive system for language-agnostic speaker identification and diarization, followed by accurate transcription and translation of speech.",
    tags: ["Speech Processing", "AI", "NLP", "Python", "Machine Learning"],
    github: "https://github.com/MSathish01",
    image: "https://picsum.photos/seed/speaker-id/600/400"
  },
  {
    title: "Underwater Object Detection AI",
    icon: Waves,
    description: "Designed an AI solution for underwater domain awareness, capable of detecting and classifying objects using underwater acoustic data (sonar).",
    tags: ["AI", "Signal Processing", "Machine Learning", "Python", "Acoustics"],
    github: "https://github.com/MSathish01",
    image: "https://picsum.photos/seed/underwater-ai/600/400"
  }
];

export const education = [
    {
      institution: "Sri Venkateshwaraa College of Engineering and Technology, Puducherry",
      degree: "B.Tech - Computer Science and Engineering",
      period: "Present",
      details: "CGPA: 8.5"
    },
    {
      institution: "Jeevandham Gov Hr. Sec School, Puducherry",
      degree: "HSC",
      period: "May 2023",
      details: "Percentage: 74.3"
    },
    {
      institution: "T.S.M. Gov Hr. School, Puducherry",
      degree: "SSLC",
      period: "May 2023",
      details: "Percentage: 75"
    }
];

export const certifications = [
    { name: "Networking Cloud Virtual Internship", issuer: "Juniper", date: "Mar 2025" },
    { name: "Cybersecurity Virtual Internship", issuer: "Palo Alto", date: "Feb 2025" },
    { name: "Developing Interpersonal Skill", issuer: "IBM", date: "Oct 2024" },
    { name: "Honours Diploma in Full Stack Developer", issuer: "CSC", date: "Sep 2023" },
    { name: "Python Development", issuer: "GUVI", date: "July 2023" }
];

export const achievements = [
    { icon: Award, text: "Best Technical Approach Award at Agentic AI Hackathon 2025" },
    { icon: Briefcase, text: "Successfully participated in IDE Bootcamp, organized by AICTE" },
    { icon: Star, text: "2nd Runner-Up in event hosted by One Yes Infotech Solutions" },
    { icon: Award, text: "Participated in Smart India Hackathon (SIH) 2023" }
];