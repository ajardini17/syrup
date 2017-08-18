const db = require('./index.js');
const model = require('./models/model.js');
const axios = require('axios');
const apiInfo = require('../apiKey.js');
const redis = require('./redis.js');

const api = {
    "app_key": apiInfo.apiKey,
    "app_id": apiInfo.appId
};


const kairosRequest = (user) => {
    let body = {
        "image": user.profilepic,
        "gallery_name": "SyrupPractice",
        "threshold": .30,
        "max_num_results": 100
    };
    return axios.post('https://api.kairos.com/recognize', body, {headers: api}); 
}

const kairosUserProfile = (user) => {
    let body = {
        "gallery_name": "SyrupPractice",
        "subject_id": user
    }
    return axios.post('https://api.kairos.com/gallery/view_subject', body, {headers: api});
}

const fullKairos = () => {
    let body = {
        "gallery_name": "SyrupPractice"
    };
    return axios.post('https://api.kairos.com/gallery/view', body, {headers: api}); 
}

// fullKairos()
// .then(resp => {
//     console.log(resp.data.subject_ids);
//     axios.all(resp.data.subject_ids.map(x => kairosUserProfile(x)))
//     .then(axios.spread((...userData) => {
//         let results = userData.map(x => x.data);
//         console.log(results);
//         console.log(results[0].face_ids);
//     }))
// });

const averageRank = (data, container) => {
    let rank = {};
    data.forEach(person => rank[person.transaction.subject_id] = 1);

    let obj = startState(rank, container, 1, data.length);
    // console.log(obj);
    console.log(rank);
    console.log('tada')
     
};

const startState = (rank, container, iteration, length) => {
    if(iteration === length) {
        return rank;
    } else {
        for(let key in rank) {
            let userMatches = container[key];
            let Occurence = 0;
            
            for(let i = 0; i < userMatches.candidates.length; i++) {
                //console.log(userMatches.candidates[i].confidence * 100, rank[userMatches.candidates[i].subject_id]);
                if(rank.hasOwnProperty(userMatches.candidates[i].subject_id)){

                    Occurence += ((userMatches.candidates[i].confidence) * rank[userMatches.candidates[i].subject_id]);
                }
            }
            rank[key] = Occurence === 0 ? rank[key] : Occurence;
        }
        return startState(rank, container, iteration + 1, length);
    }
};



model.User.findAll({where: {
    profilepic: {
      $ne: null,
      $ne: ''
    }
  }}).then(resp => {
      let containerObj = {};
      axios.all(resp.map(user => kairosRequest(user)))
      .then(axios.spread((...usersData) => {
        var kairosResponse = usersData.map(res => res.data.images[0]);
        for(let i = 0; i < kairosResponse.length; i++) {
  
            kairosResponse[i].candidates.shift();
            containerObj[kairosResponse[i].transaction.subject_id] = kairosResponse[i];
        }
        
        averageRank(kairosResponse, containerObj);
      }))
      

})

