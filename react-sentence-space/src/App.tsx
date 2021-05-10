import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./main/Home";
import Features from "./main/Features"
import './App.css'
import './bootstrap.min.css'


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path='/' exact component={Home} />
                <Route path='/features' exact component={Features} />
            </BrowserRouter>
        </div>
    );
}

export default App;