import React, { Component } from 'react';

class CelebrityListItem extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        const celebrity = this.props.Person;
        const matches = celebrity.matches;

        return (
            <div>
                {matches.map(person => <li> {matches.name}</li>)}
            </div>
        );
    }
}

export default CelebrityListItem;