import React from 'react';
import ProfileHead from './ProfileHead';
import ProfilePhotos from './ProfilePhotos';
import NavBar from './NavBar';
import axios from 'axios';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      subject_id: localStorage.idTokenPayload,
      firstname: '',
      profilepic: '',
      images: [],
      bio: '',
      gender: '',
      age: 0,
      matched: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.post(`/api/match/${this.state.id}/${this.state.subject_id}`)
    .then(response => {
      this.setState({
        matched: true
      })
    })
    .catch(err => { if (err) {return console.error(err)} })
  }

  componentDidMount() {
    axios.all([
      axios.get(`/api/profile/${this.state.id}`),
      axios.get(`/api/match/${this.state.id}/${this.state.subject_id}`)
    ])
    .then(axios.spread((profile, match) => {
      var images = this.state.images;
      profile.data.images.forEach(image => {
        images.push(image);
      })

      this.setState({
        firstname: profile.data.firstname,
        profilepic: profile.data.profilepic,
        images: images,
        bio: profile.data.bio,
        gender: profile.data.gender,
        age: profile.data.age,
        matched: match.data
      })
    }))
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
