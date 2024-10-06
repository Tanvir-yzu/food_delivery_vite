import React, { useState } from 'react'

interface User {
  username: string;
  email: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  username: string;
  items: OrderItem[];
  total: number;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

interface DashboardProps {
  users: User[];
  orders: Order[];
  restaurants: Restaurant[];
  onAddRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ users, orders, restaurants, onAddRestaurant }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'orders' | 'restaurants'>('users')
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisine: '',
    rating: 0,
    image: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewRestaurant(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddRestaurant(newRestaurant)
    setNewRestaurant({ name: '', cuisine: '', rating: 0, image: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'restaurants' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants
        </button>
      </div>
      {activeTab === 'users' && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Users</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'orders' && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Orders</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Username</th>
                <th className="border p-2">Items</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{order.username}</td>
                  <td className="border p-2">
                    {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                  </td>
                  <td className="border p-2">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'restaurants' && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Restaurants</h3>
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Cuisine</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{restaurant.name}</td>
                  <td className="border p-2">{restaurant.cuisine}</td>
                  <td className="border p-2">{restaurant.rating.toFixed(1)}</td>
                  <td className="border p-2">
                    <img src={restaurant.image} alt={restaurant.name} className="w-20 h-20 object-cover" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="text-xl font-semibold mb-4">Add New Restaurant</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newRestaurant.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="cuisine" className="block mb-1">Cuisine:</label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={newRestaurant.cuisine}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block mb-1">Rating:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={newRestaurant.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-1">Image URL:</label>
              <input
                type="url"
                id="image"
                name="image"
                value={newRestaurant.image}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Restaurant
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Dashboard