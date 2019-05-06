import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Services from './components/Services';
import Homepage from './components/Homepage';
import CreateAccount from './components/CreateAccount';
import './css/App.css';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <div className="MyContent">
                        <Route exact path="/" component={Homepage}/>
                        <Route path="/about-us" component={AboutUs}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/services" component={Services}/>
                        <Route path="/create-account" component={CreateAccount}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;