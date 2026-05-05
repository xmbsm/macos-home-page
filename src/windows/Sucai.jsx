import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'

const Sucai = () => {
  const openUrl = () => {
    window.open('https://sucai.kusheji.com/', '_blank')
  }

  return (
    <>
      <div id='window-header' className='window-drag-handle'>
        <WindowControls target="contact" />
        <h2 className='flex-1 text-center font-bold'>素材</h2>
        <button 
          onClick={openUrl}
          className='open-url-btn'
          title='在新窗口中打开'
          aria-label='在新窗口中打开'
        >
          <svg 
            t="1777529251583" 
            className="icon" 
            viewBox="0 0 1024 1024" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24"
          >
            <path d="M259.072 249.344c-24.064 0-43.52 19.456-43.52 43.52s19.456 43.52 43.52 43.52 43.52-19.456 43.52-43.52-19.456-43.52-43.52-43.52zM375.808 249.344c-24.064 0-43.52 19.456-43.52 43.52s19.456 43.52 43.52 43.52 43.52-19.456 43.52-43.52-19.456-43.52-43.52-43.52zM492.032 249.344c-24.064 0-43.52 19.456-43.52 43.52s19.456 43.52 43.52 43.52 43.52-19.456 43.52-43.52-19.456-43.52-43.52-43.52z" 
                  fill="currentColor"
            />
            <path d="M811.52 113.664h-599.04c-70.144 0-126.976 56.832-126.976 126.976v542.208c0 70.144 56.832 126.976 126.976 126.976h309.248c23.552 0 42.496-18.944 42.496-42.496s-18.944-42.496-42.496-42.496H212.48c-23.04 0-41.984-18.944-41.984-41.984V462.336h683.008v30.208c0.512 23.04 19.456 41.984 42.496 41.984 23.04 0 41.984-18.432 42.496-41.984V241.152c0-70.144-56.832-127.488-126.976-127.488zM170.496 377.344V241.152c0-23.04 18.944-41.984 41.984-41.984h599.04c23.04 0 41.984 18.944 41.984 41.984v136.192H170.496z" 
                  fill="currentColor"
            />
            <path d="M896 563.2h-209.408c-23.552 0-42.496 18.944-42.496 42.496 0 23.552 18.944 42.496 42.496 42.496H793.6l-188.928 188.928c-16.384 16.384-16.384 43.52 0 60.416 16.384 16.384 43.52 16.384 60.416 0l188.416-188.416v105.984c0 23.552 18.944 42.496 42.496 42.496 23.552 0 42.496-18.944 42.496-42.496v-209.408c0-23.04-18.944-42.496-42.496-42.496z" 
                  fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <iframe
        src="https://sucai.kusheji.com/"
        title="素材"
        className="w-full h-full border-0"
        allow="fullscreen"
      />
    </>
  )
}

const SucaiWindow = WindowWrapper(Sucai, 'contact')

export { Sucai }
export default SucaiWindow;
