import React from 'react'
import Header from './header'
import Footer from './footer'
import { Form, Input, Icon, Button, Select } from 'antd'

const { Option } = Select
class BankCheck extends React.Component {
    constructor() {
        super()
        this.state = {
            bankName: 'bank_of_statements',
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
        // const inst = bank_of_statements;
        const bankName = this.state.bankName
        const clientNo = this.state.clientNumber
        const pass = this.state.password;
        console.log("Submitted Values: " + bankName + " " + clientNo + " " + pass);

        //post

            fetch('https://test.bankstatements.com.au/api/v1/', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'YO4ONYORIUB17401YYOL4U2F5KGTUYZTXAZ4LFSM',
                    'Accept':	'application/json'
                  },
                body: JSON.stringify({
                    institution: bankName,
                    username: clientNo,
                    password: pass})
            }).then((response) => response.json())
            .then((responseData) =>  console.log(responseData))
            // .catch((err)=>console.log(err))


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
                        label="Choose your bank"
                        labelCol={{ span:8 }}
                        wrapperCol={{ span:8 }}
                    >
                        <Select value={this.state.bankName} >
                            <Option value={this.state.bankName}>Bank of Statement</Option>
                        </Select>
                    </FormItem>
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