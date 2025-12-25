import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import SidebarItem from '../../components/SidebarItem/SidebarItem';
import { Snackbar, Alert } from '@mui/material';
// SSE Status removed
import styles from './Y14ReportPage.module.css';

/**
 * Y14ReportPage component for displaying Y-14 report generation
 */
const Y14ReportPage = () => {
  const navigate = useNavigate();
  const [navigationEvent, setNavigationEvent] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  // Listen for navigation events
  useEffect(() => {
    const handleSSENavigation = (event) => {
      const { sourceAppId, route, timestamp, data } = event.detail;
      
      if (route === '/y14-report/large') {
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
  
  // State for progress and visible cards
  const [progress, setProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(3); // Y-14 Report Generation is active by default
  
  // Handle tab click
  const handleTabClick = (index) => {
    if (index === 1) { // Financial Statement Scan tab
      navigate('/financial-statement');
    } else if (index === 2) { // DSCR Trend tab
      navigate('/dscr-trend');
    } else if (index === 3) { // Y-14 Report Generation tab
      // Already on this page, do nothing
    } else if (index === 4) { // Covenant Monitoring tab
      navigate('/covenant-monitoring');
    } else if (index === 5) { // Benefits Summary tab
      navigate('/benefits-summary');
    } else {
      setActiveTabIndex(index);
      // For future implementation of other tabs
    }
  };

  // Effect to simulate progress and show cards one by one
  useEffect(() => {
    // Start with no cards visible
    setVisibleCards([]);
    setProgress(0);
    
    // Progress interval
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        
        // Show cards at specific progress points
        if (newProgress === 25) {
          setVisibleCards(prev => [...prev, 0]); // Show first card
        } else if (newProgress === 50) {
          setVisibleCards(prev => [...prev, 1]); // Show second card
        } else if (newProgress === 65) {
          setVisibleCards(prev => [...prev, 2]); // Show third card
        } else if (newProgress === 75) {
          setVisibleCards(prev => [...prev, 3]); // Show fourth card
        }
        
        // Stop at 100%
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        
        return newProgress;
      });
    }, 100); // Update every 100ms
    
    return () => clearInterval(progressInterval);
  }, []);
  
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

  // Sample covenant data
  const reportData = [
    { label: "Borrower's Debt/Equity ratio", value: "Exceeded the threshold (3.2 vs 3.0)." },
    { label: "DSCR", value: "Fell to 1.1 due to lower operating cash flow." },
    { label: "Operational covenant breach", value: "On-time delivery 93% (Target ≥95%)." },
    { label: "Corrective actions underway", value: "Capital injection + route optimization." }
  ];

  // Sidebar navigation items - exactly the same as FinancialStatementPage
  const sidebarItems = [
    { sublabel: '1', label: 'Welcome', completed: true },
    { sublabel: '2', label: 'Financial Statement Scan', completed: true },
    { sublabel: '3', label: 'Operational Docx Scan', completed: true },
    { sublabel: '4', label: 'Y-14 Report Generation', completed: true },
    { sublabel: '5', label: 'Covenant Monitoring', completed: true },
    { sublabel: '6', label: 'Benefits Summary', completed: true }
  ];

  return (
    <div className={styles.y14ReportContainer}>
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
            <h1>Y-14 Report Generation</h1>
            <p className={styles.pageDescription}>Description text here</p>
          </motion.div>
          
          {/* Content Sections */}
          <div className={styles.contentSections}>
            <div className={styles.reportContainer}>
              {/* Left Column - AI Draft */}
              <motion.div 
                className={styles.reportColumn}
                variants={sectionVariants}
              >
                <h2 className={styles.columnTitle}>AI Draft – FR Y-14 Report (Quarterly Submission)</h2>
                <div className={styles.reportCard}>
                  <div className={styles.reportImageContainer}>
                    <img 
                      src="/assets/ai-draft-doc.svg" 
                      alt="AI Draft - FR Y-14 Report" 
                      className={styles.reportImage} 
                    />
                  </div>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressInfo}>
                      <span className={styles.progressLabel}>Generating report...</span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div 
                        className={styles.progressBar} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className={styles.progressPercentage}>{progress}%</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Generated Report */}
              <motion.div 
                className={styles.reportColumn}
                variants={sectionVariants}
              >
                <h2 className={styles.columnTitle}>Q3 Generated Report</h2>
                <div className={styles.reportCardsGrid}>
                  {reportData.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className={styles.reportDataCard}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: visibleCards.includes(index) ? 1 : 0,
                        scale: visibleCards.includes(index) ? 1 : 0.8
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={styles.cardBorderWrapper}>
                        <img 
                          src="/assets/animated-svg/Q3GeneratedReport-UI-looped.svg" 
                          alt="" 
                          className={styles.cardBorderSvg} 
                        />
                        <div className={styles.cardContent}>
                          <h3 className={styles.cardTitle}>{item.label}</h3>
                          <p className={styles.cardValue}>{item.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
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

export default Y14ReportPage;
