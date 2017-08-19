import React from 'react';
import axios from 'axios';
import history from '../history';
import { Redirect } from 'react-router-dom';
import MapContainer from './MapContainer.jsx';



export default class MyMatch extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: this.props.match.matcheeId,
			firstname: '',
			age: 25,
			profilepic: '',
			own_id: localStorage.idTokenPayload,
			matched: false
		}
	}

	componentDidMount(){
		//console.log('RENDERED', this.state.id);
		axios.get(`/api/profile/${this.state.id}`)
			.then(data => {
				//console.log('PROFILE INFO: ', data.data);
				this.setState({
					firstname: data.data.firstname,
					age: data.data.age,
					profilepic: data.data.profilepic
				})
			})

			//GET LOCATION 
	}
	

	render(){

		console.log('This is the props in MyMatch: ', this.props);
		return (

			<div className="col-sm-4 text-center match" onClick={this.renderProfile}>
				<h2>{this.state.firstname}, {this.state.age}</h2>
				<a href={`/${this.state.id}`}><img src={this.state.profilepic} className="match-pic"/></a>
			</div>
		);
		country.addEventListener('change', () => {
    location.updateCountry(country.value);
  });
	}
}
