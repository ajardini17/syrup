import React from 'react';
import NavBar from './NavBar';
import UploadSection from './UploadSection';
import Footer from './Footer';
import MatchesUploadSection from './MatchesUploadSection';

export default class UploadPage extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<NavBar/>
				<UploadSection history={this.props.history}/>

				<Footer/>
			</div>
		)
	}
}
