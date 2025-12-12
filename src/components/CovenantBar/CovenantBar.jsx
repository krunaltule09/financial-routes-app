import React from 'react';
import { motion } from 'framer-motion';
import styles from './CovenantBar.module.css';

/**
 * CovenantBar component for displaying covenant metrics
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the covenant
 * @param {number} props.value - Current value
 * @param {number} props.limit - Limit value (optional)
 * @param {boolean} props.isGood - Whether the current value is good (green) or bad (red)
 * @param {number} props.percentage - Width percentage for the bar (0-100)
 */
const CovenantBar = ({ label, value, limit, isGood = true, percentage = 50 }) => {
  // Animation variants
  const barVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: `${percentage}%`,
      opacity: 1,
      transition: {
        width: {
          duration: 1.5,
          ease: "easeOut",
          delay: 0.3
        },
        opacity: {
          duration: 0.5,
          ease: "easeIn"
        }
      }
    }
  };
  
  // Label and value animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    }
  };

  // Format the display value
  const displayValue = limit ? `${value} (Limit ${limit})` : `${value}`;

  return (
    <motion.div 
      className={styles.covenantBarWrapper}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      whileHover={{ 
        scale: 1.03,
        x: 10,
        transition: { type: 'spring', stiffness: 300 }
      }}
    >
      <div className={styles.covenantBarContainer}>
        <motion.div 
          className={styles.labelContainer}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          whileHover={{ scale: 1.05, color: '#FFE600' }}
        >
          <span className={styles.label}>{label}</span>
        </motion.div>
        <motion.div 
          className={styles.barContainer}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className={`${styles.bar} ${isGood ? styles.goodBar : styles.badBar}`}
            initial="hidden"
            animate={{
              width: `${percentage}%`,
              opacity: 1
            }}
            transition={{
              width: {
                duration: 1.5,
                ease: "easeOut",
                delay: 0.3
              },
              opacity: {
                duration: 0.5,
                ease: "easeIn"
              }
            }}
          />
        </motion.div>
        <motion.div 
          className={styles.valueContainer}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          whileHover={{ scale: 1.1, color: '#32FFFF' }}
        >
          <span className={styles.value}>{displayValue}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CovenantBar;
