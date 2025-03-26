
import { ReactNode, useEffect, useState } from 'react';

interface TransitionProps {
  children: ReactNode;
  location: string;
}

export function Transition({ children, location }: TransitionProps) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  
  useEffect(() => {
    if (location !== displayChildren.props.location) {
      setTransitionStage('fadeOut');
      
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('fadeIn');
      }, 300); // Match with CSS transition duration
      
      return () => clearTimeout(timeout);
    }
  }, [children, displayChildren.props.location, location]);
  
  return (
    <div className={`transition-wrapper ${transitionStage}`}>
      {displayChildren}
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={`transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );
}
