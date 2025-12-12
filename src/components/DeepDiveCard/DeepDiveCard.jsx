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
        <svg className={styles.cardBorder} width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M402.942 406.782H122.121V406.097H402.115V122.268H402.942V406.782Z" fill="#FFE600"/>
          <path d="M122.122 406.782H71.5662L8.77734 354.756V59.028L80.0169 0H402.944V88.0402H402.116V0.68553H80.3714L9.60469 59.3218V354.462L71.8912 406.096H122.122V406.782Z" fill="#FFE600"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M403.227 122.271C394.168 122.271 386.793 114.89 386.793 105.826C386.793 96.7615 394.168 89.3809 403.227 89.3809C412.308 89.3809 419.683 96.7615 419.683 105.826C419.683 114.89 412.308 122.271 403.227 122.271ZM403.227 90.0267C394.514 90.0267 387.438 97.1075 387.438 105.826C387.438 114.544 394.514 121.625 403.227 121.625C411.939 121.625 419.038 114.544 419.038 105.826C419.038 97.1075 411.939 90.0267 403.227 90.0267Z" fill="#FFE600"/>
          <path d="M411.992 105.531C411.992 100.532 407.885 96.4922 402.803 96.4922C397.75 96.4922 393.613 100.532 393.613 105.531C393.613 110.53 397.75 114.57 402.803 114.57C407.885 114.57 411.992 110.53 411.992 105.531Z" fill="#FFE600"/>
          <path d="M18.3786 264.787C18.3786 259.788 14.242 255.748 9.18932 255.748C4.10712 255.748 0 259.788 0 264.787C0 269.786 4.10712 273.826 9.18932 273.826C14.242 273.826 18.3786 269.786 18.3786 264.787Z" fill="#FFE600"/>
          <path d="M24.6649 71.3418C24.2229 71.3418 23.8104 71.2201 23.4862 70.9522C22.8379 70.4165 22.8379 69.5643 23.4862 69.0286L90.4074 13.7314C90.7021 13.4879 91.1441 13.3418 91.5567 13.3418H354.379C355.263 13.3418 356 13.9505 356 14.7054C356 15.4602 355.263 16.0689 354.379 16.0689H92.2639L25.8141 70.9522C25.49 71.2201 25.0775 71.3418 24.6649 71.3418Z" fill="#32FFFF"/>
          <path d="M9.1875 46.6172L63.1875 1.61719H9.1875V46.6172Z" fill="#FFE600"/>
          <g opacity="0.6">
            <path d="M122.12 419.684H60.0112L59.8635 419.586L2.77734 371.404L3.3683 370.914L60.3362 418.998H122.12V419.684Z" fill="#FFE600"/>
          </g>
        </svg>
        
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
