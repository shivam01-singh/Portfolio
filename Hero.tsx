import React, { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"
      ref={heroRef}
    >
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full -top-20 -left-20 mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full top-40 right-10 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-pink-400 rounded-full bottom-10 left-40 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center opacity-0 transition-opacity duration-1000">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shivam</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            I create beautiful, functional, and user-centered digital experiences
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#projects" 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <button 
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowDownCircle size={36} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
