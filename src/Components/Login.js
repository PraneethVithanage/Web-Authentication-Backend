import React ,{Component} from 'react';
import{ Button,Form,Label,FormGroup} from 'reactstrap';
import axios from "axios";
import{Link} from 'react-router-dom'

 

class  Login extends Component { 

  constructor(props){
    super(props)
    this.state ={
      email:'',
      password:'',
     
    }
  }
  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  submitHandler  =e =>{
    e.preventDefault()
    console.log(this.state)
    axios.post('http://192.168.8.100:3001/api/auth/login',this.state)
    .then(response =>{
      this.props.history.push("/Home")
    })
    .catch(error => {
      alert(error)
    })
  }

  render(){
    const {email,password} = this.state

  return(
    <div className="bar">
   <Form onSubmit ={this.submitHandler} className ="login-form">
   <h1 className="font-weight-bold"> mywebside.com  </h1>
   <h2>Welcome</h2>
   <FormGroup>
    <Label>Email</Label>
    
     <input type="email" placeholder="Email" name ="email" value ={email} onChange={this.changeHandler}></input>
    </FormGroup>
    <FormGroup>
    <Label>Password</Label>
     <input type="password" placeholder="Password"  name  ="password" value ={password} onChange={this.changeHandler}></input>
    </FormGroup>
    <Button  type ="submit" className="btn-lg btn-dark btn-block">Login</Button>
    <div className ="link">
    <Link to ="/Register">I don't have an account</Link>
    </div>
  </Form>
  </div>

  );
  }
}


export  default Login;

