import { navIcons, navLinks, locations } from "#constants";
import useWindowStore from '#store/window';
import useLocationStore from '#store/location';
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import Clock from './Clock';
import NavLink from "./NavLink";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640);
  const openWindow = useWindowStore(state => state.openWindow);
  const setActiveLocation = useLocationStore(state => state.setActiveLocation);
  const menuPortalRef = useRef(null);

  const wrapperRef = useRef(null);
  const gifRef = useRef(null);
  const logoPortfolioRef = useRef(null);
  const logoPortfolioPlaceholderRef = useRef(null);
  const settingsButtonRef = useRef(null);
  const lastToggleTime = useRef(0);

  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'mobile-menu-portal';
    document.body.appendChild(container);
    menuPortalRef.current = container;

    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      container.remove();
    };
  }, []);

  useEffect(() => {
    const isMobileMode = window.innerWidth <= 640;
    
    Promise.all([
      import('gsap'),
      import('gsap/Draggable')
    ]).then(([{ gsap }, { Draggable }]) => {
      const wrapper = wrapperRef.current;
      const gif = gifRef.current;
      const logoPortfolio = logoPortfolioRef.current;
      const logoPortfolioPlaceholder = logoPortfolioPlaceholderRef.current;

      if (!wrapper || !gif) return;

      gsap.set(gif, {
        opacity: 0,
        y: 8
      });

      if (logoPortfolioPlaceholder) {
        gsap.set(logoPortfolioPlaceholder, { opacity: 0 });
      }

      if (isMobileMode) return;

      const enter = () => {
        gsap.to(gif, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out"
        });
      };

      const leave = () => {
        gsap.to(gif, {
          opacity: 0,
          y: 8,
          duration: 0.3,
          ease: "power3.out"
        });
      };

      wrapper.addEventListener("mouseenter", enter);
      wrapper.addEventListener("mouseleave", leave);

      if (logoPortfolio && logoPortfolioPlaceholder) {
        const snapThreshold = 500;

        Draggable.create(logoPortfolio, {
          type: "x,y",
          bounds: "body",
          cursor: "grab",
          activeCursor: "grabbing",
          zIndexBoost: false,
          onDragStart: function () {
            gsap.to(logoPortfolioPlaceholder, { opacity: 1, duration: 0.2 });
          },
          onDragEnd: function () {
            const isWithinSnapZone = 
              Math.abs(this.x) < snapThreshold && 
              Math.abs(this.y) < snapThreshold;

            if (isWithinSnapZone) {
              gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
            
            gsap.to(logoPortfolioPlaceholder, { opacity: 0, duration: 0.2 });
          }
        });
      }
    });
  }, []);

  const handleNavLinkClick = (type) => {
    if (!type) return;

    if (type === 'finder') {
      setActiveLocation(locations.work);
    }

    openWindow(type);
    setIsMobileMenuOpen(false);
  };

  const handleIconClick = ({ type, action }) => {
    if (!type) return;
    
    if (action === 'about') {
      openWindow('about');
    } else {
      openWindow(type);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSettingsClick = () => {
    const rect = settingsButtonRef.current?.getBoundingClientRect();
    const event = new CustomEvent('openControlPanel', {
      detail: {
        x: rect?.right || 0,
        y: rect?.bottom || 0
      }
    });
    document.dispatchEvent(event);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleTime.current < 300) return;
    lastToggleTime.current = now;
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const mobileMenu = isMobile && isMobileMenuOpen ? (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        left: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(30px) saturate(100%)',
        WebkitBackdropFilter: 'blur(30px) saturate(100%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), inset 0 0px 0px rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '1.25rem',
        zIndex: 2147483647,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: 'calc(100vh - 80px)',
        animation: 'liquidGlassIn 0.3s ease-out',
      }}
    >
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: 0, padding: 0, listStyle: 'none' }}>
        {navLinks.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => handleNavLinkClick(link.type)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '14px 18px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.3px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{link.name}</span>
            </button>
          </li>
        ))}
        <li style={{ borderTop: '1px solid rgba(255,255,255,0.2)', margin: '6px 0' }}></li>
        <li>
          <button
            onClick={handleSettingsClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              textAlign: 'left',
              padding: '14px 18px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              letterSpacing: '0.3px',
              transition: 'all 0.2s ease',
            }}
          >
            <img src="/icons/mode.svg" alt="settings" style={{ width: '22px', height: '22px', filter: 'brightness(0) invert(1)' }} />
            <span>设置</span>
          </button>
        </li>
        {navIcons.map(({ id, img, type, action }) => {
          const iconNames = {
            2: '搜索',
            3: '音乐',
            4: '关于',
            6: '壁纸'
          };
          return (
            <li key={id}>
              <button
                onClick={() => handleIconClick({ type, action })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  letterSpacing: '0.3px',
                  transition: 'all 0.2s ease',
                }}
              >
                <img src={img} alt={`icon-${id}`} style={{ width: '22px', height: '22px', filter: 'brightness(0) invert(1)' }} />
                <span>{iconNames[id] || id}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;

  return (
    <>
      <nav>
        <div>
          <div className="logo-portfolio-container" ref={logoPortfolioRef}>
            <img src="/images/logo.svg" alt="logo" />
            <div className="portfolio-wrapper" ref={wrapperRef}>
              <p className="font-bold portfolio-text">酷设计</p>
              <div className="portfolio-text-container">
                <div className="overlay-gif" ref={gifRef}></div>
              </div>
            </div>
          </div>
          
          <div className="logo-portfolio-placeholder" ref={logoPortfolioPlaceholderRef}>
          </div>

          <ul>
            {navLinks.map((link) => (
              <NavLink key={link.id} {...link} onClick={() => handleNavLinkClick(link.type)} />
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {navIcons.map(({ id, img, type, action }) => (
              <li key={id} onClick={() => handleIconClick({ type, action })}>
                <img
                  src={img}
                  className={`icon-hover ${type ? 'cursor-pointer' : ''}`}
                  alt={`icon-${id}`}
                />
              </li>
            ))}
            <li ref={settingsButtonRef}>
              <img 
                src="/icons/mode.svg" 
                onClick={handleSettingsClick} 
                className="icon-hover cursor-pointer" 
                alt="settings"
              />
            </li>
          </ul>
          
          <Clock />
          
          <button
            type="button"
            className="mobile-menu-btn p-2"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
      </nav>
      {menuPortalRef.current && createPortal(mobileMenu, menuPortalRef.current)}
    </>
  );
}

NavBar.displayName = 'NavBar';

export default NavBar;
