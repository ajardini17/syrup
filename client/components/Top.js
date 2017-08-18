import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import CelebrityListItem from './CelebrityListItem.js';

class Top extends Component {
    constructor(props){
        super(props);
        this.state({
            celebrities: ''
        });
        // this.topCelebrities = this.topCelebrities.bind(this);
    }
    componentWillMount() {
        axios.get('/api/mostAverage').then(resp => console.log('response gotten'));
        // this.topCelebrities()
        // .then(results => {
        //     this.setState({celebrities: results.data});
        // })
    }
    // topCelebrities(){
    //     return axios.get('/topSearches');
    // }

    render() {
    
        const celebrities = this.state.celebrities
        const listItems = celebrities.map((person) => <CelebrityListItem Person = {person}/>)
        return (
            <div>
               <div className="intro-message">
                <NavBar />
                    {listItems}
                </div>
                
            
            </div>
        );
    }
}

export default Top;