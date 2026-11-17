import Header from './components/Header'
import Footer from './components/Footer'
import OrderForm from './components/OrderForm'

function App() {
  return (
    <div className="store-shell min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="hero-band">
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow"><span className="pulse-dot" /> WHOLESALE, REIMAGINED</span>
              <h1>Stock up.<br /><span>Stay ahead.</span></h1>
              <p>Your next great order starts here. Premium essentials, wholesale value, delivered to your door.</p>
              <div className="hero-meta"><span>✦ Trusted local supply</span><span>◈ Free delivery within 25 km</span></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="hero-bag"><span>V</span><i>VERTEX<br />SUPPLY</i></div>
              <div className="floating-chip chip-top">GOOD VALUE <b>✦</b></div>
              <div className="floating-chip chip-bottom"><b>01</b> SIMPLE ORDERING</div>
            </div>
          </div>
        </section>
        <div className="order-intro"><div><span className="eyebrow dark">YOUR BUSINESS, BETTER STOCKED</span><h2>Build your order</h2><p>Tell us what you need and we’ll take it from there.</p></div><div className="delivery-pill"><span>↗</span> Free delivery <b>within 25 km</b></div></div>
        <div className="order-wrap"><OrderForm /></div>
      </main>
      <Footer />
    </div>
  )
}

export default App
