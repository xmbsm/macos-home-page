import useWindowStore from '#store/window'
import { useGSAP } from '@gsap/react';
import React, { useLayoutEffect, useRef, useState as useReactState, useEffect as useReactEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

const MIN_WINDOW_WIDTH = 400;
const MIN_WINDOW_HEIGHT = 300;

const WindowWrapper = (Component, windowKey) => {

  const Wrapped = React.memo((props) => {
    const focusWindow = useWindowStore(state => state.focusWindow);
    const resizeWindow = useWindowStore(state => state.resizeWindow);
    const windowState = useWindowStore(state => state.windows[windowKey]);
    const { isOpen, isMaximized, zIndex, width: storedWidth, height: storedHeight } = windowState || {};
    const ref = useRef(null);
    const portalRef = useRef(null);
    const isResizingRef = useRef(false);
    const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
    
    // Initialize state with correct value from the start
    const [isMobile, setIsMobile] = useReactState(() => {
      return typeof window !== 'undefined' && window.innerWidth <= 640;
    });
    const [isPortalReady, setIsPortalReady] = useReactState(false);

    useReactEffect(() => {
      // Create portal container for mobile
      const container = document.createElement('div');
      container.id = `mobile-portal-${windowKey}`;
      container.dataset.portal = 'true';
      document.body.appendChild(container);
      portalRef.current = container;
      
      // Force re-render so portal can be created
      setIsPortalReady(true);
      
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 640);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => {
        window.removeEventListener('resize', checkMobile);
        container.remove();
      };
    }, []);

    // open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // For mobile, skip animation - we handle visibility in useLayoutEffect
      if (isMobile) {
        return;
      }

      // Desktop version
      el.style.display = 'block';

      gsap.fromTo(el, {
        scale: 0.8,
        opacity: 0, 
        y: 40,
      },{
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      })
    }, [isOpen, isMobile]);

    const handleResizeMouseDown = useCallback((e) => {
      if (isMobile || isMaximized || !isOpen) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const el = ref.current;
      if (!el) return;

      isResizingRef.current = true;
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: el.offsetWidth,
        height: el.offsetHeight
      };

      focusWindow(windowKey);

      const handleMouseMove = (e) => {
        if (!isResizingRef.current) return;
        
        const deltaX = e.clientX - resizeStartRef.current.x;
        const deltaY = e.clientY - resizeStartRef.current.y;
        
        const newWidth = Math.max(MIN_WINDOW_WIDTH, resizeStartRef.current.width + deltaX);
        const newHeight = Math.max(MIN_WINDOW_HEIGHT, resizeStartRef.current.height + deltaY);
        
        el.style.width = `${newWidth}px`;
        el.style.height = `${newHeight}px`;
      };

      const handleMouseUp = () => {
        if (!isResizingRef.current) return;
        
        isResizingRef.current = false;
        const el = ref.current;
        if (el) {
          resizeWindow(windowKey, el.offsetWidth, el.offsetHeight);
        }
        
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }, [isMobile, isMaximized, isOpen, focusWindow, windowKey, resizeWindow]);

    // draggable handling (disable when maximized or closed or on mobile)
    useGSAP(() => {
      const el = ref.current;
      if (!el || isMobile) return;

      if (!isOpen || isMaximized) {
        // ensure any previous Draggable is killed
        Draggable.get(el)?.kill();
        return;
      }

      const [ instance ] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
        trigger: el.querySelector('.window-drag-handle'),
        ignore: "input, button, .sliders",
        cursor: "grab",
        activeCursor: "grabbing"
      })

      return () => instance.kill();
    }, [isOpen, isMaximized, focusWindow, isMobile]);

    useLayoutEffect(() => {
      const el = ref.current;
      if(!el) return;

      // For mobile, hide desktop element (it should never show)
      if (isMobile) {
        return;
      }

      // Desktop version - visibility based on open state
      el.style.display = isOpen ? 'block' : 'none';

      // toggle maximized styles
      if (isMaximized) {
        // save current position/size once
        if (!el.dataset.prevTop) {
          const cs = window.getComputedStyle(el);
          el.dataset.prevTop = cs.top;
          el.dataset.prevLeft = cs.left;
          el.dataset.prevWidth = cs.width;
          el.dataset.prevHeight = cs.height;
          el.dataset.prevPosition = cs.position;
          el.dataset.prevTransform = cs.transform;
          el.dataset.prevMaxWidth = cs.maxWidth;
          el.dataset.prevRight = cs.right;
          el.dataset.prevBottom = cs.bottom;
        }
        // make it independent from parent constraints
        el.style.position = 'fixed';
        el.style.top = '0';
        el.style.left = '0';
        el.style.right = '0';
        el.style.bottom = '0';
        // ensure it can span full viewport
        el.style.width = '100dvw';
        el.style.height = '100dvh';
        el.style.maxWidth = 'none';
        // neutralize any translate from CSS (e.g., -translate-y-1/2)
        el.style.transform = 'none';
      } else {
        // restore to previous size/position if saved
        if (el.dataset.prevTop) {
          // restore primary box metrics
          el.style.top = el.dataset.prevTop;
          el.style.left = el.dataset.prevLeft;
          el.style.width = el.dataset.prevWidth;
          
          // For contact window, always reset height to auto to accommodate dynamic content
          if (windowKey === 'contact') {
            el.style.height = '';
          } else if (el.dataset.prevHeight !== 'auto') {
            el.style.height = el.dataset.prevHeight;
          } else {
              el.style.height = '';
          }
          
          // restore position and optional constraints
          if (el.dataset.prevPosition) el.style.position = el.dataset.prevPosition;
          if (el.dataset.prevMaxWidth) el.style.maxWidth = el.dataset.prevMaxWidth;
          if (el.dataset.prevTransform) el.style.transform = el.dataset.prevTransform;
          // clear edges that were set for maximized
          el.style.right = '';
          el.style.bottom = '';
          // cleanup
          delete el.dataset.prevTop;
          delete el.dataset.prevLeft;
          delete el.dataset.prevWidth;
          delete el.dataset.prevHeight;
          delete el.dataset.prevPosition;
          delete el.dataset.prevTransform;
          delete el.dataset.prevMaxWidth;
          delete el.dataset.prevRight;
          delete el.dataset.prevBottom;
        } else {
          // reset to auto so component/style sheets can manage sizing/positioning
          el.style.right = '';
          el.style.bottom = '';
          el.style.width = '';
          el.style.height = '';
          el.style.maxWidth = '';
          // Center the window if it's the first time opening
          el.style.transform = 'translate(-50%, -50%)';
          el.style.top = '50%';
          el.style.left = '50%';
        }
        // keep previously dragged top/left as set by Draggable (restored above if existed)
      }
    }, [isOpen, isMaximized, isMobile]);


    const mobileContent = isMobile ? (
      <section 
        style={{
          display: isOpen ? 'flex' : 'none',
          position: 'fixed',
          inset: '0',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          backgroundColor: 'transparent',
          padding: isMaximized ? '0' : '16px',
          margin: '0',
        }}
        onClick={(e) => e.stopPropagation()}>
          <div 
            id={windowKey}
            style={{
              width: isMaximized ? '100vw' : 'min(90vw, 600px)',
              height: isMaximized ? '100vh' : '70vh',
              backgroundColor: '#ffffff',
              borderRadius: isMaximized ? '0' : '16px',
              overflow: 'hidden',
              boxShadow: isMobile ? '0 5px 15px rgba(0,0,0,0.08)' : isMaximized ? 'none' : '0 10px 30px rgba(0,0,0,0.15)',
            }}>
            <Component {...props} />
          </div>
      </section>
    ) : null;

    const desktopContent = !isMobile ? (
      <section 
        id={windowKey} 
        ref={ref} 
        style={{ 
          zIndex: zIndex,
          width: storedWidth ? `${storedWidth}px` : undefined,
          height: storedHeight ? `${storedHeight}px` : undefined,
        }}
        className='window-root'
        onClick={() => focusWindow(windowKey)}>
          <Component {...props} />
          {!isMaximized && (
            <div 
              className="window-resize-handle"
              onMouseDown={handleResizeMouseDown}
            />
          )}
      </section>
    ) : null;

    return (
      <>
        {desktopContent}
        {isMobile && isPortalReady && createPortal(mobileContent, portalRef.current)}
      </>
    )
  });

  Wrapped.displayName = `WindowWrapper(
    ${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
}

export default WindowWrapper