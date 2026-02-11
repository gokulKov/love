import './App.css';
import { useState, useEffect } from 'react';

// Heart SVG path generator
function heartPath(size) {
  const s = size / 30;
  return `M 0 ${-10 * s} 
    C ${-5 * s} ${-15 * s}, ${-15 * s} ${-15 * s}, ${-15 * s} ${-5 * s}
    C ${-15 * s} ${5 * s}, 0 ${10 * s}, 0 ${15 * s}
    C 0 ${10 * s}, ${15 * s} ${5 * s}, ${15 * s} ${-5 * s}
    C ${15 * s} ${-15 * s}, ${5 * s} ${-15 * s}, 0 ${-10 * s} Z`;
}

// Generate hearts for the tree canopy in heart shape - COMPACT version
function generateTreeHearts() {
  const hearts = [];
  const colors = [
    '#c41e3a', '#e31b54', '#dc143c', '#ff1744', '#d32f2f',
    '#e91e63', '#f06292', '#ec407a', '#ff4081',
    '#ff6b8a', '#ff8a9b', '#ffb6c1', '#ffc0cb',
  ];

  const heartPoints = [];
  const centerX = 450;
  const centerY = 220;
  const scale = 8;
  
  for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
    const t = angle;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    heartPoints.push({ x: x * scale + centerX, y: y * scale + centerY });
  }

  for (let i = 0; i < 60; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.8;
    const x = 16 * Math.pow(Math.sin(t), 3) * r;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * r;
    heartPoints.push({ 
      x: x * scale + centerX + (Math.random() - 0.5) * 15, 
      y: y * scale + centerY + (Math.random() - 0.5) * 15 
    });
  }

  heartPoints.forEach((point, i) => {
    const size = 14 + Math.random() * 14;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = (Math.random() - 0.5) * 30;
    hearts.push(
      <g key={`tree-${i}`} transform={`translate(${point.x}, ${point.y}) rotate(${rotation})`}>
        <path d={heartPath(size)} fill={color} opacity={0.95} />
      </g>
    );
  });

  return hearts;
}

function generateFloatingHearts() {
  const hearts = [];
  const floatingPositions = [
    { x: 280, y: 120, size: 10 }, { x: 250, y: 180, size: 8 }, { x: 300, y: 160, size: 12 },
    { x: 220, y: 220, size: 9 }, { x: 270, y: 260, size: 11 },
    { x: 620, y: 130, size: 11 }, { x: 650, y: 190, size: 9 }, { x: 600, y: 240, size: 10 },
    { x: 680, y: 160, size: 8 }, { x: 640, y: 280, size: 12 },
    { x: 350, y: 100, size: 7 }, { x: 550, y: 110, size: 8 },
  ];
  
  const colors = ['#e91e63', '#ff6b8a', '#c41e3a', '#ffb6c1', '#dc143c', '#ff4081'];

  floatingPositions.forEach((pos, i) => {
    const color = colors[i % colors.length];
    const rotation = (Math.random() - 0.5) * 50;
    hearts.push(
      <g key={`float-${i}`} transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}>
        <path d={heartPath(pos.size)} fill={color} opacity={0.8} />
      </g>
    );
  });

  return hearts;
}

function generateGrass() {
  const blades = [];
  for (let i = 0; i < 100; i++) {
    const x = i * 9 + (Math.random() - 0.5) * 4;
    const height = 35 + Math.random() * 40;
    const width = 3 + Math.random() * 2;
    const lean = (Math.random() - 0.5) * 12;
    const color = i % 3 === 0 ? '#e91e63' : i % 3 === 1 ? '#d81b60' : '#c2185b';
    
    blades.push(
      <path
        key={`grass-${i}`}
        d={`M ${x} 480 Q ${x + lean} ${480 - height/2} ${x + lean * 1.5} ${480 - height}`}
        stroke={color}
        strokeWidth={width}
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  return blades;
}

function HeartTreeScene() {
  return (
    <svg viewBox="0 0 900 550" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bgGradient" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#fce4ec" />
          <stop offset="50%" stopColor="#f8bbd9" />
          <stop offset="100%" stopColor="#f48fb1" />
        </linearGradient>
        <linearGradient id="trunkGradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#5d4037" />
          <stop offset="50%" stopColor="#8d6e63" />
          <stop offset="100%" stopColor="#6d4c41" />
        </linearGradient>
        <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#880e4f" floodOpacity="0.3"/>
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#bgGradient)" />
      <ellipse cx="450" cy="510" rx="480" ry="70" fill="#ad1457" />
      <g>{generateGrass()}</g>

      <g transform="translate(450, 340)">
        <path d="M -10 0 Q -12 50 -8 120 L 8 120 Q 12 50 10 0 Z" fill="url(#trunkGradient)" />
        <path d="M -6 15 Q -28 -5 -35 -25" stroke="#6d4c41" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 6 15 Q 28 -5 35 -25" stroke="#6d4c41" strokeWidth="6" fill="none" strokeLinecap="round"/>
      </g>

      <g>{generateFloatingHearts()}</g>
      <g filter="url(#heartShadow)">{generateTreeHearts()}</g>
    </svg>
  );
}

// Love Envelope Component
function LoveEnvelope({ isOpen, onAnimationEnd }) {
  return (
    <div className="relative" style={{ width: '320px', height: '220px' }}>
      <svg viewBox="0 0 320 220" className="w-full h-full">
        <defs>
          <linearGradient id="envGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8bbd0" />
            <stop offset="100%" stopColor="#f48fb1" />
          </linearGradient>
          <filter id="envShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#880e4f" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Envelope body */}
        <rect x="10" y="60" width="300" height="150" rx="5" fill="url(#envGradient)" filter="url(#envShadow)" />
        
        {/* Envelope flap (back) */}
        <path 
          d="M 10 60 L 160 130 L 310 60" 
          fill="#ec407a"
          className={`origin-top transition-transform duration-700 ${isOpen ? 'envelope-flap-open' : ''}`}
          style={{
            transformOrigin: '160px 60px',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          }}
        />

        {/* Envelope bottom flap lines */}
        <path d="M 10 210 L 160 140 L 310 210" fill="none" stroke="#d81b60" strokeWidth="1" opacity="0.5"/>
        
        {/* Side triangles */}
        <path d="M 10 60 L 10 210 L 100 140 Z" fill="#f06292" opacity="0.6"/>
        <path d="M 310 60 L 310 210 L 220 140 Z" fill="#f06292" opacity="0.6"/>

        {/* Heart seal */}
        <g transform="translate(160, 145)">
          <path 
            d={heartPath(25)} 
            fill="#e91e63"
            className="drop-shadow-lg"
          />
        </g>
      </svg>

      {/* Floating hearts around envelope */}
      <div className="absolute -top-4 -left-4">
        <svg width="30" height="30" viewBox="-15 -15 30 30">
          <path d={heartPath(20)} fill="#e91e63" opacity="0.7"/>
        </svg>
      </div>
      <div className="absolute -top-2 -right-6">
        <svg width="25" height="25" viewBox="-15 -15 30 30">
          <path d={heartPath(16)} fill="#f06292" opacity="0.7"/>
        </svg>
      </div>
      <div className="absolute top-8 -right-8">
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(12)} fill="#ff8a9b" opacity="0.7"/>
        </svg>
      </div>
      <div className="absolute top-4 -left-6">
        <svg width="22" height="22" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63" opacity="0.6"/>
        </svg>
      </div>
    </div>
  );
}

// Letter Component - Question 1
function LoveLetter({ onYes, onNoHover, noPosition }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-2xl p-8 relative"
      style={{
        width: '380px',
        minHeight: '280px',
        background: 'linear-gradient(135deg, #fff 0%, #fce4ec 100%)',
        boxShadow: '0 20px 60px rgba(233, 30, 99, 0.3)',
      }}
    >
      {/* Decorative top hearts */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
        <svg width="28" height="28" viewBox="-15 -15 30 30">
          <path d={heartPath(18)} fill="#ec407a"/>
        </svg>
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
      </div>

      {/* Letter content */}
      <div className="text-center pt-4">
        <h2 
          className="text-2xl font-bold mb-8"
          style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
        >
          💕 My Dearest 💕
        </h2>
        
        <p 
          className="text-xl mb-10"
          style={{ color: '#ad1457', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
        >
          Do you really love me?
        </p>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-8 mt-6 relative" style={{ minHeight: '60px' }}>
          <button
            onClick={onYes}
            className="px-8 py-3 text-lg font-bold text-white rounded-full transform hover:scale-110 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
              boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
            }}
          >
            Yes 💖
          </button>

          <button
            onMouseEnter={onNoHover}
            className="px-8 py-3 text-lg font-bold text-white rounded-full transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #9e9e9e 0%, #757575 100%)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              position: 'absolute',
              left: noPosition.x,
              top: noPosition.y,
            }}
          >
            No 💔
          </button>
        </div>
      </div>

      {/* Decorative bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <svg width="100" height="20" viewBox="0 0 100 20">
          <path d="M0 10 Q25 0 50 10 Q75 20 100 10" stroke="#f48fb1" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

// Letter Component - Question 2: How much do you like him?
function LoveLetter2({ onInfinity }) {
  const [isHovering100, setIsHovering100] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-2xl p-8 relative"
      style={{
        width: '400px',
        minHeight: '300px',
        background: 'linear-gradient(135deg, #fff 0%, #fce4ec 100%)',
        boxShadow: '0 20px 60px rgba(233, 30, 99, 0.3)',
      }}
    >
      {/* Decorative top hearts */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
        <svg width="28" height="28" viewBox="-15 -15 30 30">
          <path d={heartPath(18)} fill="#ec407a"/>
        </svg>
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
      </div>

      {/* Letter content */}
      <div className="text-center pt-4">
        <h2 
          className="text-2xl font-bold mb-8"
          style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
        >
          💕 One More Question 💕
        </h2>
        
        <p 
          className="text-xl mb-10"
          style={{ color: '#ad1457', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
        >
          How much do you like him?
        </p>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-6 mt-6">
          {/* 100% button - hides on hover */}
          <button
            onMouseEnter={() => setIsHovering100(true)}
            onMouseLeave={() => setIsHovering100(false)}
            className="px-8 py-3 text-lg font-bold text-white rounded-full transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #9e9e9e 0%, #757575 100%)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              opacity: isHovering100 ? 0 : 1,
              transform: isHovering100 ? 'scale(0)' : 'scale(1)',
              pointerEvents: isHovering100 ? 'none' : 'auto',
            }}
          >
            100% 💯
          </button>

          {/* Infinity button */}
          <button
            onClick={onInfinity}
            className="px-8 py-3 text-lg font-bold text-white rounded-full transform hover:scale-110 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
              boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
            }}
          >
            Infinity ∞ 💖
          </button>
        </div>

        <p 
          className="mt-4 text-sm"
          style={{ color: '#f06292', fontStyle: 'italic' }}
        >
          (Try hovering over 100% 😉)
        </p>
      </div>

      {/* Decorative bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <svg width="100" height="20" viewBox="0 0 100 20">
          <path d="M0 10 Q25 0 50 10 Q75 20 100 10" stroke="#f48fb1" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

// Letter Component - Question 3: What is your most memorable moment?
function LoveLetter3({ onComplete }) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const fullMessage = "My life became beautiful the moment he came into it.";

  const handleInputClick = () => {
    if (!isTyping && !typingComplete) {
      setIsTyping(true);
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < fullMessage.length) {
          setInputValue(fullMessage.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setTypingComplete(true);
          // Start countdown
          let count = 10;
          const countdownInterval = setInterval(() => {
            count--;
            setCountdown(count);
            if (count === 0) {
              clearInterval(countdownInterval);
              onComplete();
            }
          }, 1000);
        }
      }, 50);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-2xl p-8 relative"
      style={{
        width: '450px',
        minHeight: '350px',
        background: 'linear-gradient(135deg, #fff 0%, #fce4ec 100%)',
        boxShadow: '0 20px 60px rgba(233, 30, 99, 0.3)',
      }}
    >
      {/* Decorative top hearts */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
        <svg width="28" height="28" viewBox="-15 -15 30 30">
          <path d={heartPath(18)} fill="#ec407a"/>
        </svg>
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
      </div>

      {/* Letter content */}
      <div className="text-center pt-4">
        <h2 
          className="text-2xl font-bold mb-6"
          style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
        >
          💕 Last Question 💕
        </h2>
        
        <p 
          className="text-xl mb-6"
          style={{ color: '#ad1457', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
        >
          What is your most memorable moment?
        </p>

        {/* Input box */}
        <div className="mb-6">
          <input
            type="text"
            value={inputValue}
            onClick={handleInputClick}
            readOnly
            placeholder={isTyping ? '' : 'Type...'}
            className="w-full px-4 py-3 text-center rounded-lg border-2 transition-all duration-300 cursor-pointer"
            style={{
              borderColor: '#f48fb1',
              color: '#c2185b',
              fontFamily: 'Georgia, serif',
              fontSize: '14px',
              background: typingComplete ? '#fce4ec' : '#fff',
              outline: 'none',
            }}
          />
        </div>

        {/* Countdown timer */}
        {typingComplete && (
          <div className="animate-fade-in">
            <p 
              className="text-lg mb-2"
              style={{ color: '#e91e63', fontFamily: 'Georgia, serif' }}
            >
              Opening next envelope in...
            </p>
            <div 
              className="text-4xl font-bold animate-pulse"
              style={{ color: '#c2185b' }}
            >
              {countdown} 💝
            </div>
          </div>
        )}

        {!isTyping && !typingComplete && (
          <p 
            className="text-sm"
            style={{ color: '#f06292', fontStyle: 'italic' }}
          >
            (Click the box to see the answer 💕)
          </p>
        )}
      </div>

      {/* Decorative bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <svg width="100" height="20" viewBox="0 0 100 20">
          <path d="M0 10 Q25 0 50 10 Q75 20 100 10" stroke="#f48fb1" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

// Letter Component - Question 4: Image Slideshow
function LoveLetter4({ onComplete }) {
  const [showImages, setShowImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImagesShown, setAllImagesShown] = useState(false);
  const [showLetsStart, setShowLetsStart] = useState(false);
  
  // Import all images with correct extensions
  const images = [
    require('./image/img-1.jpg'),
    require('./image/img-2.jfif'),
    require('./image/img-4.jpg'),
    require('./image/img-5.jfif'),
    require('./image/img-6.jpg'),
    require('./image/img-7.jfif'),
    require('./image/img-8.jpg'),
    require('./image/img-9.jfif'),
    require('./image/img-10.jpg'),
    require('./image/img-11.jpg'),
    require('./image/img-12.jpg'),
  ];

  const handleClick = () => {
    if (!showImages) {
      setShowImages(true);
      // Start showing images one by one
      let index = 0;
      const imageInterval = setInterval(() => {
        index++;
        if (index < images.length) {
          setCurrentImageIndex(index);
        } else {
          clearInterval(imageInterval);
          setAllImagesShown(true);
          // Show "Let's start" message after a brief delay
          setTimeout(() => {
            setShowLetsStart(true);
            // Auto proceed after showing the message
            setTimeout(() => {
              onComplete();
            }, 2000);
          }, 1000);
        }
      }, 1500); // Show each image for 1.5 seconds
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-2xl p-8 relative"
      style={{
        width: showImages ? '600px' : '480px',
        minHeight: showImages ? '500px' : '300px',
        background: 'linear-gradient(135deg, #fff 0%, #fce4ec 100%)',
        boxShadow: '0 20px 60px rgba(233, 30, 99, 0.3)',
        transition: 'all 0.5s ease',
      }}
    >
      {/* Decorative top hearts */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
        <svg width="28" height="28" viewBox="-15 -15 30 30">
          <path d={heartPath(18)} fill="#ec407a"/>
        </svg>
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
      </div>

      {/* Letter content */}
      <div className="text-center pt-4">
        {!showImages ? (
          <>
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
            >
              💕 Surprise Time 💕
            </h2>
            
            <p 
              className="text-lg mb-8"
              style={{ color: '#ad1457', fontFamily: 'Georgia, serif', lineHeight: '1.8' }}
            >
              What's your next plan, sweetheart?<br/>
              Click it and let me surprise you.
            </p>

            <button
              onClick={handleClick}
              className="px-10 py-4 text-lg font-bold text-white rounded-full transform hover:scale-110 transition-all duration-300 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
                boxShadow: '0 8px 30px rgba(233, 30, 99, 0.5)',
              }}
            >
              🎁 Click for Surprise 🎁
            </button>
          </>
        ) : (
          <>
            {!showLetsStart ? (
              <>
                <h2 
                  className="text-xl font-bold mb-4"
                  style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
                >
                  💖 Our Beautiful Memories 💖
                </h2>
                
                {/* Image display */}
                <div 
                  className="relative mx-auto mb-4 rounded-lg overflow-hidden shadow-lg"
                  style={{ 
                    width: '400px', 
                    height: '300px',
                    border: '4px solid #f48fb1',
                  }}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={`Memory ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover animate-fade-in"
                    key={currentImageIndex}
                  />
                </div>
                
                {/* Progress indicator */}
                <div className="flex justify-center gap-2 mb-2">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        background: idx <= currentImageIndex ? '#e91e63' : '#f8bbd0',
                        transform: idx === currentImageIndex ? 'scale(1.5)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
                
                <p style={{ color: '#e91e63', fontSize: '14px' }}>
                  {currentImageIndex + 1} / {images.length}
                </p>
              </>
            ) : (
              <div className="animate-fade-in py-16">
                <h2 
                  className="text-4xl font-bold mb-6 animate-bounce"
                  style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
                >
                  💕 Let's Start 💕
                </h2>
                <p 
                  className="text-xl"
                  style={{ color: '#e91e63', fontFamily: 'Georgia, serif' }}
                >
                  Our beautiful journey together...
                </p>
                <div className="mt-6">
                  <svg width="60" height="60" viewBox="-15 -15 30 30" className="mx-auto animate-pulse">
                    <path d={heartPath(24)} fill="#e91e63"/>
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Decorative bottom */}
      {!showImages && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <svg width="100" height="20" viewBox="0 0 100 20">
            <path d="M0 10 Q25 0 50 10 Q75 20 100 10" stroke="#f48fb1" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      )}
    </div>
  );
}

// Letter Component - Question 5: Video with input
function LoveLetter5({ onComplete }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleInputClick = () => {
    if (!showVideo) {
      setShowVideo(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Auto proceed after video ends
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-2xl p-8 relative"
      style={{
        width: showVideo ? '700px' : '450px',
        minHeight: showVideo ? '550px' : '300px',
        background: 'linear-gradient(135deg, #fff 0%, #fce4ec 100%)',
        boxShadow: '0 20px 60px rgba(233, 30, 99, 0.3)',
        transition: 'all 0.5s ease',
      }}
    >
      {/* Decorative top hearts */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
        <svg width="28" height="28" viewBox="-15 -15 30 30">
          <path d={heartPath(18)} fill="#ec407a"/>
        </svg>
        <svg width="20" height="20" viewBox="-15 -15 30 30">
          <path d={heartPath(14)} fill="#e91e63"/>
        </svg>
      </div>

      {/* Letter content */}
      <div className="text-center pt-4">
        {!showVideo ? (
          <>
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
            >
              💕 One Last Thing 💕
            </h2>
            
            <p 
              className="text-xl mb-8"
              style={{ color: '#ad1457', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
            >
              Tell me all the mistakes he makes.
            </p>

            {/* Input box */}
            <div className="mb-4">
              <input
                type="text"
                onClick={handleInputClick}
                readOnly
                placeholder="Click here to see the answer..."
                className="w-full px-4 py-3 text-center rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-pink-400"
                style={{
                  borderColor: '#f48fb1',
                  color: '#c2185b',
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  background: '#fff',
                  outline: 'none',
                }}
              />
            </div>

            <p 
              className="text-sm"
              style={{ color: '#f06292', fontStyle: 'italic' }}
            >
              (Click the box to reveal 💖)
            </p>
          </>
        ) : (
          <>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
            >
              💖 The Answer Is... 💖
            </h2>
            
            {/* Video display */}
            <div 
              className="relative mx-auto mb-4 rounded-lg overflow-hidden shadow-lg"
              style={{ 
                width: '100%', 
                maxWidth: '600px',
                border: '4px solid #f48fb1',
              }}
            >
              <video
                src={require('./video.mp4')}
                autoPlay
                controls
                onEnded={handleVideoEnd}
                className="w-full"
                style={{ maxHeight: '400px' }}
              />
            </div>

            {videoEnded && (
              <div className="animate-fade-in mt-4">
                <p 
                  className="text-lg"
                  style={{ color: '#e91e63', fontFamily: 'Georgia, serif' }}
                >
                  Opening final message... 💝
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Decorative bottom */}
      {!showVideo && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <svg width="100" height="20" viewBox="0 0 100 20">
            <path d="M0 10 Q25 0 50 10 Q75 20 100 10" stroke="#f48fb1" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      )}
    </div>
  );
}

// Success Message Component - Thanks for visiting
function SuccessMessage() {
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    setShowHearts(true);
  }, []);

  return (
    <div className="text-center relative">
      {/* Floating hearts animation */}
      {showHearts && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <svg width="30" height="30" viewBox="-15 -15 30 30">
                <path d={heartPath(18)} fill={['#e91e63', '#f06292', '#ff8a9b', '#c2185b'][i % 4]} opacity="0.8"/>
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Success envelope */}
      <div className="mb-8">
        <LoveEnvelope isOpen={false} />
      </div>

      <h1 
        className="text-4xl font-bold mb-4 animate-pulse"
        style={{ color: '#c2185b', fontFamily: 'Georgia, serif' }}
      >
        💕 Thanks for Visiting! 💕
      </h1>
      
      <p 
        className="text-xl mb-4"
        style={{ color: '#e91e63', fontFamily: 'Georgia, serif' }}
      >
        That's all for now... 💖
      </p>

      <p 
        className="text-lg"
        style={{ color: '#f06292', fontFamily: 'Georgia, serif' }}
      >
        I Love You Forever and Always ❤️
      </p>

      {/* Big heart */}
      <div className="mt-8 animate-bounce">
        <svg width="80" height="80" viewBox="-15 -15 30 30">
          <path d={heartPath(28)} fill="#e91e63"/>
        </svg>
      </div>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState('tree'); // 'tree', 'envelope', 'letter', 'envelope2', 'letter2', 'envelope3', 'letter3', 'envelope4', 'letter4', 'envelope5', 'letter5', 'success'
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 140, y: 0 });

  const handleEnter = () => {
    setStage('envelope');
    // Auto open envelope after a delay
    setTimeout(() => {
      setEnvelopeOpen(true);
      setTimeout(() => {
        setStage('letter');
      }, 800);
    }, 1000);
  };

  const handleYes = () => {
    // Go to second envelope
    setEnvelopeOpen(false);
    setStage('envelope2');
    // Auto open envelope after a delay
    setTimeout(() => {
      setEnvelopeOpen(true);
      setTimeout(() => {
        setStage('letter2');
      }, 800);
    }, 1000);
  };

  const handleNoHover = () => {
    // Move the No button to a random position
    const newX = Math.random() > 0.5 ? 
      Math.random() * 100 - 150 : // Left side
      Math.random() * 100 + 180;  // Right side
    const newY = Math.random() * 80 - 40;
    setNoPosition({ x: newX, y: newY });
  };

  const handleInfinity = () => {
    // Go to third envelope
    setEnvelopeOpen(false);
    setStage('envelope3');
    // Auto open envelope after a delay
    setTimeout(() => {
      setEnvelopeOpen(true);
      setTimeout(() => {
        setStage('letter3');
      }, 800);
    }, 1000);
  };

  const handleLetter3Complete = () => {
    // Go to fourth envelope
    setEnvelopeOpen(false);
    setStage('envelope4');
    // Auto open envelope after a delay
    setTimeout(() => {
      setEnvelopeOpen(true);
      setTimeout(() => {
        setStage('letter4');
      }, 800);
    }, 1000);
  };

  const handleLetter4Complete = () => {
    // Go to fifth envelope
    setEnvelopeOpen(false);
    setStage('envelope5');
    // Auto open envelope after a delay
    setTimeout(() => {
      setEnvelopeOpen(true);
      setTimeout(() => {
        setStage('letter5');
      }, 800);
    }, 1000);
  };

  const handleLetter5Complete = () => {
    setStage('success');
  };

  return (
    <div 
      className="h-screen w-screen relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)'
      }}
    >
      {stage === 'tree' && (
        <>
          <HeartTreeScene />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onClick={handleEnter}
              className="px-10 py-3 text-lg font-semibold text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
                boxShadow: '0 8px 25px rgba(233, 30, 99, 0.4)',
              }}
            >
              Enter
            </button>
          </div>
        </>
      )}

      {stage === 'envelope' && (
        <div className="h-full w-full flex items-center justify-center">
          <div className={`transform transition-all duration-1000 ${envelopeOpen ? 'scale-110' : 'scale-100 animate-bounce'}`}>
            <LoveEnvelope isOpen={envelopeOpen} />
          </div>
        </div>
      )}

      {stage === 'letter' && (
        <div className="h-full w-full flex items-center justify-center animate-fade-in">
          <LoveLetter 
            onYes={handleYes} 
            onNoHover={handleNoHover}
            noPosition={noPosition}
          />
        </div>
      )}

      {stage === 'envelope2' && (
        <div className="h-full w-full flex items-center justify-center">
          <div className={`transform transition-all duration-1000 ${envelopeOpen ? 'scale-110' : 'scale-100 animate-bounce'}`}>
            <LoveEnvelope isOpen={envelopeOpen} />
          </div>
        </div>
      )}

      {stage === 'letter2' && (
        <div className="h-full w-full flex items-center justify-center animate-fade-in">
          <LoveLetter2 onInfinity={handleInfinity} />
        </div>
      )}

      {stage === 'envelope3' && (
        <div className="h-full w-full flex items-center justify-center">
          <div className={`transform transition-all duration-1000 ${envelopeOpen ? 'scale-110' : 'scale-100 animate-bounce'}`}>
            <LoveEnvelope isOpen={envelopeOpen} />
          </div>
        </div>
      )}

      {stage === 'letter3' && (
        <div className="h-full w-full flex items-center justify-center animate-fade-in">
          <LoveLetter3 onComplete={handleLetter3Complete} />
        </div>
      )}

      {stage === 'envelope4' && (
        <div className="h-full w-full flex items-center justify-center">
          <div className={`transform transition-all duration-1000 ${envelopeOpen ? 'scale-110' : 'scale-100 animate-bounce'}`}>
            <LoveEnvelope isOpen={envelopeOpen} />
          </div>
        </div>
      )}

      {stage === 'letter4' && (
        <div className="h-full w-full flex items-center justify-center animate-fade-in">
          <LoveLetter4 onComplete={handleLetter4Complete} />
        </div>
      )}

      {stage === 'envelope5' && (
        <div className="h-full w-full flex items-center justify-center">
          <div className={`transform transition-all duration-1000 ${envelopeOpen ? 'scale-110' : 'scale-100 animate-bounce'}`}>
            <LoveEnvelope isOpen={envelopeOpen} />
          </div>
        </div>
      )}

      {stage === 'letter5' && (
        <div className="h-full w-full flex items-center justify-center animate-fade-in">
          <LoveLetter5 onComplete={handleLetter5Complete} />
        </div>
      )}

      {stage === 'success' && (
        <div className="h-full w-full flex items-center justify-center">
          <SuccessMessage />
        </div>
      )}
    </div>
  );
}

export default App;
