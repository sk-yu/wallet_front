import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Wallet from './components/wallet/Wallet';
// import createHistory from 'history/createBrowserHistory'
// const history = createHistory();


class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Route exact path="/" component={SignIn}>
						{/* {<Redirect to="signin" />} */}
					</Route>
					<Route path="/signin" component={SignIn}/>
          			<Route path="/signup" component={SignUp}/>
					<Route path="/wallet" component={Wallet}/>
					{/* <Route path="/employee" component={Employee} /> */}
				</BrowserRouter>
			</div>
		)
	}
}

export default App;