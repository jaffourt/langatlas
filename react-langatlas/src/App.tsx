import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import ExploreIndividual from "./main/ExploreIndividual";
import ExploreAtlas from "./main/ExploreAtlas";
import Download from "./main/Download";
import Home from "./main/Home";
import Paradigm from "./main/Paradigm"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path='/' exact component={Home} />
                <Route path='/atlas' exact component={ExploreAtlas} />
                <Route path='/subjects' exact component={ExploreIndividual} />
                <Route path='/download' exact component={Download} />
                <Route path='/paradigm' exact component={Paradigm} />
            </BrowserRouter>
        </div>
    );
}

export default App;
