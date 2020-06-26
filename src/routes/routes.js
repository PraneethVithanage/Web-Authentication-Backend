import React ,{Component} from 'react';
import{Switch,Route,withRouter} from 'react-router-dom'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Home from '../Components/Home';


class routes extends Component {
render(){
    return (
        <Switch key={this.props.location.key}>
              <Route path ="/"exact component={Login}></Route>
              <Route path ="/Register"exact component={Register}></Route>
              <Route path ="/Login"exact component={Login}></Route>
              <Route path ="/Home"exact component={Home}></Route>

        </Switch>
    )
}
}
export default withRouter(routes);
