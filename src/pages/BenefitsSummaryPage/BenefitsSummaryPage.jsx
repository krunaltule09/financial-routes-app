import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import SidebarItem from '../../components/SidebarItem/SidebarItem';
import styles from './BenefitsSummaryPage.module.css';

/**
 * BenefitsSummaryPage component for displaying benefits of Smart Glasses + AI in Covenant Monitoring
 */
const BenefitsSummaryPage = () => {
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(5); // Benefits Summary is active by default
  
  // Handle tab click
  const handleTabClick = (index) => {
    if (index === 1) { // Financial Statement Scan tab
      navigate('/financial-statement');
    } else if (index === 2) { // DSCR Trend tab
      navigate('/dscr-trend');
    } else if (index === 3) { // Y-14 Report Generation tab
      navigate('/y14-report/large');
    } else if (index === 4) { // Covenant Monitoring tab
      navigate('/covenant-monitoring');
    } else if (index === 5) { // Already on Benefits Summary tab
      // Do nothing, already on this page
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 80,
        delay: 0.3
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

  // No longer need benefits data as we're using the SVG directly

  return (
    <div className={styles.benefitsSummaryContainer}>
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
            <h1>Benefits Summary of Smart Glasses + AI in Covenant Monitoring</h1>
            <p className={styles.pageDescription}>Description text here</p>
          </motion.div>
          
          {/* Benefits Summary SVG */}
          <motion.div 
            className={styles.benefitsContainer}
            variants={containerVariants}
          >
            <img 
              src="/assets/benefitsummary.svg" 
              alt="Benefits Summary" 
              className={styles.benefitsSummarySvg} 
            />
          </motion.div>
        </div>
      </motion.main>
      
      <motion.img
        src="/assets/welcome1.svg"
        alt=""
        aria-hidden="true"
        className={styles.bgImage}
        initial={{ opacity: 0, scale: 1.15, x: 80, y: 50 }}
        animate={{
          opacity: 0.9,
          scale: [1.15, 1.05, 1.15],
          x: [80, 20, 80],
          y: [50, 10, 50],
        }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className={styles.overlay}></div>

      {/* Background placeholder */}
      <div className={styles.backgroundPlaceholder}></div>
    </div>
  );
};

export default BenefitsSummaryPage;
