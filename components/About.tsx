import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" variants={itemVariants}>
            About Me
          </motion.h2>
          <motion.div className="w-24 h-1 bg-primary mx-auto mb-12" variants={itemVariants}></motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div className="lg:col-span-2" variants={itemVariants}>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full transform -rotate-12"></div>
                    <img
                        src="https://picsum.photos/400/400"
                        alt="Sathish M."
                        className="relative w-full h-full object-cover rounded-full border-4 border-light-surface dark:border-surface"
                    />
                </div>
            </motion.div>
            <motion.div className="lg:col-span-3 space-y-6" variants={itemVariants}>
                <p className="text-lg text-light-text-secondary dark:text-text-secondary leading-relaxed">
                    {personalInfo.summary}
                </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;