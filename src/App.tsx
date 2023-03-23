import { useState } from 'react'
import './App.css'
import Columns from './Columns'

function App() {
  const [count, setCount] = useState(0)


  return <Columns />
}

export default App;
