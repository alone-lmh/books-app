import React, { useEffect } from "react";
import { connect } from "dva";
import router from "umi/router";
import indexCss from "../css/index.css";
import delImg from "../img/del.jpg"
import { Button, Icon, Modal } from "antd-mobile";

function bookrack(props) {
  const { dispatch } = props;
  const alert = Modal.alert;
  const books = JSON.parse(localStorage.getItem("books"));
  useEffect(() => {
    document.getElementById("root").style.height = "100%";
  }, []);
  function showAlert(id) {
    var tag = event.target.parentNode;
    console.log(tag);
    alert("删除", "确定从书架中移除此书???", [
      { text: "取消" },
      {
        text: "确定",
        onPress: () => {
          tag.remove();
          let arr = books.filter(v => {
            return v._id != id;
          });
          localStorage.setItem("books", JSON.stringify(arr));
        }
      }
    ]);
  }
  return (
    <div className={indexCss.bookrack}>
      <Button style={{color:"#fff"}}
        type="primary"
        onClick={() => {
          router.push("/");
        }}
      >
        返回首页
      </Button>
      <ul>
        {books.map(v => {
          return (
            <li key={v._id}>
              <img
                src={v.cover}
                onClick={() => {
                  dispatch({
                    type: "book/loadChapter",
                    payload: { id: v._id, book: v }
                  });
                }}
              />
              <img className={indexCss.del} src={delImg} onClick={() => {
                  showAlert(v._id);
                }}/>
              <p>{v.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default connect(state => state.book)(bookrack);
