import React from 'react';
import NavBar from './NavBar';
import UploadSection from './UploadSection';
import Footer from './Footer';
import MatchesUploadSection from './MatchesUploadSection';
import MapContainer from './MapContainer.jsx'

export default class UploadPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			input: ''
		}
	this.handleChange = this.handleChange.bind(this)	
	}
	handleChange(e){
		//console.log(e.target.value)
	}

	render() {
		console.log('this is the props in UploadPage', this.props);
		return (
			<div>
				<NavBar/>
				<UploadSection history={this.props.history}/>

				<Footer/>
			</div>
		)
	}
}
