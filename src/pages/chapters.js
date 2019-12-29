import React from "react";
import { connect } from "dva";
import { Button } from "antd-mobile";
import router from "umi/router";
import indexCss from "../css/index.css";
function chapters(props) {
  const { chapter, dispatch, book } = props;
  function addBook() {
    if (!localStorage.getItem("books")) {
      localStorage.setItem(
        "books",
        JSON.stringify([
          { _id: book._id, title: book.title, cover: book.cover }
        ])
      );
    } else {
      let arr = JSON.parse(localStorage.getItem("books")).filter(
        v => v._id != book._id
      );
      arr = [...arr, { _id: book._id, title: book.title, cover: book.cover }];
      localStorage.setItem("books", JSON.stringify(arr));
    }
    router.push("/bookrack");
  }
  return (
    <div className={indexCss.box}>
      <div className={indexCss.top}>
        <Button
          type="ghost"
          onClick={() => {
            router.push("/");
          }}
        >
          返回小说列表页
        </Button>
        <Button
          type="ghost"
          onClick={() => {
            addBook();
          }}
        >
          添加至书架
        </Button>
      </div>
      <ul className={indexCss.chaList}>
        {chapter.map((v, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                if (v.link) {
                  dispatch({
                    type: "book/read",
                    payload: { url: v.link, num: i }
                  });
                }
              }}
            >
              {v.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default connect(state => state.book)(chapters);
