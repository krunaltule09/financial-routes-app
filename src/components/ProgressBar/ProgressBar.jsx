import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './ProgressBar.module.css';

/**
 * ProgressBar component for displaying progress
 * @param {Object} props - Component props
 * @param {number} props.percentage - Progress percentage (0-100)
 * @param {string} props.label - Label for the progress bar
 */
const ProgressBar = ({ percentage = 0, label = 'Progress' }) => {
  const controls = useAnimation();
  const prevPercentage = useRef(percentage);
  
  useEffect(() => {
    // Animate the progress bar when percentage changes
    controls.start({ 
      width: `${percentage}%`,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    });
    
    prevPercentage.current = percentage;
  }, [percentage, controls]);
  
  // Animation variants for label and percentage
  const textVariants = {
    initial: { opacity: 0.7 },
    complete: { 
      opacity: 1,
      color: "#FFFFFF",
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className={styles.progressContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.progressHeader}>
        <motion.span 
          className={styles.progressLabel}
          animate={percentage === 100 ? "complete" : "initial"}
          variants={textVariants}
          whileHover={{ scale: 1.05, color: '#FFE600' }}
        >
          {label}
        </motion.span>
        <motion.span 
          className={styles.progressPercentage}
          animate={percentage === 100 ? "complete" : "initial"}
          variants={textVariants}
          whileHover={{ scale: 1.1 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <motion.div 
        className={styles.progressBarContainer}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className={styles.progressBar} 
          initial={{ width: `${prevPercentage.current}%` }}
          animate={controls}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProgressBar;
