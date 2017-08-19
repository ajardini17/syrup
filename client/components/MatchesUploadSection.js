import React from 'react';
import Match from './Match';
import axios from 'axios';

export default class MatchesUploadSection extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		geoMatches : [],
		matches: [],
		allUsers: []
	}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			matches: nextProps.matches
		})
	}
	componentDidMount(){
		// console.log('fukkkkkk')
		// this.setState({
		// 	matches: this.props.matches
		// })
		axios.get('api/users')
		.then(result => {
			console.log(result, 'thisis theresult')
			var newMatches = [];
			///console.log(result.data, 'this is the result in matchesuploadsection')
			for(let i = 0; i < result.data.length; i++){
				let latDifference = 0;
				let longDifference = 0;
				
				latDifference = this.props.latitude - result.data[i].latitude;
				longDifference = this.props.longitude - result.data[i].longitude;
					console.log(latDifference, longDifference)
			    if (Math.abs(latDifference) < .3 && Math.abs(longDifference) < .3){
					console.log(latDifference)
					newMatches.push(result.data[i])
					// console.log(latDifference, longDifference)
					// console.log(result.data[i])
				}
			}
			this.setState({
				geoMatches : newMatches,
				allUsers: result.data
			}, () =>{
			})
		})
		.catch(err => {
			console.log(err)
		})
	}
		

	render(){
		console.log('this is the props.matcbes', this.props)
		console.log('this is geoMatches', this.state.geoMatches)
		// console.log('this is the props in matchesuploadsection', this.props.matches)
		// console.log('this is the state in matchesuploadsectionfdsafffa', this.state.matches)
		//console.log('These are props.matches in MUS: ', this.props.matches);
		return(
			<div className="content-section-a">
		        <div className="container">
		            <div className="row">
		                <div className="col-lg-5 col-sm-6">
		                    <hr className="section-heading-spacer"/>
		                    <div className="clearfix"></div>
		                </div>
		            </div>
		            	<div className="row">
							
							{this.state.geoMatches.map((match, i) => 
		            			<Match match={match} history={this.props.history} iterator={i} longitude = {this.props.longitude} latitude = {this.props.latitude} confidence={this.props.matches} allUsers={this.state.allUsers}/>
							)}
							{/* {this.state.geoMatches.length > 0 ? this.state.geoMatches.map((match, i) => 
		            			(<Match match={match} history={this.props.history} iterator={i} longitude = {this.props.longitude} latitude = {this.props.latitude} confidence={this.props.matches} allUsers={this.state.allUsers}/>)
		            		): this.props.matches.map((match, i) => 
		            			(<Match match={match} history={this.props.history} iterator={i} longitude = {this.props.longitude} latitude = {this.props.latitude} confidence={this.props.matches} allUsers={this.state.allUsers}/>)
		            		)} */}
		            		
		            	</div>
		        </div>
		    </div>
		);
	}
}