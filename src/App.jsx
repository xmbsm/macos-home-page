import React, { Suspense, lazy, useEffect, useState } from 'react'
import useWindowStore from '#store/window'

const NavBar = lazy(() => import('./components/NavBar.jsx'))
const Welcome = lazy(() => import('./components/Welcome.jsx'))
const Dock = lazy(() => import('./components/Dock.jsx'))
const Home = lazy(() => import('./components/Home.jsx'))
const ControlPanel = lazy(() => import('./components/ControlPanel.jsx'))

const Finder = lazy(() => import('./windows/Finder.jsx'))
const Portfolio = lazy(() => import('./windows/Portfolio.jsx'))
const Safari = lazy(() => import('./windows/Safari.jsx'))
const Terminal = lazy(() => import('./windows/Terminal.jsx'))
const Text = lazy(() => import('./windows/Text.jsx'))
const Image = lazy(() => import('./windows/Image.jsx'))
const Sucai = lazy(() => import('./windows/Sucai.jsx'))
const About = lazy(() => import('./windows/About.jsx'))
const Photos = lazy(() => import('./windows/Photos.jsx'))
const Music = lazy(() => import('./windows/Music.jsx'))
const Game = lazy(() => import('./windows/Game.jsx'))
const Trash = lazy(() => import('./windows/Trash.jsx'))
const VSCode = lazy(() => import('./windows/VSCode.jsx'))
const Wallpaper = lazy(() => import('./windows/Wallpaper.jsx'))

const App = () => {
  const { windows } = useWindowStore();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 640);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const saved = localStorage.getItem('wallpaperUrl');
    if (saved) {
      document.documentElement.style.setProperty(
        '--wallpaper-url', `url('${saved}')`
      );
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const preloadModules = () => {
      import('./windows/Finder.jsx');
      import('./windows/Safari.jsx');
      import('./windows/Terminal.jsx');
      import('./windows/Text.jsx');
      import('./windows/Image.jsx');
      import('./windows/Sucai.jsx');
      import('./windows/About.jsx');
      import('./windows/Photos.jsx');
      import('./windows/Music.jsx');
      import('./windows/Game.jsx');
      import('./windows/Trash.jsx');
      import('./windows/VSCode.jsx');
    };
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      requestIdleCallback(preloadModules);
    } else {
      setTimeout(preloadModules, 100);
    }
  }, [isMobile]);
  
  useEffect(() => {
    if (!isMobile) {
      import('gsap').then(({ gsap }) => {
        import('gsap/Draggable').then(({ Draggable }) => {
          gsap.registerPlugin(Draggable);
        });
      });
    }
  }, [isMobile]);
  
  return (
    <>
      <main>
        <Suspense fallback={<div />}>
          <NavBar />
          <ControlPanel />
          <Welcome />
          <Dock />
        </Suspense>
        
        {windows['terminal']?.isOpen && <Suspense fallback={null}><Terminal /></Suspense>}
        {windows['safari']?.isOpen && <Suspense fallback={null}><Safari /></Suspense>}
        {windows['imgfile']?.isOpen && <Suspense fallback={null}><Image /></Suspense>}
        {windows['txtfile']?.isOpen && <Suspense fallback={null}><Text /></Suspense>}
        {windows['finder']?.isOpen && <Suspense fallback={null}><Finder /></Suspense>}
        {windows['portfolio']?.isOpen && <Suspense fallback={null}><Portfolio /></Suspense>}
        {windows['about']?.isOpen && <Suspense fallback={null}><About /></Suspense>}
        {windows['contact']?.isOpen && <Suspense fallback={null}><Sucai /></Suspense>}
        {windows['photos']?.isOpen && <Suspense fallback={null}><Photos /></Suspense>}
        {windows['music']?.isOpen && <Suspense fallback={null}><Music /></Suspense>}
        {windows['game']?.isOpen && <Suspense fallback={null}><Game /></Suspense>}
        {windows['vscode']?.isOpen && <Suspense fallback={null}><VSCode /></Suspense>}
        {windows['trash']?.isOpen && <Suspense fallback={null}><Trash /></Suspense>}
        {windows['wallpaper']?.isOpen && <Suspense fallback={null}><Wallpaper /></Suspense>}
        
        <Suspense fallback={null}><Home /></Suspense>
      </main>
      
    </>
  )
}

export default App
