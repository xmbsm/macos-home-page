import { WindowControls } from '#components'
import { blogPosts } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from 'lucide-react/dist/esm/icons'
import React, { useState, useRef, useEffect } from 'react'

const Safari = () => {
  const [url, setUrl] = useState('')
  const [iframeUrl, setIframeUrl] = useState('')
  const inputRef = useRef(null)

  const handleSearch = (e) => {
    if (e.key === 'Enter' && url.trim()) {
      let targetUrl = url.trim()
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl
      }
      setIframeUrl(targetUrl)
    }
  }

  const handleSearchClick = () => {
    if (url.trim()) {
      let targetUrl = url.trim()
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl
      }
      setIframeUrl(targetUrl)
    }
  }

  return (
    <>
      <div id='window-header' className='flex items-center justify-between'>
        <div className='window-drag-handle flex items-center'>
          <WindowControls target="safari" />
          <PanelLeft className='hidden sm:block ml-10 icon' />
          <div className='hidden sm:flex items-center gap-1 ml-5'>
            <ChevronLeft className='icon' />
            <ChevronRight className='icon' />
          </div>
        </div>
        <div className='flex-1 flex-center gap-3'>
          <ShieldHalf className='hidden sm:block icon' />
          <div className='hidden sm:flex search' 
               onMouseDown={(e) => e.stopPropagation()} 
               onClick={(e) => e.stopPropagation()}>
            <Search className='icon cursor-pointer' onClick={handleSearchClick} />
            <input 
              ref={inputRef}
              type='text' 
              placeholder='搜索或输入网址'
              className='flex-1'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleSearch}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <button className='sm:hidden p-1' aria-label='搜索'>
          <Search className='icon' />
        </button>
        <div className='hidden sm:flex items-center gap-5'>
          <Share className='icon' />
          <Plus className='icon' onClick={() => { setIframeUrl(''); setUrl('') }} />
          <Copy className='icon' />
        </div>
      </div>
      {iframeUrl ? (
        <div style={{ height: 'calc(100% - 48px)' }}>
          <iframe
            src={iframeUrl}
            title="浏览器"
            className="w-full h-full border-0"
            allow="fullscreen"
          />
        </div>
      ) : (
        <div className='blog'>
          <h2>
            博客
          </h2>
          <div className='blog-content'>
            <div className='space-y-8'>
              {blogPosts.map(({id, image, title, date, link}) => (
                <div key={id} className='blog-post'>
                  <div className='col-span-2 '>
                    <img 
                      src={image}
                      alt={title}
                      loading='lazy'
                    />
                  </div>
                  <div className='content'>
                    <p>{date}</p>
                    <h3>{title}</h3>
                    <a href={link} target='_blank' rel='noopener noreferrer'>
                      点击查看 <MoveRight className='icon-hover' />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const SafariWindow = WindowWrapper(Safari, 'safari')

export { Safari }
export default SafariWindow;
