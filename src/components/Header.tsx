import React from 'react'
import { Utensils } from 'lucide-react'

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onOrderClick: () => void;
  onDashboardClick: () => void;
  isAdmin: boolean;
  onRestaurantsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn, 
  onLoginClick, 
  onLogoutClick, 
  onOrderClick, 
  onDashboardClick, 
  isAdmin,
  onRestaurantsClick
}) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Utensils className="mr-2" />
          <span className="text-xl font-bold">FoodDelivery App</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200">Home</a></li>
            <li><button onClick={onRestaurantsClick} className="hover:text-blue-200">Restaurants</button></li>
            {isLoggedIn && (
              <li><button onClick={onOrderClick} className="hover:text-blue-200">Order</button></li>
            )}
            {isAdmin && (
              <li><button onClick={onDashboardClick} className="hover:text-blue-200">Dashboard</button></li>
            )}
            {isLoggedIn ? (
              <li><button onClick={onLogoutClick} className="hover:text-blue-200">Logout</button></li>
            ) : (
              <li><button onClick={onLoginClick} className="hover:text-blue-200">Login</button></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header