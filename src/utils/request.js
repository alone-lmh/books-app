import Axios from "axios";

/* 使用fetch请求
export function request(url, data, method = "get") {
  //默认发起一个get请求
  return fetch("http://121.41.30.226:3005/api/proxy"+url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
  //然后将获取到的数据格式化，返回一个json格式的数据
} */
export function request(url) {
  return Axios.post("http://121.41.30.226:3005/api/proxy", {
    url:url
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}
