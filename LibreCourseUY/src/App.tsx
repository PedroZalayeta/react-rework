import { BrowserRouter, Routes, Route} from  "react-router-dom"
import Home from "./pages/Home"
import CLA from "./pages/CLA"
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />}/>
        <Route path="/cla" element={ <CLA />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
