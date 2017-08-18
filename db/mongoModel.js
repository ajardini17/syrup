const mongoose = require('mongoose');
mongoose.connect('mongodb://zander:trashmon@ds149353.mlab.com:49353/syrup')
const conn = mongoose.connection;

conn.once('open', () => console.log('connected to mlabs'));

const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    name: String,
    image: String


});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

var madonna = new Celebrity({name: 'Madonna', image: 'wubwubwub'});
madonna.save(err => {
    if(err){
        console.log('error');
    } else {
        console.log('added');
    }
})




// const User = db.define('user', {
//     id: {
//       type: Sequelize.STRING,
//       primaryKey: true,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     firstname: {
//       type: Sequelize.STRING,
//       allowNull: true
//     },
//     profilepic: {
//       type: Sequelize.TEXT,
//       allowNull: true
//     },
//     images: {
//       type: Sequelize.ARRAY(Sequelize.TEXT),
//       allowNull: true
//     },
//     bio: {
//       type: Sequelize.STRING,
//       allowNull: true
//     },
//     gender: {
//       type: Sequelize.STRING,
//       allowNull: true
//     },
//     age: {
//       type: Sequelize.INTEGER,
//       allowNull: true
//     }
//   }, {
//     timestamps: false
//   })
  
//   const Match = db.define('match', {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//   }, {
//     timestamps: false
//   });
  
//   const Message = db.define('message', {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     text: {
//       type: Sequelize.STRING
//     }
//   }, {
//     timestamps: false
//   })

