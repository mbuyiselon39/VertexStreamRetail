import React, { useState } from 'react'
import { clsx } from 'clsx'

interface OrderItem {
  id: string
  name: string
  quantity: number
  unit: string
  price: number
}

interface FormErrors {
  customerName?: string
  email?: string
  phone?: string
  address?: string
  items?: string
}

const OrderForm: React.FC = () => {
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('+27')
  const [address, setAddress] = useState('')
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', name: '', quantity: 1, unit: 'unit', price: 0 },
  ])
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const units = ['unit', 'kg', 'liter', 'box', 'pack', 'bag']

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!phone.trim() || phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!address.trim()) {
      newErrors.address = 'Delivery address is required'
    }

    const filledItems = items.filter((item) => item.name.trim())
    if (filledItems.length === 0) {
      newErrors.items = 'Please add at least one item to your order'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: '', quantity: 1, unit: 'unit', price: 0 },
    ])
  }

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const handleItemChange = (id: string, field: keyof OrderItem, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const filledItems = items.filter((item) => item.name.trim())
      const orderSummary = filledItems
        .map(
          (item) =>
            `• ${item.name} - ${item.quantity} ${item.unit}${item.price > 0 ? ` (R${item.price.toFixed(2)})` : ''}`
        )
        .join('%0A')

      const totalPrice = filledItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      const message = `*Vertex Stream Retail Order*%0A%0A*Customer Details:*%0AName: ${customerName}%0AEmail: ${email}%0APhone: ${phone}%0AAddress: ${address}%0A%0A*Order Items:*%0A${orderSummary}%0A%0ATotal: R${totalPrice.toFixed(2)}%0A%0APlease confirm this order. Thank you!`

      const whatsappUrl = `https://wa.me/27123456789?text=${message}`

      // Simulate a small delay for better UX
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
        setSubmitted(true)
        setIsSubmitting(false)

        // Reset form after 2 seconds
        setTimeout(() => {
          setCustomerName('')
          setEmail('')
          setPhone('+27')
          setAddress('')
          setItems([{ id: '1', name: '', quantity: 1, unit: 'unit', price: 0 }])
          setSubmitted(false)
        }, 2000)
      }, 500)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
    }
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const filledItems = items.filter((item) => item.name.trim()).length

  return (
    <div className="max-w-2xl mx-auto">
      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <svg
            className="w-6 h-6 text-green-600 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-green-900">Order submitted!</h3>
            <p className="text-sm text-green-800">
              WhatsApp is opening with your order. Please confirm and send it to complete your order.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Information */}
        <section className="card">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Customer Information</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name *
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                className={clsx('input-field', errors.customerName && 'border-red-500 ring-2 ring-red-200')}
                aria-describedby={errors.customerName ? 'customerName-error' : undefined}
              />
              {errors.customerName && (
                <p id="customerName-error" className="text-red-600 text-sm mt-1">
                  {errors.customerName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className={clsx('input-field', errors.email && 'border-red-500 ring-2 ring-red-200')}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-600 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 123 456 789"
                  className={clsx('input-field', errors.phone && 'border-red-500 ring-2 ring-red-200')}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-600 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-2">
                Delivery Address *
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street, Johannesburg, ZA 2000"
                rows={3}
                className={clsx('input-field', errors.address && 'border-red-500 ring-2 ring-red-200')}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p id="address-error" className="text-red-600 text-sm mt-1">
                  {errors.address}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Order Items */}
        <section className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Order Items</h2>
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {filledItems} item{filledItems !== 1 ? 's' : ''}
            </span>
          </div>

          {errors.items && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.items}</p>
            </div>
          )}

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                  <div className="sm:col-span-2">
                    <label htmlFor={`item-name-${item.id}`} className="block text-xs font-semibold text-slate-600 mb-1">
                      Product Name
                    </label>
                    <input
                      id={`item-name-${item.id}`}
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                      placeholder="e.g., Maize Meal 12.5kg"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor={`item-price-${item.id}`} className="block text-xs font-semibold text-slate-600 mb-1">
                      Price (R)
                    </label>
                    <input
                      id={`item-price-${item.id}`}
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`item-qty-${item.id}`} className="block text-xs font-semibold text-slate-600 mb-1">
                      Quantity
                    </label>
                    <input
                      id={`item-qty-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      min="1"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor={`item-unit-${item.id}`} className="block text-xs font-semibold text-slate-600 mb-1">
                      Unit
                    </label>
                    <select
                      id={`item-unit-${item.id}`}
                      value={item.unit}
                      onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                      className="input-field"
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                  {items.length > 1 && (
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="w-full py-2 px-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
                        aria-label={`Remove item ${index + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {item.name && item.price > 0 && (
                  <div className="mt-3 text-right text-sm font-semibold text-slate-700">
                    Subtotal: R{(item.price * item.quantity).toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 w-full py-2 px-4 border-2 border-dashed border-blue-300 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            aria-label="Add another item to order"
          >
            + Add Item
          </button>
        </section>

        {/* Order Summary */}
        <section className="card bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items:</span>
              <span className="font-semibold">{filledItems}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery:</span>
              <span className="font-semibold">Free (within 25 km)</span>
            </div>
            <div className="border-t-2 border-blue-200 pt-2 mt-2 flex justify-between text-lg font-bold text-blue-900">
              <span>Total:</span>
              <span>R{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
            aria-label="Submit order and open WhatsApp"
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 5.293a1 1 0 011.414 0A7 7 0 0117 10a1 1 0 11-2 0 5 5 0 10-1.414-3.707 1 1 0 010-1.414A7 7 0 0117 10z"
                    clipRule="evenodd"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.967 1.523 9.87 9.87 0 100 13.935 9.87 9.87 0 004.967-1.523 9.87 9.87 0 000-13.935z"/>
                </svg>
                Order via WhatsApp
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrderForm
