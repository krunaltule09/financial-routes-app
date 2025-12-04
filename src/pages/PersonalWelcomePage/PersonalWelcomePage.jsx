import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components';
import styles from './PersonalWelcomePage.module.css';

/**
 * PersonalWelcomePage component that displays a personalized greeting with user avatar
 * This page welcomes the user by name and provides a brief introduction to the platform
 */
const PersonalWelcomePage = () => {
  // User data - in a real app, this would come from authentication/context
  const userData = {
    name: 'Julia',
    avatar: `${process.env.PUBLIC_URL}/assets/Avatar.svg`,
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4,
        duration: 1.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 70,
        duration: 1.5,
        ease: 'easeOut',
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  const waveVariants = {
    hidden: { rotateZ: 0, scale: 1 },
    visible: {
      rotateZ: [0, -25, 15, -25, 15, -15, 10, 0],
      scale: [1, 1.1, 1, 1.1, 1, 1.05, 1],
      transition: {
        delay: 1.8,
        duration: 2.5,
        ease: 'easeInOut',
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8,
        duration: 1.5,
        type: 'spring',
        damping: 15,
        stiffness: 60,
      },
    },
  };

  // Border glow removed as requested

  return (
    <div className={styles.personalWelcomeContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <motion.div 
          className={styles.contentSection}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className={styles.heading} variants={itemVariants}>
            Hi {userData.name} 
            <motion.span 
              className={styles.waveEmoji}
              variants={waveVariants}
            >
              👋
            </motion.span>
          </motion.h1>
          
          <motion.h2 className={styles.subheading} variants={itemVariants}>
            Let's begin your journey
          </motion.h2>
          
          <motion.div 
            className={styles.descriptionContainer}
            variants={paragraphVariants}
          >
            <p className={styles.description}>
              Welcome to Operate Zone, your comprehensive solution for streamlined
              loan servicing.
            </p>
            <p className={styles.description}>
              Our platform leverages blockchain technology to provide unparalleled
              transparency, automation, and insights, ensuring efficient and compliant
              operations.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.avatarContainer}
          initial="hidden"
          animate="visible"
          variants={avatarVariants}
        >
          <div className={styles.avatarFrame}>
            <img 
              src={userData.avatar} 
              alt={`${userData.name}'s avatar`} 
              className={styles.avatarImage}
            />
          </div>
        </motion.div>
      </main>
      
      {/* Placeholder for future background */}
      <div className={styles.backgroundPlaceholder}></div>
    </div>
  );
};

export default PersonalWelcomePage;
