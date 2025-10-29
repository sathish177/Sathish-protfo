import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { projects } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.8 },
};


const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

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
    
    const Icon = project.icon;

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
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden rounded-lg shadow-xl bg-light-surface dark:bg-background border border-primary/20 h-full flex flex-col"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(350px at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
                    ),
                }}
            />
            <div className="w-full h-48 overflow-hidden" style={{transform: "translateZ(20px)"}}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
            </div>
            <div className="p-6 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-center mb-4">
                <Icon className="text-primary mr-3" size={28} />
                <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-light-text-secondary dark:text-text-secondary hover:text-primary transition-colors duration-300">
                  <Github size={24} />
                </a>
              </div>
              <p className="text-light-text-secondary dark:text-text-secondary mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-primary/20 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
        </motion.div>
    );
};


const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 lg:py-32 bg-light-surface dark:bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" variants={cardVariants}>
            My Projects
          </motion.h2>
          <motion.div className="w-24 h-1 bg-primary mx-auto mb-12" variants={cardVariants}></motion.div>
          
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  activeFilter === tag 
                    ? 'bg-primary text-white' 
                    : 'bg-light-background dark:bg-background text-light-text-secondary dark:text-text-secondary hover:bg-primary/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;