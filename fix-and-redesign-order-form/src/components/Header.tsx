import React from 'react'
interface Props { cartCount: number; onCart: () => void }
const Header: React.FC<Props> = ({ cartCount, onCart }) => (
  <header className="site-header"><div className="header-inner">
    <a className="brand" href="#top" aria-label="Vertex Stream home"><span className="brand-mark"><img src="/icons/icon.svg" alt=""/></span><span className="brand-name">vertex<span>stream</span><small>RETAIL · WHOLESALE</small></span></a>
    <div className="header-right"><span className="open-status"><i/> WHOLESALE MADE SIMPLE</span><a href="https://wa.me/27710638878" target="_blank" rel="noopener noreferrer" className="header-contact"><span className="wa-icon">↗</span><span>Need a hand?<small>Chat with our team</small></span></a><button className="header-cart" onClick={onCart}><span>▣</span> Basket{cartCount>0&&<b>{cartCount}</b>}</button></div>
  </div></header>
)
export default Header
