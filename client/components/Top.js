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
               <div className="intro-message">
                <NavBar />
                <div>
                    <div>
                        Most Average
                        </div>
            <div className="profileCard">
                <img src={this.state.average.profilepic} width="300" height="200"/>
                <div className="profileContainer">
                    <h2>{this.state.average.firstname}, {this.state.average.age}</h2>
                    <p>{this.average.data.bio}</p>
                    {/* {this.isMatched()} */}
                </div>

                
            </div>
            </div>
            
            <div>
            <div className="profileCard">
                <img src={this.props.data.profilepic} width="300" height="200"/>
                <div className="profileContainer">
                    <h2>{this.props.data.firstname}, {this.props.data.age}</h2>
                    <p>{this.props.data.bio}</p>
                    {this.isOwnProfile()}
                    {/* {this.isMatched()} */}
                </div>

                
            </div>
            </div>
       
            <div>
            <div className="profileCard">
                <img src={this.props.data.profilepic} width="300" height="200"/>
                <div className="profileContainer">
                    <h2>{this.props.data.firstname}, {this.props.data.age}</h2>
                    <p>{this.props.data.bio}</p>
                    {/* {this.isMatched()} */}
                </div>

                
            </div>
            </div>
            <div className="photosContainer">
            <div className="row">
        
             </div> 
                </div>
                </div>
                
                
            
            </div>
        );
    }
}

export default Top;