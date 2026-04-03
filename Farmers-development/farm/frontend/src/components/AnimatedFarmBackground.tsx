import React from 'react';
import chickImg from '@/assets/chick-3d.png';

export const AnimatedFarmBackground = () => {
  const animals = [
    { type: 'chick', src: chickImg, direction: 'normal', delay: '0s', duration: '35s', size: 'h-48 w-48', bottom: 'bottom-12' },
    { type: 'chick', src: chickImg, direction: 'reverse', delay: '15s', duration: '40s', size: 'h-40 w-40', bottom: 'bottom-8' },
    { type: 'chick', src: chickImg, direction: 'normal', delay: '8s', duration: '30s', size: 'h-32 w-32', bottom: 'bottom-16' },
    { type: 'chick', src: chickImg, direction: 'reverse', delay: '22s', duration: '45s', size: 'h-52 w-52', bottom: 'bottom-6' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden bg-emerald-50/50">
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
    </div>
  );
};
