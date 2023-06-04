import axios from "axios"
// var axios = require('axios');

const headers = {
    "Content-Type": "application/json",
    "Authorization": "KakaoAK 445ab13d28d7da0514ff0bfbeb8bef9b"
};

const data = {
    "origins": [
        {
            "x": "127.3628",
            "y": "36.3693",
            "key": 0
        }
    ],
    "destination": {
        "x": "127.3604",
        "y": "36.3742"
    },
    "radius": 5000
};

const url = 'https://apis-navi.kakaomobility.com/v1/origins/directions';

axios.post(url, data, {headers: headers})
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});