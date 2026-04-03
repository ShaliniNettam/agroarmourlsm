import React from 'react';

const RoamingChick: React.FC = () => {
  return (
    <div className="roaming-chick-container">
      <img 
        src="/assets/chick-mascot.png" 
        alt="AgroArmor Mascot" 
        className="chick-mascot"
      />
      <style>{`
        .roaming-chick-container {
          position: fixed;
          bottom: 40px;
          left: -100px;
          width: 120px;
          height: 120px;
          z-index: 1000;
          pointer-events: none;
          animation: roam 20s linear infinite;
        }

        .chick-mascot {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply; /* This removes the white background */
          animation: waddle 0.5s ease-in-out infinite;
        }

        @keyframes roam {
          0% {
            left: -150px;
            transform: scaleX(1);
          }
          48% {
            transform: scaleX(1);
          }
          50% {
            left: calc(100vw + 50px);
            transform: scaleX(-1);
          }
          98% {
            transform: scaleX(-1);
          }
          100% {
            left: -150px;
            transform: scaleX(1);
          }
        }

        @keyframes waddle {
          0%, 100% {
            transform: translateY(0) rotate(-8deg);
          }
          50% {
            transform: translateY(-12px) rotate(8deg);
          }
        }

        /* Adjust size for mobile */
        @media (max-width: 768px) {
          .roaming-chick-container {
            width: 80px;
            height: 80px;
            bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default RoamingChick;
