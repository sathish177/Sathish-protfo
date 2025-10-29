import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../constants';
import { ArrowRight, Download, Loader } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ResumePDF from './ResumePDF';
import ReactDOM from 'react-dom/client';

const Magnetic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}
        >
            {children}
        </motion.div>
    );
};


const Hero: React.FC = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        x: number;
        y: number;
        directionX: number;
        directionY: number;
        size: number;
        color: string;

        constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx!.beginPath();
            ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx!.fillStyle = 'rgba(139, 92, 246, 0.5)';
            ctx!.fill();
        }

        update() {
            if (this.x > canvas!.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas!.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas!.height * canvas!.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = 'rgba(139, 92, 246, 0.5)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx!.clearRect(0,0,innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    })
  }, []);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const tick = () => {
    const toRotate = personalInfo.titles;
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };
  
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80; // Approximate header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    const resumeContainer = document.getElementById('resume-container');
    if (!resumeContainer) {
        console.error("Resume container not found");
        setIsDownloading(false);
        return;
    };

    // Style the container to be off-screen but renderable
    resumeContainer.style.position = 'absolute';
    resumeContainer.style.left = '-9999px';
    resumeContainer.style.top = '0px';

    const root = ReactDOM.createRoot(resumeContainer);
    
    try {
        root.render(<ResumePDF />);

        // Allow content to render before capturing
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(resumeContainer, { 
          scale: 2,
          useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('Sathish-M-Resume.pdf');
    } catch(error) {
        console.error("Error generating PDF:", error);
    } finally {
        root.unmount();
        // Reset styles
        resumeContainer.style.position = '';
        resumeContainer.style.left = '';
        resumeContainer.style.top = '';
        setIsDownloading(false);
    }
  };


  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-0">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-light-background/80 to-light-background dark:via-background/80 dark:to-background z-0"></div>
       
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-light-text-primary dark:text-text-primary">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-text-gradient bg-[200%_auto]">{personalInfo.name}</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-light-text-secondary dark:text-text-secondary h-12">
            <span className="border-r-2 border-primary">{text}</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-text-secondary mb-12">
            {personalInfo.summary.split('. ')[0]}.
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Magnetic>
              <motion.a
                href="#contact"
                onClick={(e) => handleCTAClick(e, '#contact')}
                className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-violet-500 transition-all duration-300 flex items-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                Contact Me <ArrowRight size={20} />
              </motion.a>
            </Magnetic>
             <Magnetic>
              <motion.button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="px-8 py-3 bg-light-surface dark:bg-surface text-light-text-primary dark:text-text-primary font-semibold rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.95 }}
              >
                {isDownloading ? (
                    <>
                        <Loader className="animate-spin" size={20} /> Downloading...
                    </>
                ) : (
                    <>
                        Download Resume <Download size={20} />
                    </>
                )}
              </motion.button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;