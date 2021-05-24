import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Home from "./main/Home";
import Features from "./main/Features";
import HowTo from "./main/HowTo";
import Corpora from "./main/Corpora";
import FAQs from "./main/FAQs";
import About from "./main/About";

import './App.css'
import './bootstrap.min.css'


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path='/' exact component={Home} />
                <Route path='/features' exact component={Features} />
                <Route path='/Corpora' exact component={Corpora} />
                <Route path='/HowTo' exact component={HowTo} />
                <Route path='/FAQs' exact component={FAQs} />
                <Route path='/About' exact component={About} />
            </BrowserRouter>
        </div>
    );
}

export default App;