import React, { useEffect, useState, useRef } from 'react';
import useSettingsStore from '#store/settings';
import { songs } from '#constants';

const ControlPanel = React.memo(() => {
  const { brightness, volume, isMusicPlaying, currentTrack, setBrightness, setVolume, toggleMusic, setMusicPlaying, setCurrentTrack } = useSettingsStore();
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const panelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const handleOpenPanel = (e) => {
      const detail = e.detail || {};
      if (window.innerWidth <= 640) {
        setPanelPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        });
      } else {
        const btnBottom = detail.y || 50;
        setPanelPosition({
          x: detail.x || window.innerWidth - 288 - 20,
          y: btnBottom + 10
        });
      }
      setIsPanelOpen(true);
    };
    document.addEventListener('openControlPanel', handleOpenPanel);
    return () => document.removeEventListener('openControlPanel', handleOpenPanel);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsPanelOpen(false);
      }
    };
    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen]);
  
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness}%)`;
  }, [brightness]);
  
  const handlePlayNext = () => {
    const idx = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(idx);
    setCurrentTrack(songs[idx]);
  };
  
  const handleTogglePlay = () => {
    if (!currentTrack) {
      setCurrentTrack(songs[0]);
      setMusicPlaying(true);
    } else {
      toggleMusic();
    }
  };
  
  const track = currentTrack || songs[currentSongIndex];
  
  if (!isPanelOpen) return null;
  
  return (
    <div 
      ref={panelRef} 
      className="fixed z-50 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      style={{ 
        left: isMobile ? '50%' : panelPosition.x - 288, 
        top: isMobile ? '50%' : panelPosition.y,
        transform: isMobile ? 'translate(-50%, -50%)' : 'none',
      }}
    >
      <div className="p-4" style={{ all: 'initial' }}>
        <div className="grid grid-cols-2 gap-2 mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
          <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 8a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8Z" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: '0' }}>Wi-Fi</p>
              <p style={{ fontSize: '10px', color: '#6b7280', margin: '0' }}>Home</p>
            </div>
          </div>
          
          <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 18V6m0 0l-3 3m3-3l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: '0' }}>Light</p>
              <p style={{ fontSize: '10px', color: '#6b7280', margin: '0' }}>Mode</p>
            </div>
          </div>
          
        </div>
        
        <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5-2 4-2 4 2 4 2" />
              </svg>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Display</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: '500', color: '#6b7280' }}>{brightness}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={brightness} 
            onChange={(e) => setBrightness(Number(e.target.value))} 
            style={{ 
              width: '100%', 
              height: '8px', 
              borderRadius: '4px', 
              WebkitAppearance: 'none', 
              cursor: 'pointer',
              background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${brightness}%, #D1D5DB ${brightness}%, #D1D5DB 100%)`
            }} 
          />
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              cursor: pointer;
            }
            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              cursor: pointer;
              border: none;
            }
          `}</style>
        </div>
        
        <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Sound</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: '500', color: '#6b7280' }}>{volume}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={(e) => setVolume(Number(e.target.value))} 
            style={{ 
              width: '100%', 
              height: '8px', 
              borderRadius: '4px', 
              WebkitAppearance: 'none', 
              cursor: 'pointer',
              background: `linear-gradient(to right, #6B7280 0%, #6B7280 ${volume}%, #D1D5DB ${volume}%, #D1D5DB 100%)`
            }} 
          />
        </div>
        
        <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '12px' }}>
          {track && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={track.cover} 
                alt={track.title} 
                style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div style={{ flex: '1', minWidth: '0' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</p>
                <p style={{ fontSize: '10px', color: '#6b7280', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.author}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={handleTogglePlay} 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: 'white', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  {isMusicPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
                <button 
                  onClick={handlePlayNext} 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: 'white', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                    <path d="M5 3v18l14-9z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ControlPanel.displayName = 'ControlPanel';
export default ControlPanel;
