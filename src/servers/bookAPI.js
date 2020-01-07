import { request } from "../utils/request";

//获取小说列表
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

//获取书本章节列表
export function bookDetails(id) {
  return request("http://lunbo.wgfgr.cn/toc/mix?bookId=" + id);
}

//获取小说章节详情
export function readBook(url) {
  return request("http://chapter.xmxingheju.com/chapter/" + url);
}

//获取热门小说标题
export function getHotWord() {
  return request("http://lunbo.wgfgr.cn/node/info?nodeAlias=hot-word");
}

//获取搜索结果
export function search(word, page,limit) {
  return request(
    "http://lunbo.wgfgr.cn/book/search?key=" +
      word +
      "&start=" +
      page * limit +
      "&limit="+limit
  );
}
