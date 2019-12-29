import { request } from "../utils/request";

export function list(page = 0, gender, type, major,limit) {
  return request(
    "http://lunbo.wgfgr.cn/book/list?gender=" +
      gender +
      "&type=" +
      type +
      "&major=" +
      major +
      "&limit="+limit+"&start=" +
      page * limit
  );
}

export function bookDetails(id) {
  return request("http://lunbo.wgfgr.cn/toc/mix?bookId=" + id);
}

export function readBook(url) {
  return request("http://chapter.xmxingheju.com/chapter/" + url);
}

export function getHotWord() {
  return request("http://lunbo.wgfgr.cn/node/info?nodeAlias=hot-word");
}

export function search(word, page,limit) {
  return request(
    "http://lunbo.wgfgr.cn/book/search?key=" +
      word +
      "&start=" +
      page * limit +
      "&limit="+limit
  );
}
