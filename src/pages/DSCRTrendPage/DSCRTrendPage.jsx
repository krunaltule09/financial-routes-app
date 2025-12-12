import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import SidebarItem from '../../components/SidebarItem/SidebarItem';
import { Snackbar, Alert } from '@mui/material';
// SSE Status removed
import styles from './DSCRTrendPage.module.css';

/**
 * DSCRTrendPage component for displaying DSCR trend analysis
 */
const DSCRTrendPage = () => {
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(2); // Operational Docx Scan is active by default
  const [navigationEvent, setNavigationEvent] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  // Listen for navigation events
  useEffect(() => {
    const handleSSENavigation = (event) => {
      const { sourceAppId, route, timestamp, data } = event.detail;
      
      if (route === '/dscr-trend') {
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
  
  // Handle tab click
  const handleTabClick = (index) => {
    if (index === 1) { // Financial Statement Scan tab
      navigate('/financial-statement');
    } else if (index === 3) { // Y-14 Report Generation tab
      navigate('/y14-report/large');
    } else if (index === 4) { // Covenant Monitoring tab
      navigate('/covenant-monitoring');
    } else if (index === 2) { // Already on Operational Docx Scan tab
      navigate('/dscr-trend');
    } else if (index === 5) { // Benefits Summary tab
      navigate('/benefits-summary');
    } else {
      setActiveTabIndex(index);
      // For future implementation of other tabs
    }
  };
  
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 80,
        delay: 0.4
      }
    }
  };

  // Sidebar navigation items
  const sidebarItems = [
    { sublabel: '1', label: 'Welcome', completed: true },
    { sublabel: '2', label: 'Financial Statement Scan', completed: true },
    { sublabel: '3', label: 'Operational Docx Scan', completed: true },
    { sublabel: '4', label: 'Y-14 Report Generation', completed: true },
    { sublabel: '5', label: 'Covenant Monitoring', completed: true },
    { sublabel: '6', label: 'Benefits Summary', completed: true }
  ];

  // Using SVG for chart visualization

  return (
    <div className={styles.dscrTrendContainer}>
      <Header />
      
      <motion.main 
        className={styles.mainContent}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* Sidebar Navigation */}
        <div className={styles.sidebar}>
          {sidebarItems.map((item, index) => (
            <SidebarItem 
              key={index}
              sublabel={item.sublabel}
              label={item.label}
              active={activeTabIndex === index}
              completed={item.completed}
              index={index}
              onClick={handleTabClick}
            />
          ))}
        </div>
        
        {/* Main Content Area */}
        <div className={styles.contentArea}>
          {/* Page Title */}
          <motion.div 
            className={styles.pageTitle}
            variants={titleVariants}
          >
            <h1>Covenant Monitoring - DSCR Trend</h1>
            <p className={styles.pageDescription}>Description text here</p>
          </motion.div>
          
          {/* Content Sections */}
          <div className={styles.contentSections}>
            <div className={styles.trendContainer}>
              {/* Left Column - Trend Analysis */}
              <motion.div 
                className={styles.trendAnalysisColumn}
                variants={sectionVariants}
              >

               
                
                <div className={styles.chartContainer}>
                  {/* Chart visualization */}
                  <div className={styles.chart}>
                    <motion.img 
                      src="/assets/graph.svg" 
                      alt="DSCR Trend Graph" 
                      className={styles.graphSvg}
                      initial={{ opacity: 0, scale: 0.8, x: -50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 100, 
                        damping: 15,
                        delay: 0.6
                      }}
                      whileHover={{ 
                        scale: 1.03
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Alert */}
              <motion.div 
                className={styles.alertColumn}
                variants={sectionVariants}
              >
                <h2 className={styles.columnTitleAlert}>
                  Alert
                </h2>
                <div className={styles.alertContainer}>
                  <img 
                    src="/assets/alert.svg" 
                    alt="Alert Border" 
                    className={styles.alertBorderSvg}
                  />
                  <div className={styles.alertContent}>
                    <motion.div 
                      className={styles.alertIconContainer}
                      animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        repeatDelay: 1
                      }}
                    >
                      <img 
                        src="/assets/alert-icon.svg" 
                        alt="Alert Icon" 
                        className={styles.alertIcon} 
                      />
                    </motion.div>
                    <h3 className={styles.alertTitle}>Potential breach detected - DSCR dropped below covenant level.</h3>
                    <p className={styles.alertDescription}>
                      Immediate attention required for corrective action planning.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Q3 Highlight Section */}
            <motion.div 
              className={styles.highlightSection}
              variants={sectionVariants}
            >
              <h2 className={styles.columnTitle}>
                Q3 Highlight
              </h2>
              <div className={styles.highlightContainer}>
                <motion.div 
                  className={styles.highlightIcon}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 5
                  }}
                >
                  <img 
                    src="/assets/q3-highlight.svg" 
                    alt="Q3 Highlight"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      
      {/* Background placeholder */}
      <div className={styles.backgroundPlaceholder}></div>
      
      {/* Navigation info removed */}
      
      {/* SSE Status removed */}
      
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

export default DSCRTrendPage;
