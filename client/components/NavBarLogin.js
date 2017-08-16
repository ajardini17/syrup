import React from 'react';
import { Link } from 'react-router-dom'


export default class NavBarLogin extends React.Component {
	constructor(props){
		super(props);

		this.props.auth.handleAuthentication();
		
		
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login(){
		this.props.auth.login()
	}

	logout() {
		this.props.auth.logout();
	}

	render(){
		// const { isAuthenticated } = this.props.auth;

		return(
			<nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        		<div className="container topnav">
            		<div className="navbar-header">
                		<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
                		</button>
					
                		<a className="navbar-brand topnav" href="#"><img id="brand-image" src="https://files.slack.com/files-pri/T2SV1LBC6-F6PA047N2/syrup_logo.png"/></a>
				
            		</div>
            		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                		<ul className="nav navbar-nav navbar-right">
                    		<li>
                        		<a onClick={this.login} style={{cursor:'pointer'}}>Log In</a>
														{console.log('this is the props', this.props.auth)}
                    		</li>
                    		<li>
                        		<a onClick={this.login} style={{cursor:'pointer'}}>Sign Up</a>
                    		</li>
                		</ul>
            		</div>
        		</div>
    		</nav>
		);
	}
}
