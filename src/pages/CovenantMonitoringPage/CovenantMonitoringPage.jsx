import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import SidebarItem from '../../components/SidebarItem/SidebarItem';
import styles from './CovenantMonitoringPage.module.css';

/**
 * CovenantMonitoringPage component for displaying operational performance metrics
 */
const CovenantMonitoringPage = () => {
  const navigate = useNavigate();
  
  // State for progress and visible metrics
  const [progress, setProgress] = useState(0);
  const [visibleMetrics, setVisibleMetrics] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(4); // Covenant Monitoring is active by default
  
  // Handle tab click
  const handleTabClick = (index) => {
    if (index === 1) { // Financial Statement Scan tab
      navigate('/financial-statement');
    } 
    else if (index === 2) { // DSCR Trend tab
      navigate('/dscr-trend');
    } else if (index === 3) { // Y-14 Report Generation tab
      navigate('/y14-report/large');
    } else if (index === 4) { // Already on Covenant Monitoring tab
      // Do nothing, already on this page
    } else if (index === 5) { // Benefits Summary tab
      navigate('/benefits-summary');
    } else {
      setActiveTabIndex(index);
      // For future implementation of other tabs
    }
  };

  // Effect to simulate progress and show metrics one by one
  useEffect(() => {
    // Start with no metrics visible
    setVisibleMetrics([]);
    setProgress(0);
    
    // Progress interval
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        
        // Show metrics at specific progress points
        if (newProgress === 20) {
          setVisibleMetrics(prev => [...prev, 0, 1, 2]); // Show first row
        } else if (newProgress === 40) {
          setVisibleMetrics(prev => [...prev, 3, 4, 5]); // Show second row
        } else if (newProgress === 60) {
          setVisibleMetrics(prev => [...prev, 6, 7, 8]); // Show third row
        }
        
        // Stop at 100%
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        
        return newProgress;
      });
    }, 50); // Update every 50ms for faster animation
    
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

  // Operational metrics data
  const metricsData = [
    // First row
    { 
      title: "On-Time Delivery (OTD)",
      value: "93%",
      status: "warning",
      description: "Below the required 95% covenant threshold."
    },
    { 
      title: "Promised vs Delivered",
      value: "Promised: 14  Delivered: 12",
      status: "warning",
      description: "Fulfillment ratio = 86%, under the 90% minimum covenant level."
    },
    { 
      title: "Cost per Mile",
      value: "$1.82",
      status: "success",
      description: "Within allowed limit (Covenant ceiling: $2.00 per mile)."
    },
    // Second row
    { 
      title: "Capacity Utilization",
      value: "78%",
      status: "success",
      description: "Stable; above the 75% operational covenant requirement."
    },
    { 
      title: "OTIF (On-Time In-Full)",
      value: "89%",
      status: "success",
      description: "Slightly below the covenant target of 92%; flagged for monitoring."
    },
    { 
      title: "Defect / Return Rate",
      value: "2.8%",
      status: "success",
      description: "Acceptable; covenant threshold set at ≤ 4%."
    },
    // Third row
    { 
      title: "Order-to-Delivery Cycle Time",
      value: "2.9 days",
      status: "success",
      description: "Within SLA (Covenant max: 3.5 days)."
    },
    { 
      title: "Average Shipment Delay",
      value: "0.6 hours per shipment",
      status: "success",
      description: "Improved month-over-month; within tolerance."
    },
    { 
      title: "Fleet / Asset Availability",
      value: "+4.5% over plan",
      status: "success",
      description: "Healthy; covenant minimum at 90%."
    }
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
    <div className={styles.covenantMonitoringContainer}>
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
            <h1>Operational Performance Report (OPR)</h1>
            <p className={styles.pageDescription}>Covenant monitoring and performance metrics</p>
          </motion.div>
          
          {/* Content Sections */}
          <div className={styles.contentSections}>
            <div className={styles.reportContainer}>
              {/* Left Column - Data Extraction */}
              <motion.div 
                className={styles.dataExtractionColumn}
                variants={sectionVariants}
              >
                <motion.h2 
                  className={styles.columnTitle}
                  animate={{
                    textShadow: [
                      '0 0 5px rgba(255, 230, 0, 0)',
                      '0 0 15px rgba(255, 230, 0, 0.5)',
                      '0 0 5px rgba(255, 230, 0, 0)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  Data extraction
                </motion.h2>
                <div className={styles.documentPreview}>
                  <motion.img 
                    src="/assets/ai-draft-doc.svg" 
                    alt="AI-Draft Document" 
                    className={styles.documentImage}
               
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    whileHover={{ 
                      scale: 1.05
                    }}
                  />
                  <div className={styles.progressContainer}>
                    <div className={styles.progressInfo}>
                      <span className={styles.progressLabel}>Generating report...</span>
                      <span className={styles.progressPercentage}>{progress}%</span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div 
                        className={styles.progressBar} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Operational KPIs */}
              <motion.div 
                className={styles.metricsColumn}
                variants={sectionVariants}
              >
                <motion.h2 
                  className={styles.columnTitle}
                  animate={{
                    textShadow: [
                      '0 0 5px rgba(50, 255, 255, 0)',
                      '0 0 15px rgba(50, 255, 255, 0.5)',
                      '0 0 5px rgba(50, 255, 255, 0)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  Operational KPIs
                </motion.h2>
                <div className={styles.metricsGrid}>
                  {metricsData.map((metric, index) => (
                    <motion.div 
                      key={index} 
                      className={styles.metricCard}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      animate={{ 
                        opacity: visibleMetrics.includes(index) ? 1 : 0,
                        scale: visibleMetrics.includes(index) ? 1 : 0.8,
                        rotateY: visibleMetrics.includes(index) ? 0 : -90
                      }}
                      transition={{ 
                        duration: 0.6,
                        type: 'spring',
                        stiffness: 100
                      }}
                      whileHover={{
                        scale: 1.05,
                        z: 50,
                        transition: { type: 'spring', stiffness: 300 }
                      }}
                    >
                      <div className={`${styles.metricCardInner} ${styles[metric.status]}`}>
                        <img 
                          src="/assets/convenant-border.svg" 
                          alt="" 
                          className={styles.metricBorderSvg} 
                        />
                        <div className={styles.metricContent}>
                          <h3 className={styles.metricTitle}>{metric.title}</h3>
                          <p className={styles.metricValue}>{metric.value}</p>
                          <div className={styles.metricStatusContainer}>
                            <div className={styles.metricStatusIcon}>
                              {metric.status === 'success' ? (
                                <span className={styles.successIcon}>✓</span>
                              ) : (
                                <span className={styles.warningIcon}>⚠</span>
                              )}
                            </div>
                            <p className={styles.metricDescription}>{metric.description}</p>
                          </div>
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
    </div>
  );
};

export default CovenantMonitoringPage;
