import React, { useEffect } from "react";
//引入pc版antd样式
import { Button, Icon } from "antd";
import router from "umi/router";
//引入手机版的antd样式
// import { Button,Icon } from "antd-mobile";
//如果需要使用redux中的数据的话，我们就需要使用connect
import { connect } from "dva";
import "../utils/back";
import emptyImg from "../img/empty.jpg";
import indexCss from "../css/index.css";

export default connect(state => state.book)(function index(props) {
  const {
    dispatch,
    page,
    pages,
    list,
    gender,
    type,
    major,
    flag,
    limit
  } = props;
  useEffect(() => {
    document.getElementById("root").style.height = 100 + "%";
    if (list.length == 0) {
      dispatch({
        type: "book/loadData",
        payload: { page, gender, type, major, limit }
      });
    }
  }, []);
  return (
    <div className={indexCss.box}>
      <h2 className={indexCss.title}>
        <Icon
          type="search"
          className={indexCss.search}
          onClick={() => {
            dispatch({ type: "book/add", payload: { flag: true } });
            router.push("/search");
          }}
        ></Icon>
        {major}
        <Icon
          type="appstore"
          className={indexCss.classify}
          onClick={() => {
            dispatch({ type: "book/add", payload: { flag: false } });
            router.push("/classify");
          }}
        ></Icon>
      </h2>
      {list.length ? (
        <ul className={indexCss.list} id="books">
          {list.map(v => {
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
                <p>{v.title}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <img src={emptyImg} style={{ flex: 1 }} />
      )}
      <div className={indexCss.bottom}>
        <Button
          type="primary"
          onClick={() => {
            if (page > 0) {
              if (!flag) {
                dispatch({
                  type: "book/loadData",
                  payload: {
                    page: page - 1,
                    gender,
                    type,
                    major,
                    limit,
                    flag: false
                  }
                });
              } else {
                dispatch({
                  type: "book/search",
                  payload: {
                    page: page - 1,
                    word: major,
                    flag: true,
                    major,
                    limit
                  }
                });
              }
            }
          }}
        >
          上一页
        </Button>
        <p className={indexCss.pageNum}>第{page + 1}页</p>
        <Button
          type="primary"
          onClick={() => {
            /*当点击按钮的时候通过dispatch派发一个action，这个action的参数名字是"book/save":book表示命名空间，save表示我们reducers中写好的方法*/
            if (pages > page + 1) {
              if (!flag) {
                dispatch({
                  type: "book/loadData",
                  payload: {
                    page: page + 1,
                    gender,
                    type,
                    major,
                    limit,
                    flag: false
                  }
                });
              } else {
                dispatch({
                  type: "book/search",
                  payload: {
                    page: page + 1,
                    word: major,
                    flag: true,
                    major,
                    limit
                  }
                });
              }
            }
          }}
        >
          下一页
        </Button>
      </div>
    </div>
  );
});
