import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Services from './components/Services';
import CreateAccount from './components/CreateAccount';
import './css/App.css';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <div className="MyContent">
                        <Route exact path="/" render ={props => (
                            <React.Fragment>
                                <h1>Main page!</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has been
                                    the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley
                                    of type and scrambled it to make a type specimen
                                    book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was 
                                    popularised in the 1960s with the release of
                                    Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop 
                                    publishing software like Aldus PageMaker
                                    including versions of Lorem Ipsum.</p>
                            </React.Fragment>
                        )} />
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