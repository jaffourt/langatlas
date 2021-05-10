import React, { PropsWithChildren } from 'react';

const MainWrapper = (props: PropsWithChildren<any>) => {
    return (
        <>
        <div className="container">
            <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><a href="/" className="nav-link active">Home</a></li>
                <li className="nav-item"><a href="/features" className="nav-link">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link">About</a></li>
            </ul>
            </header>
        </div>
        {props.children}
       </>
    );
}
export default MainWrapper;