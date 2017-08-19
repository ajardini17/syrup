import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import CelebrityListItem from './CelebrityListItem.js';

class Top extends Component {
    constructor(props){
        super(props);
        this.state = {
            celebrities: '',
            average: '',
            mostMatched: '',
            closestPair: []
        };
        // this.topCelebrities = this.topCelebrities.bind(this);
    }
    componentWillMount() {
        axios.get('/api/mostAverage').then(resp => this.setState({average: resp.data}));
        axios.get('/api/mostMatches').then(resp => this.setState({mostMatched: resp.data}));
        axios.get('/api/closestPair').then(resp => this.setState({closestPair: resp.data}));
        // this.topCelebrities()
        // .then(results => {
        //     this.setState({celebrities: results.data});
        // })
    }
    // topCelebrities(){
    //     return axios.get('/topSearches');
    // }

    render() {
        // const listItems = celebrities.map((person) => <CelebrityListItem Person = {person}/>)
        
        return (
            <div>
               
                
                
            
            </div>
        );
    }
}

export default Top;