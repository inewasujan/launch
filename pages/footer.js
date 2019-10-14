import React from 'react';

class Footer extends React.Component {
    render() {
        return(
            <div>
                <div style={{
                    margin: '50px 0',
                    textAlign: 'center'
                 }}>
                © {new Date().getFullYear()} Launchcap Pty Ltd. ABN 123456789
                </div>
            </div>
        )
    }
}

export default Footer;