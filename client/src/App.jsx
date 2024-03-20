import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import PrivateComponent from './components/PrivateComponent'
import FoodMenu from './components/Foodmenu'
import About from './components/About'
import Home from './components/Home'
import Cart from './components/Cart'
import Partner from './components/Partner'
import './App.css'

function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>


          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<FoodMenu />} />
              <Route path='/cart' element={<Cart />} />
            </Route>

            <Route path='/partner' element={<Partner />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;


