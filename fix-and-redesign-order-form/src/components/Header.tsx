import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/icons/icon.svg" 
              alt="Vertex Stream Retail logo" 
              className="w-10 h-10 sm:w-12 sm:h-12" 
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Vertex Stream</h1>
              <p className="text-xs sm:text-sm text-slate-600">Wholesale Groceries</p>
            </div>
          </div>
          <a
            href="https://wa.me/27710638878"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            aria-label="Contact us on WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.967 1.523 9.87 9.87 0 100 13.935 9.87 9.87 0 004.967-1.523 9.87 9.87 0 000-13.935z"/>
            </svg>
            WhatsApp
          </a>
        </div>
        <p className="mt-4 text-sm sm:text-base text-slate-600 text-balance">
          Browse our catalogue, build your basket, and confirm your whole order in one WhatsApp message. <strong>Free delivery within 25 km.</strong>
        </p>
      </div>
    </header>
  )
}

export default Header
