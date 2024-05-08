import './App.css'
import Navbar from './components/Navbar/Navbar'
import Shop from './pages/shop'
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignUp from './pages/LoginSignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import men_banner from './Assets/banner_mens.png'
import women_banner from './Assets/banner_women.png'
import kid_banner from './Assets/banner_kids.png'
import Login from './pages/Login'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product' element={<Product />} >
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<LoginSignUp />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>

  )
}

export default App
