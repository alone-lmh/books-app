import React, { useEffect } from "react";
import { connect } from "dva";
import { Toast, Button } from "antd-mobile";
import router from "umi/router";
import indexCss from "../css/index.css";
function chapters(props) {
  const { chapter, dispatch } = props;
  useEffect(()=>{Toast.hide();},[]);
  return (
    <div className={indexCss.box}>
      <div className={indexCss.top}>
        <Button
          type="ghost"
          onClick={() => {
            router.push("/bookDetails");
          }}
        >
          返回小说详情页
        </Button>
      </div>
      <ul className={indexCss.chaList}>
        {chapter.map((v, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                if (v.link) {
                  Toast.loading("Loading...",15);
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
