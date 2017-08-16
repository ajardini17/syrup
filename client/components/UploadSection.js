import React from 'react';
import axios from 'axios';
import appId from '../../apiKey';
import apiKey from '../../apiKey';
import MatchesUploadSection from './MatchesUploadSection';

export default class UploadSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            isMatching: false,
            matches: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        event.preventDefault();
        this.setState({input: event.target.value}, () => {
            console.log('This is the state of input: ', this.state.input);
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({input: this.state.input});
        const imageUrl = this.state.input;
        const api = {
            "app_key": apiKey.apiKey,
            "app_id": appId.appId
        };
        const body = {
            "image": imageUrl,
            "gallery_name": "SyrupPractice",
            "threshold": .30,
            "max_num_results": 100
        };
        if (this.state.isMatching === false){
            this.setState({isMatching: true});
        }
        axios.post('https://api.kairos.com/recognize', body, {headers: api})
            .then(response => {
                console.log('There are ', response.data.images[0].candidates.length, ' matches');
                this.setState({matches: response.data.images[0].candidates});
                //console.log('This is the state of matches: ', this.state.matches);
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderUploadPic(){
        if(this.state.isMatching){
            return (
                <div>
                
                        <img src={this.state.input} id="uploaded-pic"/>

                </div>    
            );
        }
    }

    renderMatchesUploadSection(){
        if(this.state.isMatching){
            return (
                <div>
                    <MatchesUploadSection matches={this.state.matches} history={this.props.history}/>
                </div>        
            );
        }
    }

    render(){
        //console.log('props in US', this.props);
        return(
            <div>
                <div className="intro-header-upload">
                    <div className="container">

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="intro-message">
                                    <h1>Syrup</h1>
                                    <h3>A New Way to Date Online</h3>
                                    <hr className="intro-divider"/>
                                </div>
                            </div>
                            <div>
                        
                            </div>
                            <form className="upload-form">
                                <input onChange={this.handleInputChange} type="text" className="input-lg" placeholder="Enter image url..." />
                                <input onClick={this.handleSubmit} className="button" id="upload-button" type="submit" value="Upload" />
                            </form>
                            {this.renderUploadPic()}
                        </div>
                    </div>
                </div>
                {this.renderMatchesUploadSection()}
            </div>

        );
    }
}