import axios from "axios";

const apiKey = "AIzaSyClfz_9KAgoyC0Fv22u_scyUYr5ctjeVJg";

function buildUrl(x, y, radius, text) {
  let query = encodeURI(text);
  return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${x}%2C${y}&radius=${radius}&key=${apiKey}`;
}

function searchLocationByText(text) {
  let config = {
    method: "get",
    url: buildUrl("36.3721426", "127.3603901", 3500, text),
    headers: {},
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getPlaceDetail(placeId) {
  let config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`,
    headers: {},
  };

  let res = await axios(config);
  return res.data;
}

/**
 * Async function, take a text as input, return an array of place suggestions for the input.
 * Each element in the array is a object with four fields: {name, placeId, x, y}.
 * @param {String} text the text string that you want to get the suggestion
 * @returns {Array({name, placeId, x, y})}
 */
export async function getAutoComplete(text) {
  const x = "36.3721426";
  const y = "127.3603901";
  const radius = 1000;
  let config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&strictbounds=true&location=${x}%2C${y}&radius=${radius}&key=${apiKey}`,
    headers: {},
  };

  let response = await axios(config);
  let res = [];
  let predList = response.data.predictions;
  for (let place of predList) {
    let detail = await getPlaceDetail(place.place_id);
    res.push({
      name: place.description,
      placeId: place.place_id,
      x: detail.result.geometry.location.lng,
      y: detail.result.geometry.location.lat,
    });
  }
  return res;
}

/**
 * Async function take an array of origins and a destionation coordinate x, y.
 * Return an array of distance and duration to travel from origins to destination.
 * @param {Array} origins Array of {x, y, key}
 * @param {String} destX x-coordinate
 * @param {String} destY y-coordinate
 * @returns {Array({result_code, result_msg, key, summary})}
 */
export async function kakaoGetTraveltime(origins, destX, destY) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "KakaoAK c7e82476abb126410d50718213c6bcd5",
  };

  const data = {
    origins: origins,
    destination: {
      x: destX,
      y: destY,
    },
    radius: 1500,
  };
  console.log(origins, destX, destY);

  const url = "https://apis-navi.kakaomobility.com/v1/origins/directions";

  let response = await axios.post(url, data, { headers: headers });
  console.log(response);
  return response.data.routes;
}
