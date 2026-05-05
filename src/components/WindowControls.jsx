import useWindowStore from '#store/window'
import React from 'react'

const WindowControls = ({target}) => {

  const { closeWindow, toggleMaximizeWindow } = useWindowStore();

  return (
    <div id='window-controls'>
      <div className='close' onClick={(e) => { e.stopPropagation(); closeWindow(target); }} />
      <div className='minimize' onClick={(e) => { e.stopPropagation(); closeWindow(target); }} />
      <div className='maximize' onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(target); }} />
    </div>
  )
}

export default WindowControls