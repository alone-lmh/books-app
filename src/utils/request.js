import Axios from "axios";

export function request(url,data) {
  if(data){
    return Axios.post(url,data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  }else{
    return Axios.get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  }
}
/* export function request(url) {
  return Axios.post("http://121.41.30.226:3005/api/proxy", {
    url:url
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
} */
