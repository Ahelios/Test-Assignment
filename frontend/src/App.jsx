import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import TableSection from './components/TableSection'
import Footer from './components/Footer'
import RatesTable from './components/RatesTable'
import Statistics from './components/Statistics'

function App() {
  return (
    <>
      <Header/>
      <TableSection/>
      <Footer/>
    </>
  )
}

export default App
