import { useMemo, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import { CATEGORIES, ALL_PRODUCTS, DELIVERY_OPTIONS, formatR } from './data/products'

const accents = ['from-emerald-400 to-teal-600','from-amber-400 to-orange-500','from-lime-400 to-emerald-600','from-sky-400 to-blue-600','from-pink-400 to-rose-600']

function App() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [deliveryIdx, setDeliveryIdx] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  const update = (id: string, amount: number) => setCart(current => {
    const next = { ...current, [id]: Math.max(0, (current[id] || 0) + amount) }
    if (!next[id]) delete next[id]
    return next
  })
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const subtotal = ALL_PRODUCTS.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0)
  const filtered = useMemo(() => {
    let products = ALL_PRODUCTS.filter(p => (category === 'all' || CATEGORIES.find(c => c.title === p.category)?.id === category) && `${p.name} ${p.pack} ${p.category}`.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'low') products = [...products].sort((a,b) => a.price-b.price)
    if (sort === 'high') products = [...products].sort((a,b) => b.price-a.price)
    return products
  }, [category, search, sort])

  return <div className="store-shell min-h-screen flex flex-col" id="top">
    <Header cartCount={itemCount} onCart={() => setCartOpen(true)} />
    <main className="flex-1">
      <section className="hero-band"><div className="hero-inner">
        <div className="hero-copy"><span className="eyebrow"><span className="pulse-dot"/> WHOLESALE, REIMAGINED</span>
          <h1>Good stock.<br/><span>Great business.</span></h1>
          <p>Everything your shelves need, in one easy place. Discover wholesale essentials at prices that work harder for your business.</p>
          <div className="hero-meta"><span>✦ Curated wholesale essentials</span><span>◈ Free delivery within 25 km</span></div>
          <a className="hero-cta" href="#catalogue">Shop the catalogue <b>↓</b></a>
        </div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-bag"><span>V</span><i>VERTEX<br/>SUPPLY</i></div><div className="floating-chip chip-top">SMARTER STOCKING <b>✦</b></div><div className="floating-chip chip-bottom"><b>01</b> YOUR BUSINESS, BETTER</div></div>
      </div></section>
      <div className="trust-strip"><span>✦ Wholesale value, every day</span><span>◈ Local delivery options</span><span>↗ Easy WhatsApp checkout</span></div>
      <section className="catalogue" id="catalogue">
        <div className="catalogue-heading"><div><span className="eyebrow dark">THE VERTEX SELECTION</span><h2>Shop essentials</h2><p>Browse our range and build a basket in just a few clicks.</p></div><div className="catalogue-total"><strong>{ALL_PRODUCTS.length}+</strong><span>products<br/>to explore</span></div></div>
        <div className="catalogue-tools"><label className="search-box"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, brands, sizes…" aria-label="Search products"/>{search && <button onClick={()=>setSearch('')} aria-label="Clear search">×</button>}</label><label className="sort-select"><span>Sort</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
        <nav className="category-nav" aria-label="Product categories"><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>All products <small>{ALL_PRODUCTS.length}</small></button>{CATEGORIES.map(c=><button key={c.id} className={category===c.id?'active':''} onClick={()=>setCategory(c.id)}><span>{c.emoji}</span>{c.title}<small>{c.items.length}</small></button>)}</nav>
        {filtered.length ? <div className="product-grid">{filtered.map((p,i)=><ProductCard key={p.id} product={p} accent={accents[i%accents.length]} qty={cart[p.id]||0} onAdd={()=>update(p.id,1)} onInc={()=>update(p.id,1)} onDec={()=>update(p.id,-1)}/>)}</div> : <div className="empty-results"><span>⌕</span><h3>No matches just yet</h3><p>Try another product name or browse a different category.</p><button onClick={()=>{setSearch('');setCategory('all')}}>Show all products</button></div>}
        <div className="catalogue-footnote">Prices shown in South African Rand · Delivery fee calculated at checkout</div>
      </section>
      <section className="bottom-banner"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Let’s get your shelves sorted.</h2><p>Add your essentials to the basket and send your order straight to our team.</p></div><button onClick={()=>setCartOpen(true)}>View your basket <span>↗</span></button></section>
    </main>
    <Footer/>
    <button className={`floating-cart ${itemCount?'has-items':''}`} onClick={()=>setCartOpen(true)} aria-label={`Open basket, ${itemCount} items`}><span className="cart-glyph">▣</span><span className="float-label">Basket</span>{itemCount>0&&<b>{itemCount}</b>}<i>{formatR(subtotal)}</i></button>
    <CartDrawer open={cartOpen} cart={cart} deliveryIdx={deliveryIdx} onDeliveryChange={setDeliveryIdx} onClose={()=>setCartOpen(false)} onInc={id=>update(id,1)} onDec={id=>update(id,-1)} onRemove={id=>setCart(c=>{const n={...c};delete n[id];return n})} onClear={()=>setCart({})}/>
  </div>
}
export default App
