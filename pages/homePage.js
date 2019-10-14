import React from 'react';
import Header from './header'
import Footer from './footer'
class HomePage extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <div className="mar" style={{ textAlign: 'center' }}>
                    <h2>
                    Welcome to Launchcap.
                    </h2>
                    <small>We are here for your finance.</small>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default HomePage;