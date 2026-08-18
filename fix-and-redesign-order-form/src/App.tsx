import { useState } from 'react'
import OrderForm from './components/OrderForm'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <OrderForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
