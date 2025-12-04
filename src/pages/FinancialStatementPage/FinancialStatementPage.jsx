import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import DeepDiveCard from '../../components/DeepDiveCard/DeepDiveCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import SidebarItem from '../../components/SidebarItem/SidebarItem';
import CovenantBar from '../../components/CovenantBar/CovenantBar';
import { Snackbar, Alert } from '@mui/material';
import SSEStatus from '../../components/SSEStatus';
import styles from './FinancialStatementPage.module.css';

/**
 * FinancialStatementPage component for displaying financial statement analysis
 */
const FinancialStatementPage = () => {
  const navigate = useNavigate();
  const [navigationEvent, setNavigationEvent] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  // Listen for navigation events
  useEffect(() => {
    const handleSSENavigation = (event) => {
      const { sourceAppId, route, timestamp, data, isAutoSync } = event.detail;
      
      if (route === '/financial-statement') {
        // Don't show notification for automatic syncs
        if (!isAutoSync) {
          setNavigationEvent({
            sourceAppId,
            timestamp: new Date(timestamp).toLocaleTimeString(),
            referrer: data?.referrer || 'unknown',
            action: data?.action || 'NAVIGATE',
            documentId: data?.documentId || 'none',
            automatic: isAutoSync
          });
          
          setNotification({
            open: true,
            message: `Navigated from ${sourceAppId || 'unknown'} app`,
            severity: 'info'
          });
        }
        
        // Automatically set active tab to Financial Statement Scan (index 1)
        setActiveTabIndex(1);
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
  
  // Sample financial data
  const financialData = [
    { title: 'Revenue', value: '$12.5B' },
    { title: 'EBITDA', value: '$1.2B' },
    { title: 'Total Debt', value: '$3.8B' },
    { title: 'Equity', value: '$1.2B' },
    { title: 'Interest Expense', value: '$210M' }
  ];

  // State for progress and content visibility
  const [progress, setProgress] = useState(0);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(1); // Financial Statement Scan is active by default
  
  // Handle tab click
  const handleTabClick = (index) => {
    if (index === 1) {
      // Already on this page, do nothing
    } else if (index === 3) { // Y-14 Report Generation tab
      navigate('/y14-report/large');
    } else if (index === 4) { // Covenant Monitoring tab
      navigate('/covenant-monitoring');
    } else if (index === 2) { 
      navigate('/dscr-trend');
    } else if (index === 5) { // Benefits Summary tab
      navigate('/benefits-summary');
    } else {
      setActiveTabIndex(index);
      // For future implementation of other tabs
    }
  };
  
  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        
        // Show deep dive content at 40%
        if (newProgress >= 40 && !showDeepDive) {
          setShowDeepDive(true);
        }
        
        // Reveal cards one by one between 40% and 90%
        if (newProgress >= 40 && newProgress < 90) {
          const cardIndex = Math.floor((newProgress - 40) / 10);
          if (cardIndex >= 0 && cardIndex < financialData.length && !visibleCards.includes(cardIndex)) {
            setVisibleCards(prev => [...prev, cardIndex]);
          }
        }
        
        // Show graph at 100%
        if (newProgress >= 100) {
          setShowGraph(true);
          clearInterval(interval);
        }
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50); // Update every 50ms
    
    return () => clearInterval(interval);
  }, [showDeepDive, showGraph, visibleCards, financialData.length]);
  
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
  const covenantData = [
    { label: 'DSCR', value: '1.3', isGood: true, percentage: 45 },
    { label: 'Debt / Equity', value: '3.2', limit: '3.0', isGood: false, percentage: 75 },
    { label: 'Current Ratio', value: '1.6', isGood: true, percentage: 55 }
  ];

  // Sidebar navigation items
  const sidebarItems = [
    { sublabel: '1', label: 'Welcome', completed: true },
    { sublabel: '2', label: 'Financial Statement Scan', completed: true },
    { sublabel: '3', label: 'Operational Docx Scan', completed: true },
    { sublabel: '4', label: 'Y-14 Report Generation', completed: true },
    { sublabel: '5', label: 'Covenant Monitoring', completed: true },
    { sublabel: '6', label: 'Benefits Summary', completed: true }
  ];

  return (
    <div className={styles.financialStatementContainer}>
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
            <h1>Financial Statement Scan & Covenant Extraction</h1>
            <p className={styles.pageDescription}>Description text here</p>
          </motion.div>
          
          {/* Content Sections */}
          <div className={styles.contentSections}>
            {/* Render content based on active tab */}
            {activeTabIndex === 0 && (
              <motion.div 
                className={styles.welcomeSection}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className={styles.sectionTitle}>Welcome to Connected Commerce</h2>
                <div className={styles.welcomeContent}>
                  <p>This platform provides comprehensive financial analysis and covenant monitoring tools.</p>
                  <p>Select a tab from the sidebar to navigate through different features.</p>
                </div>
              </motion.div>
            )}
            
            {activeTabIndex === 1 && (
              <>
                {/* Document Preview Section */}
                <motion.div 
                  className={styles.documentSection}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className={styles.documentPreview}>
                    <div className={styles.documentImage}>
                      <img 
                        src="/assets/financial-status-doc.svg" 
                        alt="Financial document" 
                        className={styles.documentSvg} 
                      />
                    </div>
                    <div className={styles.analysisProgress}>
                      <ProgressBar percentage={progress} label={progress < 100 ? "Analysing..." : "Analysis Complete"} />
                    </div>
                  </div>
                </motion.div>
                
                {/* Financial Data Section */}
                <div className={styles.dataSection}>
                  {/* Deep Dive Section */}
                  <motion.div 
                    className={styles.deepDiveSection}
                    variants={sectionVariants}
                    initial="hidden"
                    animate={showDeepDive ? "visible" : "hidden"}
                  >
                    <h2 className={styles.sectionTitle}>Deep Dive (Extracted Data)</h2>
                    <div className={styles.cardsContainer}>
                      {financialData.map((item, index) => (
                        <DeepDiveCard 
                          key={index}
                          title={item.title}
                          value={item.value}
                          position={index}
                          isVisible={visibleCards.includes(index)}
                        />
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Covenant Status Section */}
                  <motion.div 
                    className={styles.covenantSection}
                    variants={sectionVariants}
                    initial="hidden"
                    animate={showGraph ? "visible" : "hidden"}
                  >
                    <div className={styles.covenantContainer}>
                      <img 
                        src="/assets/convenant-status-graph.svg" 
                        alt="Covenant Status"
                        className={styles.covenantGraphSvg}
                      />
                    </div>
                  </motion.div>
                </div>
              </>
            )}
            
            {activeTabIndex === 2 && (
              <motion.div 
                className={styles.operationalSection}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className={styles.sectionTitle}>Operational Document Scan</h2>
                <div className={styles.operationalContent}>
                  <p>Scan and analyze operational documents to extract key information.</p>
                  <div className={styles.documentPlaceholder}>
                    <p>Upload operational documents to begin analysis</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTabIndex === 3 && (
              <motion.div 
                className={styles.y14Section}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className={styles.sectionTitle}>Y-14 Report Generation</h2>
                <div className={styles.y14Content}>
                  <p>Generate Y-14 reports based on financial data analysis.</p>
                  <div className={styles.reportPlaceholder}>
                    <p>Select parameters to generate Y-14 reports</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTabIndex === 4 && (
              <motion.div 
                className={styles.covenantMonitoringSection}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className={styles.sectionTitle}>Covenant Monitoring</h2>
                <div className={styles.covenantMonitoringContent}>
                  <p>Monitor covenant compliance and receive alerts for potential violations.</p>
                  <div className={styles.covenantContainer}>
                    <div className={styles.covenantSvgWrapper}>
                      <img 
                        src="/assets/convenant-status.svg" 
                        alt="Covenant Status Background" 
                        className={styles.covenantSvg} 
                      />
                      <div className={styles.covenantBarsContainer}>
                        {covenantData.map((item, index) => (
                          <CovenantBar 
                            key={index}
                            label={item.label}
                            value={item.value}
                            limit={item.limit}
                            isGood={item.isGood}
                            percentage={item.percentage}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTabIndex === 5 && (
              <motion.div 
                className={styles.benefitsSection}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className={styles.sectionTitle}>Benefits Summary</h2>
                <div className={styles.benefitsContent}>
                  <p>Summary of benefits and insights from the financial analysis.</p>
                  <ul className={styles.benefitsList}>
                    <li>Automated financial statement analysis</li>
                    <li>Real-time covenant monitoring</li>
                    <li>Operational document scanning</li>
                    <li>Y-14 report generation</li>
                    <li>Data visualization and insights</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.main>
      
      {/* Background placeholder */}
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
          <p><strong>Document ID:</strong> {navigationEvent.documentId}</p>
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

export default FinancialStatementPage;
