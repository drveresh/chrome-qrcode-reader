import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserQRCodeReader } from '@zxing/library'
import isUrl from './isUrl'


const Reader = () => {
  const [text, set] = useState('')
  const read = (dataUrl) => {
    const img = new Image()
    img.src = dataUrl
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromImage(undefined, dataUrl)
      .then(result => set(result.text))
      .catch((err) => {
        console.log(err.message) //eslint-disable-line
        set('No QR code found or there are multiple QR codes!')
      })
  }
  useEffect(() => {
    chrome.tabs.captureVisibleTab(undefined, { format: 'jpeg' }, read)
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
      }}
    >
      <textarea
        value={text}
        cols="30"
        rows="10"
        onChange={e => set(e.target.value)}
      />
      {
        isUrl(text)
          ? (
            <button
              type="button"
              onClick={() => window.open(text)}
            >
              Open Link
            </button>
          )
          : null
      }
    </div>
  )
}

ReactDOM.render(
  <Reader />,
  document.getElementById('app'),
)
