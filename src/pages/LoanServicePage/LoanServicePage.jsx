import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components';
import styles from './LoanServicePage.module.css';
import OfferCard from '../../components/OfferCard/OfferCard';
import { Snackbar, Alert } from '@mui/material';
import SSEStatus from '../../components/SSEStatus';

/**
 * LoanServicePage component that displays loan service information
 * This page shows company information, loan details, and analysis
 */
const LoanServicePage = () => {
  const [navigationEvent, setNavigationEvent] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  // Listen for navigation events
  useEffect(() => {
    const handleSSENavigation = (event) => {
      const { sourceAppId, route, timestamp, data } = event.detail;
      
      if (route === '/loan-service') {
        setNavigationEvent({
          sourceAppId,
          timestamp: new Date(timestamp).toLocaleTimeString(),
          referrer: data?.referrer || 'unknown',
          action: data?.action || 'NAVIGATE'
        });
        
        setNotification({
          open: true,
          message: `Navigated from ${sourceAppId || 'unknown'} app`,
          severity: 'info'
        });
      }
    };
    
    // Add event listener
    window.addEventListener('sse-navigation', handleSSENavigation);
    
    // Cleanup
    return () => {
      window.removeEventListener('sse-navigation', handleSSENavigation);
    };
  }, []);
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
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
        <motion.button
          whileHover={{ scale: 1.07, boxShadow: '0 4px 24px 0 rgba(255,153,0,0.25)' }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.3 }}
          style={{
            position: 'fixed',
            right: '48px',
            bottom: '48px',
            left: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24.1px 48.2px',
            gap: '14.22px',
            width: '149.43px',
            height: '60px',
            background: 'linear-gradient(0deg, rgba(29, 29, 29, 0.2), rgba(29, 29, 29, 0.2)), #1D1D1D',
            backgroundBlendMode: 'color-burn, plus-lighter',
            boxShadow: 'inset 6.03px 6.03px 1px -7.03px rgba(255,255,255,0.5), inset 4.02px 4.02px 2.01px -4.02px #B3B3B3, inset -4.02px -4.02px 2.01px -4.02px #B3B3B3, inset 0px 0px 44.20px rgba(242,242,242,0.5)',
            backdropFilter: 'blur(40.18px)',
            borderRadius: '200.89px',
            color: '#fff',
            fontWeight: 600,
            fontSize: 20,
            border: 'none',
            cursor: 'pointer',
            zIndex: 30
          }}
          onClick={() => window.location.assign('/financial-statement')}
        >
          Next
        </motion.button>
      </motion.main>
      
      {/* Placeholder for future background */}
      <div className={styles.backgroundPlaceholder}></div>
      
      {/* Navigation info */}
      {navigationEvent && (
        <motion.div 
          className={styles.navigationInfo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '10px 15px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            zIndex: 100
          }}
        >
          <p><strong>Source:</strong> {navigationEvent.sourceAppId}</p>
          <p><strong>Time:</strong> {navigationEvent.timestamp}</p>
          <p><strong>Referrer:</strong> {navigationEvent.referrer}</p>
          <p><strong>Action:</strong> {navigationEvent.action}</p>
        </motion.div>
      )}
      
      {/* SSE Status (only visible in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ position: 'fixed', bottom: '10px', left: '10px', zIndex: 1000 }}>
          <SSEStatus showEvents={true} />
        </div>
      )}
      
      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoanServicePage;
