import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import React, { useCallback, memo } from 'react'

const wallpapers = [
  { id: 1, name: 'Wallpaper 1', src: '/images/wallpaper1.jpg' },
  { id: 2, name: 'Wallpaper 2', src: '/images/wallpaper2.jpg' },
  { id: 3, name: 'Wallpaper 3', src: '/images/wallpaper3.jpg' },
  { id: 4, name: 'Wallpaper 4', src: '/images/wallpaper4.jpg' },
  { id: 5, name: 'Wallpaper 5', src: '/images/wallpaper5.jpg' },
  { id: 6, name: 'Wallpaper 6', src: '/images/wallpaper6.jpg' },
  { id: 7, name: 'Wallpaper 7', src: '/images/wallpaper7.jpg' },
  { id: 8, name: 'Wallpaper 8', src: '/images/wallpaper8.jpg' },
  { id: 9, name: 'Wallpaper 9', src: '/images/wallpaper9.jpg' },
  { id: 10, name: 'Wallpaper 10', src: '/images/wallpaper10.jpg' },
  { id: 11, name: 'Wallpaper 11', src: '/images/wallpaper11.jpg' },
  { id: 12, name: 'Wallpaper 12', src: '/images/wallpaper12.jpg' },
  { id: 13, name: 'Wallpaper 13', src: '/images/wallpaper13.jpg' },
  { id: 14, name: 'Wallpaper 14', src: '/images/wallpaper14.jpg' },
  { id: 15, name: 'Wallpaper 15', src: '/images/wallpaper15.jpg' },
  { id: 16, name: 'Wallpaper 16', src: '/images/wallpaper16.jpg' },
  { id: 17, name: 'Wallpaper 18', src: '/images/wallpaper18.jpg' },
  { id: 18, name: 'Wallpaper 20', src: '/images/wallpaper20.jpg' },
  { id: 19, name: 'Wallpaper 21', src: '/images/wallpaper21.jpg' },
  { id: 20, name: 'Wallpaper 22', src: '/images/wallpaper22.jpg' },
  { id: 21, name: 'Wallpaper 23', src: '/images/wallpaper23.jpg' },
  { id: 22, name: 'Wallpaper 24', src: '/images/wallpaper24.jpg' },
  { id: 23, name: 'Wallpaper 25', src: '/images/wallpaper25.jpg' },
]

const WallpaperItem = memo(({ wallpaper, onSelect }) => (
  <div
    className='relative cursor-pointer group'
    onClick={() => onSelect(wallpaper.src)}
  >
    <div className='aspect-video rounded-md overflow-hidden'>
      <img
        src={wallpaper.src}
        alt={wallpaper.name}
        loading='lazy'
        decoding='async'
        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
      />
    </div>
    <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center'>
      {wallpaper.name}
    </div>
  </div>
))

WallpaperItem.displayName = 'WallpaperItem'

const Wallpaper = () => {
  const handleWallpaperSelect = useCallback((src) => {
    localStorage.setItem('wallpaperUrl', src)
    document.documentElement.style.setProperty('--wallpaper-url', `url('${src}')`)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div id='window-header' className='window-drag-handle'>
        <WindowControls target="wallpaper" />
        <h2 className='flex-1 text-center font-bold'>选择壁纸</h2>
        <div className='w-10'></div>
      </div>
      <div className='bg-white p-6 overflow-y-auto flex-1 min-h-0'>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {wallpapers.map((wallpaper) => (
            <WallpaperItem 
              key={wallpaper.id} 
              wallpaper={wallpaper} 
              onSelect={handleWallpaperSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const WallpaperWindow = WindowWrapper(Wallpaper, 'wallpaper')

export { Wallpaper }
export default WallpaperWindow
