import React from 'react'
import LaunchForm from './components/form'
import Header from './header'
import Footer from './footer'
class Contact extends React.Component {
    render() {
        return(
            <div>
                <Header/>
                <h1 style={{ textAlign: 'center' }}> Apply for finance</h1>
                <LaunchForm/>
                <Footer/>
            </div>
        )
    }
}

export default Contact;