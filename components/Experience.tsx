import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experiences } from '../constants';

const TimelineItem: React.FC<{ exp: typeof experiences[0], index: number }> = ({ exp, index }) => {
    const isLeft = index % 2 === 0;

    const content = (
        <div className={`p-6 bg-light-surface dark:bg-surface rounded-lg shadow-lg border border-primary/20 w-full`}>
            <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
            <p className="font-semibold mb-1">{exp.company}</p>
            <p className="text-sm text-light-text-secondary dark:text-text-secondary mb-3">{exp.period} | {exp.location}</p>
            <ul className="space-y-2 text-left list-disc list-inside">
                {exp.description.map((point, i) => (
                    <li key={i} className="text-light-text-secondary dark:text-text-secondary">{point}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="flex md:justify-center items-center w-full">
            <div className="w-full md:w-1/2 flex justify-end md:pr-8">
                {isLeft && content}
            </div>
            <motion.div 
              className="hidden md:flex relative w-12 h-12 bg-light-surface dark:bg-surface rounded-full items-center justify-center z-10 border-2 border-primary"
              whileInView={{ scale: [1, 1.2, 1], boxShadow: ["0 0 0px rgba(139, 92, 246, 0)", "0 0 20px rgba(139, 92, 246, 0.7)", "0 0 0px rgba(139, 92, 246, 0)"] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              viewport={{ once: true }}
            >
                <Briefcase className="text-primary" size={24} />
            </motion.div>
            <div className="w-full md:w-1/2 flex justify-start md:pl-8">
                {!isLeft && content}
            </div>
        </div>
    );
};

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-center mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Work Experience
                </motion.h2>
                <motion.div
                    className="w-24 h-1 bg-primary mx-auto mb-16"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>

                <div className="relative">
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-light-surface dark:bg-surface -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ duration: 0.6 }}
                            >
                              <TimelineItem exp={exp} index={index} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
