import React from 'react'
import {
  Form,
  Select,
  Button,
  Input,
  Modal
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;
const apiKey = "2150afc4979c5f12fcacd67a09d13fa49fa6100f";

// const Component = React.createClass({
//   iframe: function () {
//     return {
//       __html: this.props.iframe
//     }
//   },

//   render: function() {
//     return (
//       <div>
//         <div dangerouslySetInnerHTML={ this.iframe() } />
//       </div>
//     );
//   }
// });



// RegExpression format provided
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

// Error message label
const ErrorValidationLabel = ({ txtLbl }) => (
  <label htmlFor="" style={{ color: "red" }}>
    {txtLbl}
  </label>
);

// Validate check provided
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


class LaunchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      mobileNumber: "",
      companyName: "",
      companyNotes: "",
      errors: {
        emailAddress: '',
        mobileNumber: '',
      },
      

    };
    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  
  // Fire every time we enter a character into one of the inputs on our form
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // types of Errors
    switch (name) {
      case 'emailAddress':
        errors.emailAddress =
          validEmailRegex.test(value)
            ? ''
            : 'Email address is not valid';
        break;
      case 'mobileNumber':
        errors.mobileNumber =
          value.length < 10 || value.length > 10
            ? 'Mobile number must be 10 numbers long'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
  }


  // Submit Form
  submitEvent(e) {
    e.preventDefault()
    // Validate check
    if (validateForm(this.state.errors) &&
      this.firstName.state.value != undefined &&
      this.lastName.state.value != undefined &&
      this.emailAddress.state.value != undefined &&
      this.companyName.state.value != undefined &&
      this.mobileNumber.state.value != undefined
    ) {
      //console.info('Valid Form');
      // Send data to server
      let orgdata = {
        'name': this.companyName.state.value
      };
      fetch(`https://api.pipedrive.com/v1/organizations?api_token=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify(orgdata),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(json => {
          fetch(`https://api.pipedrive.com/v1/persons?api_token=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
              'name': this.firstName.state.value + ' ' + this.lastName.state.value,
              'org_id': json.data.id,
              'email': this.emailAddress.state.value,
              'phone': this.mobileNumber.state.value
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(json => {
              fetch(`https://api.pipedrive.com/v1/deals?api_token=${apiKey}`, {
                method: 'POST',
                body: JSON.stringify({
                  "pipeline_id":2,
                  "user_id":9783206,
                  'title': this.companyName.state.value + ' Deal',
                  'org_id': json.data.org_id.name,
                  'person_id': json.data.id,
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
                .then(json => {
                  fetch(`https://api.pipedrive.com/v1/notes?api_token=${apiKey}`, {
                    method: 'POST',
                    body: JSON.stringify({
                      'content': this.companyNotes.value,
                      'deal_id': json.data.id,
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                }

                )
            })
        })

      alert('Successful submit.');
      setTimeout(function () { location.reload(); }, 3000);
    } else {
      alert('Please complete the form.');
    }
  };

  backOnclick(e) {
    e.preventDefault()
    window.location.href = '/';
  };



  render() {

    const { errors } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading, ModalText } = this.state;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '61',
    })(
      <Select style={{ width: 70 }}>
        <Option value="61">+61</Option>
        <Option value="86">+86</Option>
      </Select>,
    );

    return (
      <div style={{ marginTop: 50 }}>
        <Form layout='horizontal'>
          <FormItem
            label='First Name'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            required="true"
          >
            <Input
              type="text"
              ref={(c) => this.firstName = c}
              name="firstName"
              placeholder={'John'}
            />
          </FormItem>

          <FormItem
            label="Last Name"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            required="true"
          >
            <Input
              type="text"
              ref={(c) => this.lastName = c}
              name="lastName"
              placeholder="Doe"
            />
          </FormItem>

          <FormItem
            label="Email"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            required="true"
          >
            <Input
              type="text"
              ref={(c) => this.emailAddress = c}
              name="emailAddress"
              onChange={this.handleChange}
              placeholder="john.doe@example.com"
              noValidate
            />
            {errors.emailAddress.length > 0 &&
              <span className='errors'>{errors.emailAddress}</span>}
          </FormItem>


          <FormItem
            label="Phone"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            width="500px"
            required="true"
          >
            <Input
              type="text"
              ref={(c) => this.mobileNumber = c}
              name="mobileNumber"
              onChange={this.handleChange}
              placeholder="0449793945"
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
              noValidate
            />
            {errors.mobileNumber.length > 0 &&
              <span className='errors'>{errors.mobileNumber}</span>}
          </FormItem>


          <FormItem
            label="Company Name"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            required="true"
          >
            <Input
              type="text"
              ref={(c) => this.companyName = c}
              name="companyName"
              placeholder="Launchcap Pty. Ltd."
            />

          </FormItem>

          <FormItem
            label="Message"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            required="true"
          >
            {/* <textarea type="text"
              cols={78} rows={8}
              ref={(c) => this.companyNotes = c}
              name="companyNotes"
              placeholder="Type messages here please."
              noValidate /> */}
              <TextArea
                type="text"
                style={{ height: '100px', top: '0' }}
                ref={(c) => this.companyName = c}
                name="companyName"
                placeholder="Write your message here"
              />
          </FormItem>




          <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
            <Button size='large' type='primary' htmlType='submit' onClick={this.submitEvent}>
              OK
          </Button>
            <Button size='large' style={{ marginLeft: 8 }} onClick={this.backOnclick.bind(this)}>
              Redo
          </Button>
         
          </FormItem>
        </Form>
      </div>
    )
  }
}

const LaunchRegForm = Form.create({ name: 'register' })(LaunchForm);

export default LaunchRegForm;