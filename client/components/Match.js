import React from 'react';
import axios from 'axios';
import history from '../history';
import { Redirect } from 'react-router-dom';
export default class Match extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: 0,
			firstname: '',
			age: 25,
			profilepic: '',
			own_id: localStorage.idTokenPayload,
			matched: false,
			currentMatch : {}
		}
		this.addMatch = this.addMatch.bind(this);
		this.isMatched = this.isMatched.bind(this);
		this.getDistance = this.getDistance.bind(this);
		// this.deg2rad = this.deg2rad.bind(this)
	}

	componentWillMount(){
		this.setState({
			id: this.props.match.id,
			firstname: this.props.match.firstname,
			age: this.props.match.age,
			profilepic: this.props.profilepic,
		})
		// ()=> {
		// 	if(this.props.latitude === 0 && this.props.longitude === 0){
		// 		axios.all([
    //   	axios.get(`api/matches/percent/${this.props.match.subject_id}`),
    //   	axios.get(`api/match/${this.state.id}/${this.state.own_id}`)
    // 	])
    // .then(axios.spread((res, match) => {
    //   this.setState({
		// 		id: res.data.id,
		// 		firstname: res.data.firstname,
		// 		age: res.data.age,
		// 		profilepic: res.data.profilepic,
		// 		matched: match.data
		// 	})
    // }))
    // .catch(err => { 
    //   return console.error(err) 
    // });
		// 	}
		// })
	}
	componentDidMount(){
		for(let i =0; i < this.props.allUsers.length; i++){
			if (this.props.allUsers[i].id === this.props.match.subject_id){
				//console.log('currentmatch', this.props.allUsers[i])
				this.setState({currentMatch: this.props.allUsers[i]}, ()=>{
				})
			}
		}
	  
	}

	isMatched() {
		if (this.state.matched) {
			return <button className="btn-primary">Connected!</button>
		} else {
			return <button className="btn-primary" onClick={this.addMatch}>Connect</button>
		}
	}



	getDistance(lat1,lon1,lat2,lon2){
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
			; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d.toFixed(2);
		function deg2rad(deg) {
  		return deg * (Math.PI/180)
		}
	}
		



	addMatch() {
		axios.post(`api/match/${this.state.id}/${this.state.own_id}`)
		.then(response => {
			console.log('Connection added');
			this.setState({
				matched: true
			})
		})
		.catch(err => console.error(err))
	}

	render(){
		console.log('hello this is matches', this.props, this.state.currentMatch.firstname)
		// console.log(this.state.currentMatch)
		if (this.props.match.profilepic === undefined){
			//console.log('hello')
			return (
			
			<div className="col-sm-4 text-center match" onClick={this.renderProfile}>
				<h2>{this.state.currentMatch.firstname}, {this.state.currentMatch.age}</h2>	
				<a href={`/${this.state.id}`}>{<img src={this.state.currentMatch.profilepic} className="match-pic"/>} </a>
				<h3>{Math.round(100 * this.props.confidence[this.props.iterator].confidence + 10)}% Match</h3>
				<h4>{this.getDistance(this.props.latitude, this.props.longitude, this.props.match.latitude, this.props.match.longitude)}</h4>
				{/* <button className="btn-primary">Connect</button> */}
				{this.isMatched()}
			</div>
		) 
		} else {
			return (
			
			<div className="col-sm-4 text-center match" onClick={this.renderProfile}>
				<h2>{this.state.firstname}, {this.state.age}</h2>	
				<a href={`/${this.state.id}`}>{<img src={this.props.match.profilepic} className="match-pic"/>} </a>
				<h3>{Math.round(100 * this.props.confidence[this.props.iterator].confidence + 10)}% Match</h3>
				<h4><span>~</span>{this.getDistance(this.props.latitude, this.props.longitude, this.props.match.latitude, this.props.match.longitude)} <span>Km away</span></h4>
				{/* <button className="btn-primary">Connect</button> */}
				{this.isMatched()}
			</div>
		)
		};
	}
}