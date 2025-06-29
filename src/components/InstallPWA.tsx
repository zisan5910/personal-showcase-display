
import { useState, useEffect } from 'react';

interface InstallPWAProps {
  language: 'en' | 'bn';
}

const InstallPWA = ({ language: _language }: InstallPWAProps) => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // PWA installation functionality is disabled
    setShowInstallPrompt(false);
  }, []);

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="hidden">
      {/* PWA installation UI removed */}
    </div>
  );
};

export default InstallPWA;
