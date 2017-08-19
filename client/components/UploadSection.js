import React from 'react';
import axios from 'axios';
import appId from '../../apiKey';
import apiKey from '../../apiKey';
import MatchesUploadSection from './MatchesUploadSection';
import MapContainer from './MapContainer.jsx'

export default class UploadSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            isMatching: false,
            matches: [],
            matchArray: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){

    }
    handleInputChange(event){
        event.preventDefault();
        this.setState({input: event.target.value}, () => {
            //onsole.log('This is the state of input: ', this.state.input);
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
       // console.log(imageUrl)
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
                console.log('hello', body, {headers:api})
                console.log(error);
            })
    }

    renderUploadPic(){
        if(this.state.isMatching){
            return (
                <div>
                    <h3 id="uploading-message">Finding your matches...</h3>
                    <div className="crop">
                        <img src={this.state.input} id="uploaded-pic"/>
                    </div>    
                </div>    
            );
        }
    }

    renderMatchesUploadSection(){
        if(this.state.isMatching){
            return (
                <div>
                    <MatchesUploadSection matches={this.state.matches} history={this.props.history} latitude={this.props.latitude} longitude={this.props.longitude}/>
                </div>        
            );
        }
    }

    render(){
        console.log(this.props, 'hello this is the props in UploadSection: ')
        //console.log('state in uploadselection', this.state.matches);
        return(
            <div>
                <div className="map1">
                </div>
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
                <div className="row">
                    <div className="col-sm-12">
                    </div>
                </div>
                {this.renderMatchesUploadSection()}
                {/* <MapContainer /> */}
            </div>
            

        );
    }
}