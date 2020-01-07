import React from "react";
import { connect } from "dva";
import router from "umi/router";
import { Accordion, List, Button } from "antd-mobile";
import detailsCss from "../css/details.css";

function bookDetails(props) {
  const Item = List.Item;
  const { book, dispatch, id } = props;
  function getChapters() {
    dispatch({
      type: "book/loadChapter",
      payload: { id: id }
    });
  }
  function addBook() {
    if (!localStorage.getItem("books")) {
      localStorage.setItem(
        "books",
        JSON.stringify([
          book
        ])
      );
    } else {
      let arr = JSON.parse(localStorage.getItem("books")).filter(
        v => v._id != book._id
      );
      arr = [...arr, book];
      localStorage.setItem("books", JSON.stringify(arr));
    }
    router.push("/bookrack");
  }
  return (
    <div className={detailsCss.details}>
      <Button
        type="ghost"
        onClick={() => {
          router.push("/");
        }}
      >
        返回小说列表页
      </Button>
      <div className={detailsCss.top}>
        <img src={book.cover}></img>
        <ul className={detailsCss.list}>
          <li>{book.title}</li>
          <li>作者：{book.author}</li>
          <li>类型：{book.minorCate}</li>
          <li>人气：{book.latelyFollower}</li>
          <li>最新章节：{book.lastChapter}</li>
          {book.isSerial ? <li>已完结</li> : <li>未完结</li>}
          <li>
            <Button
              type="ghost"
              onClick={() => {
                addBook();
              }}
            >
              添加至书架
            </Button>
          </li>
        </ul>
      </div>
      <Accordion>
        <Accordion.Panel header="简介" className={detailsCss.panel}>
          {book.longIntro}
        </Accordion.Panel>
      </Accordion>
      <List
        className="my-list"
        onClick={() => {
          getChapters(id);
        }}
      >
        <Item arrow="horizontal" multipleLine>
          章节目录
        </Item>
      </List>
    </div>
  );
}

export default connect(state => state.book)(bookDetails);
