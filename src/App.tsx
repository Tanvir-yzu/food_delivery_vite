import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import RestaurantList from './components/RestaurantList'
import RestaurantsPage from './components/RestaurantsPage'
import Login from './components/Login'
import Register from './components/Register'
import OrderPage from './components/OrderPage'
import Dashboard from './components/Dashboard'

// Simple in-memory database
interface User {
  username: string;
  email: string;
  password: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

const users: User[] = []
const orders: { username: string; items: OrderItem[]; total: number }[] = []
const initialRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Burger Palace',
    cuisine: 'American',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    name: 'Sushi Sensation',
    cuisine: 'Japanese',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [showOrderPage, setShowOrderPage] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showRestaurantsPage, setShowRestaurantsPage] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants)

  const handleRegister = (username: string, email: string, password: string) => {
    if (users.some(user => user.username === username || user.email === email)) {
      alert('Username or email already exists')
      return
    }
    users.push({ username, email, password })
    console.log('Registered:', username, email)
    setShowRegister(false)
    setShowLogin(true)
  }

  const handleLogin = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      setIsLoggedIn(true)
      setCurrentUser(username)
      setShowLogin(false)
      console.log('Logged in:', username)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setShowOrderPage(false)
    setShowDashboard(false)
    setShowRestaurantsPage(false)
  }

  const handleOrderSubmit = (orderItems: OrderItem[]) => {
    if (currentUser) {
      const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      orders.push({ username: currentUser, items: orderItems, total })
      console.log('Order submitted:', { username: currentUser, items: orderItems, total })
      alert('Order submitted and payment processed successfully!')
      setShowOrderPage(false)
    } else {
      alert('Please log in to submit an order.')
    }
  }

  const handleAddRestaurant = (newRestaurant: Omit<Restaurant, 'id'>) => {
    const id = restaurants.length + 1
    setRestaurants([...restaurants, { ...newRestaurant, id }])
    alert('New restaurant added successfully!')
  }

  const handleRestaurantsClick = () => {
    setShowRestaurantsPage(true)
    setShowOrderPage(false)
    setShowDashboard(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setShowLogin(true)} 
        onLogoutClick={handleLogout}
        onOrderClick={() => {
          setShowOrderPage(true)
          setShowDashboard(false)
          setShowRestaurantsPage(false)
        }}
        onDashboardClick={() => {
          setShowDashboard(true)
          setShowOrderPage(false)
          setShowRestaurantsPage(false)
        }}
        isAdmin={currentUser === 'admin'}
        onRestaurantsClick={handleRestaurantsClick}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to FoodDelivery{currentUser ? `, ${currentUser}` : ''}</h1>
        {showDashboard ? (
          <Dashboard 
            users={users} 
            orders={orders} 
            restaurants={restaurants}
            onAddRestaurant={handleAddRestaurant}
          />
        ) : showOrderPage ? (
          <OrderPage onOrderSubmit={handleOrderSubmit} />
        ) : showRestaurantsPage ? (
          <RestaurantsPage restaurants={restaurants} />
        ) : (
          <RestaurantList restaurants={restaurants} />
        )}
      </main>
      <Footer />
      {showLogin && (
        <Login 
          onLogin={handleLogin} 
          onClose={() => setShowLogin(false)} 
          onSwitchToRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}
      {showRegister && (
        <Register 
          onRegister={handleRegister} 
          onClose={() => setShowRegister(false)} 
          onSwitchToLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}
    </div>
  )
}

export default App