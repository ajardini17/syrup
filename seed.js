var db = require('./db/models/model.js');

db.User.sync({force: true})
  .then(() => {
    return db.User.bulkCreate([
      {id: '9',firstname: 'alice', email: 'asdf23@gmail.com', profilepic: 'https://images.pexels.com/photos/355018/pexels-photo-355018.jpeg?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 22, latitude: -117.9854168, longitude: 33.9445138},
      {id: '10',firstname: 'chanel', email: 'asd34f@gmail.com', profilepic: 'https://images.pexels.com/photos/40503/woman-snow-winter-portrait-40503.jpeg?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 23, latitude: -117.9354168, longitude: 33.9246179},
      {id: '11',firstname: 'karen', email: 'asd45f@gmail.com', profilepic: 'https://images.pexels.com/photos/47346/portrait-blond-blondie-brunette-47346.jpeg?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 24, latitude: -117.9754168, longitude: 33.9246179},
      {id: '12',firstname: 'jessica', email: 'as34df@gmail.com', profilepic: 'https://images.pexels.com/photos/220420/pexels-photo-220420.jpeg?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 25, latitude: -117.9843168, longitude: 33.9246179},
      {id: '13',firstname: 'michelle', email: 'as345df@gmail.com', profilepic: 'https://images.pexels.com/photos/415298/pexels-photo-415298.jpeg?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 26, longitude: 127.9243, latitude: 33.8704},
      {id: '14',firstname: 'tina', email: 'asd345f@gmail.com', profilepic: 'https://images.pexels.com/photos/60682/pexels-photo-60682.jpeg?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 27, longitude: 117.9244, latitude: 33.8703},
      {id: '15',firstname: 'melissa', email: 'aasasdfdf@gmail.com', profilepic: 'https://images.pexels.com/photos/413925/pexels-photo-413925.jpeg?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 28, longitude: 137.9241, latitude: 33.8705},
      {id: '16',firstname: 'jen', email: 'gasdasdffff@gmail.com', profilepic: 'https://images.pexels.com/photos/59552/pexels-photo-59552.png?h=350&auto=compress&cs=tinysrgb', images: [], bio: 'I am a big dummy user', gender: 'female', age: 21, longitude: 117.9247, latitude: 33.8703},
      
      {id: '17',firstname: 'elizabeth', email: 'basdf23@gmail.com', profilepic: 'http://www.latina.com/sites/default/files/Diane-Guerrero_6.jpg', images: [], bio: 'I am a big dummy user', gender: 'female', phone_number:'+5555555555', age: 22, longitude: 117.9244, latitude: 33.8703},
      {id: '18',firstname: 'nancy', email: 'ansd34f@gmail.com', profilepic: 'https://s-media-cache-ak0.pinimg.com/736x/39/c2/87/39c287a6f3699377db93c6fc4ca813c5--julia-kelly-fine-girls.jpg', images: ['http://www.hiphopdaily.com/thumb/tim.php?src=http%3A%2F%2Fwww.hiphopdaily.com%2Fwp-content%2Fuploads%2F2014%2F07%2F928011_609805529116787_2082406631_n.jpg&w=500&h=500&q=70','https://s-media-cache-ak0.pinimg.com/736x/66/38/46/663846782c64b0b50a7c9597a37b6e37--julia-kelly-dream-hair.jpg', 'http://www.marathi.tv/wp-content/uploads/2017/05/Julia-Kelly-photos.jpg', 'http://boomopolis.com/wp-content/uploads/2017/03/juliakelly3.png', 'https://i.ytimg.com/vi/vX5tf2ptVVs/hqdefault.jpg', 'http://boomopolis.com/wp-content/uploads/2017/03/juliakelly1.png'], bio: 'Student at Hack Reactor HRLA17', gender: 'female', phone_number:'+5555555555', age: 23, longitude: 117.9242, latitude: 33.8704},
      
      {id: '20',firstname: 'liz', email: 'tas34df@gmail.com', profilepic: 'https://lh4.googleusercontent.com/-bAuprXS-mNs/TXeEEvjmx5I/AAAAAAAAA0E/rSszayLgyII/s1600/Screen+shot+2011-03-08+at+6.14.39+AM.png', images: [], bio: 'I am a big dummy user', gender: 'female', age: 25, longitude:  40.9475771, latitude: -74.25908989999999},
      {id: '21',firstname: 'alex', email: 'aus345df@gmail.com', profilepic: 'http://clickzoom.net/uploads/reasons-every-man-should-date-a-latina-at-least-once-in-his-life-06.jpg', images: [], bio: 'I am a big dummy user', gender: 'female', age: 26, longitude:  40.8475771, latitude: -74.25908989999999},
      {id: '22',firstname: 'heather', email: 'qasd345f@gmail.com', profilepic: 'http://images.huffingtonpost.com/2014-08-05-TerreroNinared.jpg', images: [], bio: 'I am a big dummy user', gender: 'female', age: 27, longitude: 119.9242, latitude: 33.8704},
      {id: '23',firstname: 'cary', email: 'asaesdfdf@gmail.com', profilepic: 'http://images.totalbeauty.com/content/photos/01-intro-totalbeauty-logo-Latina-Acne.jpg', images: [], bio: 'I am a big dummy user', gender: 'female', age: 28, longitude: 119.9242, latitude: 33.8704},
      {id: '24',firstname: 'jennifer', email: 'apsdasdffff@gmail.com', profilepic: 'https://s-media-cache-ak0.pinimg.com/736x/f1/e0/f8/f1e0f89ea5d4275714a7af7c8f15c861--latina-girls-piano-bar.jpg', images: [], bio: 'I am a big dummy user', gender: 'female', age: 21, longitude: 117.9242, latitude: 33.8704}
])    
  })
  .catch(err => {
    console.log('error in bulk create, user', err);
  })
  .then(() => {
    console.log('user seed successful!');
    db.Match.sync()
  })
  .catch(err => {
    console.log('match seed unsuccessful');
  })
  .then(() => {
    console.log('message seed successful');
    db.Message.sync();
    process.exit();  
  })
  .catch(err => {
    console.log('message seed unsuccessful');
  })
  
  // db.Match.sync({force: true});
  // db.Message.sync({force: true});