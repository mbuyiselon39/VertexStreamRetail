import React from 'react'

const Header: React.FC = () => (
  <header className="site-header">
    <div className="header-inner">
      <a className="brand" href="#top" aria-label="Vertex Stream home">
        <span className="brand-mark"><img src="/icons/icon.svg" alt="" /></span>
        <span className="brand-name">vertex<span>stream</span><small>RETAIL · WHOLESALE</small></span>
      </a>
      <div className="header-right"><span className="open-status"><i /> HERE TO HELP</span>
        <a href="https://wa.me/27710638878" target="_blank" rel="noopener noreferrer" className="header-contact" aria-label="Contact us on WhatsApp">
          <span className="wa-icon">↗</span><span>Chat with us<small>WhatsApp support</small></span>
        </a>
      </div>
    </div>
  </header>
)

export default Header
