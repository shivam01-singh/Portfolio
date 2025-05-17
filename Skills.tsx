import React, { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const skills: Skill[] = [
    { name: 'HTML & CSS', level: 90, color: 'from-orange-500 to-red-500' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-500 to-amber-500' },
    { name: 'React', level: 80, color: 'from-cyan-500 to-blue-500' },
    { name: 'Node.js', level: 75, color: 'from-green-500 to-emerald-500' },
    { name: 'UI/UX Design', level: 85, color: 'from-purple-500 to-pink-500' },
    { name: 'Responsive Design', level: 90, color: 'from-blue-500 to-indigo-500' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          
          // Animate progress bars
          progressRefs.current.forEach((ref, index) => {
            if (ref) {
              setTimeout(() => {
                ref.style.width = `${skills[index].level}%`;
                ref.style.opacity = '1';
              }, 300 * index);
            }
          });
        }
      });
    }, { threshold: 0.1 });
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [skills]);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000"
        ref={skillsRef}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center">
            I specialize in these technologies and continuously enhance my skills to stay current with industry trends.
          </p>
          
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    ref={el => progressRefs.current[index] = el}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transform origin-left transition-all duration-1000 ease-out opacity-0 w-0`}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
            {['Figma', 'TypeScript', 'Git', 'MongoDB', 'Express', 'Tailwind CSS', 'SASS', 'GraphQL'].map((tool) => (
              <div 
                key={tool}
                className="bg-white dark:bg-gray-700 py-4 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-gray-800 dark:text-gray-200 font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
