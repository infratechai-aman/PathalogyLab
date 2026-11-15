import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';

// Emil Kowalski easings
export const EASE_OUT = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];
export const EASE_SPRING = { type: 'spring', duration: 0.5, bounce: 0.2 };

// Fade-up preset (enter animations: ease-out, transform + opacity only)
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

// Fade-in preset
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

// Scale-in preset (for cards, modals)
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

// Slide-right preset
export const slideRight = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

// Stagger container
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

// Hook: triggers animation when element enters viewport
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px', amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    // Emil: reduced motion — keep fade (aids comprehension), drop transform
    if (isInView) controls.start(shouldReduceMotion ? 'visible' : 'visible');
  }, [isInView, controls, shouldReduceMotion]);

  return { ref, controls, shouldReduceMotion };
}

// Animated section wrapper
export function RevealSection({ children, variants = fadeUp, className = '', delay = 0 }) {
  const { ref, controls } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        ...variants,
        visible: { ...variants.visible, transition: { ...variants.visible?.transition, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger children wrapper
export function StaggerReveal({ children, stagger = 0.08, delay = 0, className = '' }) {
  const { ref, controls } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer(stagger, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated counter
export function AnimatedCounter({ to, suffix = '', prefix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(to);
    const stepTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// Parallax wrapper (uses scroll transform)
export function ParallaxLayer({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const relativeY = scrolled - (rect.top + scrolled - window.innerHeight / 2);
      setOffset(relativeY * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
