import { createRoot } from 'react-dom/client'

const App = () => {
  return <div>hi from bunild</div>
}

const div = document.querySelector('#root')
const root = createRoot(div)
root.render(<App />)
