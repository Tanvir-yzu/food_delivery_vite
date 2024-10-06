import React, { useState } from 'react'
import PaymentForm from './PaymentForm'

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Burger', price: 8.99 },
  { id: 2, name: 'Pizza', price: 10.99 },
  { id: 3, name: 'Salad', price: 6.99 },
  { id: 4, name: 'Fries', price: 3.99 },
  { id: 5, name: 'Soda', price: 1.99 },
]

interface OrderPageProps {
  onOrderSubmit: (order: OrderItem[]) => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ onOrderSubmit }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [showPayment, setShowPayment] = useState(false)

  const addToOrder = (item: MenuItem) => {
    const existingItem = orderItems.find(orderItem => orderItem.id === item.id)
    if (existingItem) {
      setOrderItems(orderItems.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ))
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromOrder = (itemId: number) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromOrder(itemId)
    } else {
      setOrderItems(orderItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmitOrder = () => {
    setShowPayment(true)
  }

  const handlePaymentComplete = () => {
    onOrderSubmit(orderItems)
    setOrderItems([])
    setShowPayment(false)
  }

  if (showPayment) {
    return <PaymentForm total={calculateTotal()} onPaymentComplete={handlePaymentComplete} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Menu</h3>
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <button
                  onClick={() => addToOrder(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Add to Order
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Order</h3>
          {orderItems.length === 0 ? (
            <p>Your order is empty.</p>
          ) : (
            <>
              <ul className="space-y-2 mb-4">
                {orderItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 px-2 py-1 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-2 py-1 rounded-r"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromOrder(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-xl font-semibold mb-4">
                Total: ${calculateTotal().toFixed(2)}
              </div>
              <button
                onClick={handleSubmitOrder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderPage