import React from 'react';
import ProfileHead from './ProfileHead';
import ProfilePhotos from './ProfilePhotos';
import axios from 'axios';
import NavBar from './NavBar';


export default class OwnProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.idTokenPayload, // will later dynamically know which user it is
      firstname: '',
      profilepic: '',
      images: [],
      bio: '',
      gender: '',
      age: 0,
      own: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.post(`/api/match/${this.state.id}`)
    .then(response => {
      this.setState({
        matched: true
      })
    })
    .catch(err => { if (err) {return console.error(err)} })
  }

  componentDidMount() {
    axios.get(`/api/profile/${this.state.id}`)
    .then(profile => {
      var images = this.state.images;
      profile.data.images.forEach(image => {
        images.push(image);
      })
      localStorage.setItem('firstname', profile.data.firstname)
      console.log('MOUNTTTINGGGGG')

      this.setState({
        firstname: profile.data.firstname,
        profilepic: profile.data.profilepic,
        images: images,
        bio: profile.data.bio,
        gender: profile.data.gender,
        age: profile.data.age,
      })
    })
    .catch(err => { return console.error(err) });
  }

  render() {
    return (
      <div className="intro-message">
        <NavBar />
        <ProfileHead data={this.state} handleSubmit={this.handleSubmit} />
        <div className="photosContainer">
          <ProfilePhotos images={this.state.images} />
        </div>
      </div>
    );
  }
}
