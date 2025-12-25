import React from 'react';
import { motion } from 'framer-motion';
import styles from './DeepDiveCard.module.css';

/**
 * DeepDiveCard component for displaying financial metrics
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the card (e.g., "Revenue")
 * @param {string} props.value - Value to display (e.g., "$12.5B")
 * @param {string} props.position - Optional position for animation sequencing
 * @param {boolean} props.isVisible - Whether the card should be visible
 */
const DeepDiveCard = ({ title, value, position = 0, isVisible = false }) => {
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 150,
        delay: 0.2 + (position * 0.1),
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.3 + (position * 0.1),
        duration: 0.5
      }
    }
  };


  return (
    <motion.div 
      className={styles.cardContainer}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
    >
      <motion.div 
        className={styles.card}
      >
        {/* SVG Background */}
        <img
          src="/assets/animated-svg/Deep Dive _UI.svg"
          alt="Deep dive card border"
          className={styles.cardBorder}
          draggable={false}
        />
        
        {/* Content */}
        <motion.div className={styles.cardContent} variants={textVariants}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardValue}>{value}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DeepDiveCard;
