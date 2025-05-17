import { useEffect } from 'react';

// Configure the animation delays for staggered animations
export const configureAnimationDelays = () => {
  const style = document.createElement('style');
  style.textContent = `
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    .animate-blob {
      animation: blob-animation 7s infinite;
    }
    .animate-fadeIn {
      animation: fade-in 1s ease-out forwards;
    }
    @keyframes blob-animation {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    @keyframes fade-in {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
};

// Hook to handle scroll-triggered animations
export const useScrollAnimation = (selector: string) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector]);
};

// Typed text animation setup
export const setupTypedTextAnimation = (element: HTMLElement, texts: string[], typeSpeed = 100, backSpeed = 50, backDelay = 1000) => {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  const type = () => {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, backDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? backSpeed : typeSpeed);
    }
  };
  
  setTimeout(type, 1000);
};
