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
        axios.get('/api/mostMatches').then(resp => this.setState({mostMatched: JSON.parse(resp.data)}));
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

        let average = null;
        let mostMatched = null;
        let closestPair = null;
        if(this.state.average !== '') {
            average = <div>
                <h3 style={{textAlign: 'center'}}> Most Similar </h3>
            <div className="statsCard" >
              <img src={this.state.average.profilepic} width="300" height="200"/>
              <div className="profileContainer">
                <h2>{this.state.average.firstname}, {this.state.average.age}</h2>
                <p>{this.state.average.bio}</p>
          
                {/* {this.isMatched()} */}
              </div>
            </div>
          </div>
        }
        if(this.state.mostMatched !== '') {
            mostMatched = <div>
                <h3 style = {{textAlign: 'center'}}> Most Matches: {this.state.mostMatched[1]} </h3>
            <div className="statsCard" >
              <img src={this.state.mostMatched[0].profilepic} width="300" height="200"/>
              <div className="profileContainer">
                <h2>{this.state.mostMatched[0].firstname}, {this.state.mostMatched[0].age}</h2>
                <p>{this.state.mostMatched[0].bio}</p>
                {/* {this.isMatched()} */}
              </div>
            </div>
          </div>
        }
        if(this.state.closestPair.length > 0) {
            closestPair = <div>
                <h3 style = {{textAlign: 'center'}}>closest Pairs: {this.state.closestPair[1]} % </h3> 
                <div>
            <div className="statsCard" >
              <img src={this.state.closestPair.profilepic} width="300" height="200"/>
              <div className="profileContainer">
                <h2>{this.state.closestPair[0][0].firstname}, {this.state.closestPair[0][0].age}</h2>
                <p>{this.state.closestPair[0][0].bio}</p>

                {/* {this.isMatched()} */}
              </div>
            </div>
            <div className="statsCard" >
              <img src={this.state.closestPair[0][1].profilepic} width="300" height="200"/>
              <div className="profileContainer">
                <h2>{this.state.closestPair[0][1].firstname}, {this.state.closestPair[0][1].age}</h2>
                <p>{this.state.closestPair[0][1].bio}</p>

                {/* {this.isMatched()} */}
              </div>
            </div>
            </div>
          </div>
        }
        console.log(this.state.average, 'average');
        console.log(this.state.mostMatched, 'most matched');
        console.log(typeof this.state.mostMatched);
        console.log(this.state.closestPair, 'closestPair');
        return (
            <div>
               <div className="intro-message">
                <NavBar />
                <div>
                {average}
                </div>
                <div>
                {mostMatched}
                </div>
                <div>
                {closestPair}
                </div>
     
      </div>

                
            
            </div>
        );
    }
}

export default Top;