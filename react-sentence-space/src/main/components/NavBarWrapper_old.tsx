import React, { PropsWithChildren } from 'react';
import NavBar from 'react'

const MainWrapper = (props: PropsWithChildren<any>) => {
    return (
        <>
        <div className="container">
            <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><a href="/" className="nav-link active">Home</a></li>
                <li className="nav-item"><a href="/Features" className="nav-link">Features Info</a></li>
                <li className="nav-item"><a href="/Corpora" className="nav-link">Corpora Benchmarks</a></li>
                <li className="nav-item"><a href="/HowTo" className="nav-link">How-to</a></li>
                <li className="nav-item"><a href="/FAQs" className="nav-link">FAQs</a></li>
                <li className="nav-item"><a href="/About" className="nav-link">About</a></li>
            </ul>
            </header>
        </div>
        {props.children}
       </>
    );
}
export default MainWrapper;