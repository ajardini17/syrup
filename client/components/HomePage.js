import React from 'react';
import axios from 'axios';

export default class HomePage extends React.Component {
	constructor(){
		super();
	}

	componentDidMount() {
    axios.get(`/api/profile/${localStorage.idTokenPayload}`)
    .then(profile => {
      localStorage.setItem('firstname', profile.data.firstname)
    })
    .catch(err => { return console.error(err) });
  }

	render(){
		return(
			<div className="intro-header">
        		<div className="container">

            		<div className="row">
                		<div className="col-lg-12">
                    		<div className="intro-message">
                        		<br />
                        		<br />
														<br />
                        		<br />
														<br />
                        		<br />
														<br />
                        		<br />
														<br />
                        		<br />
														<br />
                        		<br />
                    		</div>
                		</div>
            		</div>
        		</div>
    		</div>
		);
	}
}
