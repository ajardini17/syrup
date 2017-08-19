import React from 'react';
import Match from './Match';
import MyMatch from './MyMatch';




export default class MatchesResults extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		//console.log('These are props.matches in MUS: ', this.props.matches);
		return(
			<div className="content-section-a">
		        <div className="container">
		            <div className="row">
		                <div className="col-lg-5 col-sm-6">
							<h2 id="matches-title">Matches</h2>
		                    <hr className="section-heading-spacer"/>
		                    <div className="clearfix"></div>
		                </div>
		            </div>
		            	<div className="row">
		            		{this.props.matches.map((match, i) => 
		            			(<MyMatch match={match} history={this.props.history} key={i}/>)
		            		)}
		            	</div>
		        </div>
		    </div>
		);
	}
}