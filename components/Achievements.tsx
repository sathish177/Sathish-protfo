import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../constants';

const Achievements: React.FC = () => {
    const duplicatedAchievements = [...achievements, ...achievements];

    return (
        <section id="achievements" className="py-12 bg-light-surface dark:bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex animate-marquee"
                    >
                        {duplicatedAchievements.map((achievement, index) => {
                            const Icon = achievement.icon;
                            return (
                                <div key={index} className="flex-shrink-0 mx-8 flex items-center space-x-4">
                                    <Icon className="text-primary w-8 h-8" />
                                    <span className="text-lg font-medium text-light-text-secondary dark:text-text-secondary whitespace-nowrap">{achievement.text}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-light-surface dark:from-surface via-transparent to-light-surface dark:to-surface pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;