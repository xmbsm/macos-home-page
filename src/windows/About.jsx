import { WindowControls } from '#components'
import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import { Mail } from 'lucide-react/dist/esm/icons'
import React from 'react'
import clsx from 'clsx'

const About = () => {
  const isMaximized = useWindowStore(state => state.windows.about?.isMaximized);
  const email = '1@kusheji.com'
  
  return (
    <>
      <div id='window-header' className='flex items-center justify-between window-drag-handle'>
        <WindowControls target="about" />
        <h2 className='flex-1 text-center'>关于</h2>
        <a
          href={`mailto:${email}`}
          title={`Email: ${email}`}
          className='p-2 hover:bg-gray-200 rounded-md transition-colors'
        >
          <Mail size={17} />
        </a>
      </div>
      <div className='p-5 space-y-5 overflow-y-auto' style={{ maxHeight: 'calc(100% - 48px)' }}>
        <img
          src='/images/qtx.png'
          alt='QTX'
          loading='lazy'
          className={clsx(
            'object-cover object-top rounded-xl',
            isMaximized ? 'w-60' : 'w-30'
          )}
        />
        <h3>
          让我们联系
        </h3>
        <p>
          开放工作和合作。如果您需要构建什么，请写信给我。
        </p>
        <p>
          1@kusheji.com
        </p>
        <ul>
          {socials.map(({id, bg, link, icon, text}) => (
            <li key={id} style={{backgroundColor: bg}}>
              <a 
                href={link} 
                target='_blank' 
                rel='noopener noreferrer'
                title={text}
              >
                <img
                  src={icon}
                  alt={text}
                  loading='lazy'
                  className='size-5'
                />
                <p>
                  {text}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const AboutWindow = WindowWrapper(About, 'about')

export { About }
export default AboutWindow;
