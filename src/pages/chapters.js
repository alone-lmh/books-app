import React from "react";
import { connect } from "dva";
import { Button } from "antd-mobile";
import router from "umi/router";
import indexCss from "../css/index.css";
function chapters(props) {
  const { chapter, dispatch } = props;
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
