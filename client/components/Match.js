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
				this.setState({currentMatch: this.props.allUsers[i]})
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
		console.log('hello this is matches', this.props)
		// console.log(this.state.currentMatch)
		if (this.props.match.profilepic === undefined){
			console.log('hello')
			return (
			
			<div className="col-sm-4 text-center match" onClick={this.renderProfile}>
				<h2>{this.state.currentMatch.firstname}, {this.state.currentMatch.age}</h2>	
				<a href={`/${this.state.id}`}>{<img src={this.state.currentMatch.profilepic} className="match-pic"/>} </a>
				<h3>{Math.round(100 * this.props.confidence[this.props.iterator].confidence + 10)}% Match</h3>
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
				{/* <button className="btn-primary">Connect</button> */}
				{this.isMatched()}
			</div>
		)
		};
	}
}