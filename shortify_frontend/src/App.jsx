import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { getApps } from './utils/helper'

function App() {
    const CurrentApp = getApps();

    return (

        <div className="dark:bg-gray-900 dark:text-white transition-colors duration-500 min-h-screen">
            <Router>
                <CurrentApp />
            </Router>
        </div>
    )
}

export default App
