
import { motion } from 'framer-motion';

interface InstallPWAProps {
  language: 'en' | 'bn';
}

// Disabled PWA install component - only returns null to maintain compatibility
const InstallPWA = ({ language }: InstallPWAProps) => {
  // PWA installation functionality has been removed
  // Component kept for compatibility but renders nothing
  return null;
};

export default InstallPWA;
