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

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-light-surface dark:bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4" variants={itemVariants}>
            Get In Touch
          </motion.h2>
          <motion.div className="w-24 h-1 bg-primary mx-auto mb-8" variants={itemVariants}></motion.div>

          <motion.p className="max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-text-secondary mb-12" variants={itemVariants}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out to me.
          </motion.p>
          
          <motion.div className="flex justify-center items-center flex-wrap gap-6" variants={itemVariants}>
            {personalInfo.contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                    <motion.a 
                        key={index} 
                        href={contact.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors duration-300"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon size={32} />
                        <span className="text-sm mt-2 hidden sm:block">{contact.text}</span>
                    </motion.a>
                );
            })}
          </motion.div>
          
          <motion.a 
            href={`mailto:${personalInfo.contacts.find(c => c.icon.displayName === 'Mail')?.text}`} 
            className="mt-12 inline-block px-10 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-violet-500 transition-all duration-300 transform hover:scale-105"
            variants={itemVariants}
          >
            Say Hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;