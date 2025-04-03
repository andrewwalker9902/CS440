import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <body>
    <header>
        <h1>Sporting Goods Discount Store</h1>
    </header>
    <nav>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
    </nav>
    <div class="login-container">
        <p>Are you an employee? <a href="login.html">Login Here</a></p>
    </div>
</body>
  )
}

export default App
