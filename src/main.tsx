import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainPage from "./pages/main/main.page.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MainPage/>
    </React.StrictMode>,
)
