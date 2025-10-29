import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { skills } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const SkillCard: React.FC<{ skillCategory: typeof skills[0] }> = ({ skillCategory }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const mouseXVal = e.clientX - left;
        const mouseYVal = e.clientY - top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        mouseX.set(0);
        mouseY.set(0);
    };

    const Icon = skillCategory.icon;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            variants={cardVariants}
            className="group relative bg-light-surface dark:bg-background p-6 rounded-lg shadow-xl border border-primary/20 overflow-hidden"
        >
             <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(400px at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
                    ),
                }}
            />
             <div style={{
                transform: "translateZ(50px)",
                transformStyle: "preserve-3d",
            }}>
                <div className="flex items-center mb-4">
                  <Icon className="text-primary mr-4" size={32} />
                  <h3 className="text-xl font-bold">{skillCategory.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skillCategory.items.map((item, i) => (
                    <li key={i} className="flex items-center text-light-text-secondary dark:text-text-secondary">
                      <span className="text-secondary mr-2">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
            </div>
        </motion.div>
    );
};


const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-light-surface dark:bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" variants={cardVariants}>
            Technical Skills
          </motion.h2>
          <motion.div className="w-24 h-1 bg-primary mx-auto mb-12" variants={cardVariants}></motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {skills.map((skillCategory, index) => (
              <SkillCard key={index} skillCategory={skillCategory} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;