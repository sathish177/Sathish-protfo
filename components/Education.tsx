import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { education, certifications } from '../constants';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
        >
            Education & Certifications
        </motion.h2>
        <motion.div 
            className="w-24 h-1 bg-primary mx-auto mb-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{delay: 0.2}}
        ></motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.2 }}
            >
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                    <GraduationCap className="text-primary mr-3" size={28}/> Education
                </h3>
                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <motion.div key={index} className="bg-light-surface dark:bg-surface p-4 rounded-lg" variants={itemVariants}>
                            <h4 className="font-bold text-lg">{edu.institution}</h4>
                            <p className="text-primary font-medium">{edu.degree}</p>
                            <p className="text-sm text-light-text-secondary dark:text-text-secondary">{edu.period} - {edu.details}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.2 }}
            >
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                    <Award className="text-primary mr-3" size={28}/> Certifications
                </h3>
                <div className="space-y-4">
                    {certifications.map((cert, index) => (
                        <motion.div key={index} className="bg-light-surface dark:bg-surface p-4 rounded-lg flex items-start gap-4" variants={itemVariants}>
                            <div className="mt-1">
                                <Award className="text-secondary" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold">{cert.name}</h4>
                                <p className="text-sm text-light-text-secondary dark:text-text-secondary">{cert.issuer} - {cert.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;