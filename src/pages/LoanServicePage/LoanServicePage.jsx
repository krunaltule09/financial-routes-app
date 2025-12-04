import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components';
import styles from './LoanServicePage.module.css';
import OfferCard from '../../components/OfferCard/OfferCard';

/**
 * LoanServicePage component that displays loan service information
 * This page shows company information, loan details, and analysis
 */
const LoanServicePage = () => {
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const analysisVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 80,
        delay: 0.8
      }
    }
  };

  const animationBoxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 70,
        delay: 1.2,
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };
  
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 5,
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  return (
    <div className={styles.loanServiceContainer}>
      <Header />
      
      <motion.main 
        className={styles.mainContent}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.h1 
          className={styles.companyTitle}
          variants={titleVariants}
        >
          Vertex Logistics Corp
        </motion.h1>
        
        <div className={styles.cardsContainer}>
          <OfferCard 
            title="Working Capital Loan" 
            value="$250M" 
            position="left"
          />
          
          <OfferCard 
            title="Servicing Cycle" 
            value="Q3 Review - In Progress" 
            position="right"
          />
        </div>
        
        <motion.div 
          className={styles.analysisText}
          variants={analysisVariants}
        >
          Analysing
        </motion.div>
        
        <motion.div 
          className={styles.animationBox}
          variants={animationBoxVariants}
        >
          <div className={styles.animationContent}>
            <motion.div className={styles.animationHeader} variants={textItemVariants}>
              <span>Animation plays →</span>
            </motion.div>
            <div className={styles.animationList}>
              <motion.div className={styles.sparkleIconContainer} variants={sparkleVariants}>
                <span className={styles.sparkleIcon}>✨</span>
              </motion.div>
              <ul>
                <motion.li variants={textItemVariants}>A blue AR grid sweeps over a virtual loan document.</motion.li>
                <motion.li variants={textItemVariants}>Text blocks illuminate and resolve into readable areas.</motion.li>
                <motion.li variants={textItemVariants}>Detected keywords float onto the screen:</motion.li>
                <motion.li className={styles.indentedItem} variants={textItemVariants}>"Loan Agreement Identified"</motion.li>
                <motion.li className={styles.indentedItem} variants={textItemVariants}>"Covenants Found: 3"</motion.li>
                <motion.li className={styles.indentedItem} variants={textItemVariants}>"Required FR Y-14 Fields: 11"</motion.li>
                <motion.li className={styles.indentedItem} variants={textItemVariants}>"Document Integrity: 100% Verified"</motion.li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.main>
      
      {/* Placeholder for future background */}
      <div className={styles.backgroundPlaceholder}></div>
    </div>
  );
};

export default LoanServicePage;
