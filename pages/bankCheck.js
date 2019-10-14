import React from 'react'
import Header from './header'
import Footer from './footer'
import { Form, Input, Icon, Button } from 'antd'

class BankCheck extends React.Component {
    constructor() {
        super()
        this.state = {
            clientNumber: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
    }

    handleClientChange(e) {
        e.preventDefault();
        this.setState({
            clientNumber: e.target.value
        })
    }

    handlePassChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const clientNo = this.state.clientNumber
        const pass = this.state.password;
        console.log("Submitted Values: " + clientNo + " " + pass);

        //post

            fetch('https://test.bankstatements.com.au/api/v1/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({username:clientNo, password:pass})
            }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    }
    render() {
        const FormItem = Form.Item
        return(
            <div>
                <Header/>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Bank Statement</h1>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="Client Number"
                        labelCol={{ span:8 }}
                        wrapperCol={{ span:8 }}
                        required="true"
                    >
                        <Input
                            type="text"
                            placeholder={ 'Bank Client Number' }
                            value={this.state.clientNumber}
                            onChange={this.handleClientChange}
                        />
                    </FormItem>
                    <FormItem
                        label="Password"
                        labelCol={{ span:8 }}
                        wrapperCol={{ span:8 }}
                        required="true"
                    >
                        <Input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePassChange}
                        />
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ textAlign: 'center' }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </FormItem>
                    </Form>
                <Footer/>
            </div>
        )
    }
}

export default BankCheck