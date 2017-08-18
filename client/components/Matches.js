import React from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import MatchesResults from './MatchesResults'
import MapContainer from './MapContainer.jsx'

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.idTokenPayload,
      matches: [],
      matchesTabe: ''
    }
  }

  componentDidMount(){
    //console.log('THIS IS A userID in Matches: ', this.state.userId);
    axios.get(`/api/matches/${this.state.userId}`)
      .then(data => {
        this.setState({matches: data.data});
        console.log('MATCHES', this.state.matches);
      })
      .catch(err => {
        console.log(err);
      })
    //console.log('These are the props in matches: ', this.props);
  }

  render() {
    console.log('this is the props in matches:', this.props)
    return (
      <div className="intro-message">
        <NavBar />
        <MatchesResults matches={this.state.matches} history={this.props.history} />
      </div>
    );
  }
}