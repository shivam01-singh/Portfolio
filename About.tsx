import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });
    
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    
    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000"
        ref={aboutRef}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-xl transform transition-transform duration-500 hover:scale-105">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                    alt="Shivam" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2023
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I'm a passionate web developer and designer with a strong focus on creating intuitive, user-friendly digital experiences that solve real-world problems.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                With expertise in modern web technologies and a keen eye for design, I build solutions that are not only functional but also aesthetically pleasing.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities to stay inspired.
              </p>
              
              <div className="mt-8 flex gap-4">
                <a 
                  href="#contact" 
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get In Touch
                </a>
                <a 
                  href="#resume" 
                  className="px-6 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
