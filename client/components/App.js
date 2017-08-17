import React from 'react';
import NavBarLogin from './NavBarLogin';
import NavBar from './NavBar';
import Main from './Main';
import Messages from './Messages/Messages';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import UploadPage from './UploadPage';
import LandingPage from './LandingPage';
import ProfilePage from './ProfilePage'
import ownProfile from './ownProfile';
import Matches from './Matches';
import Auth from '../Auth/Auth';
import history from '../history';
import editProfile from './editProfile';
import VideoChat from './Messages/VideoChat.js';
import VideoChatInit from './Messages/VideoChatInit.js';

const auth = new Auth();

// const handleAuthentication = (nextState, replace) => {
// 	console.log('arguments', arguments);
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
// 		auth.handleAuthentication()
// 		.then((res) => {
// 			console.log(res)
// 		})
//   }
// }

const App = () => {
	if(auth.isAuthenticated()) {
}

	return (

	<div>
		<BrowserRouter history={history}>
		<div>
		{auth.isAuthenticated() ? <NavBar auth={auth} /> : <LandingPage auth={auth}/> }
		<Switch>
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/upload' component={UploadPage}/>
      <Route exact path='/profile' component={ownProfile}/>
      {/* <Route exact path='/ownProfile' component={ownProfile}/> */}
      <Route exact path='/matches' component={Matches}/>
      <Route exact path='/messages' component={Messages}/>
      <Route exact path='/editProfile' component={editProfile}/>
			<Route exact path='/videoChat' component={VideoChat}/>
			<Route exact path='/videoChat/#init' component={VideoChatInit}/>
      <Route path='/:id' component={ProfilePage}/>
    </Switch>
		</div>
		</BrowserRouter>
	</div>
	)
}

export default App
