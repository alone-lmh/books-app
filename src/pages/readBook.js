import React, { useEffect } from "react";
import { connect } from "dva";
import { Toast, Button } from "antd-mobile";
import router from "umi/router";
import indexCss from "../css/index.css";

function readBook(props) {
  const { reading, num, chapter, dispatch } = props;
  // console.log(reading);
  const arr = JSON.stringify(reading.body).slice(1,JSON.stringify(reading.body).length-1).split("\\n").map(v=>v.replace(/\\r/g,"").trim()).filter(v=>v!=="")
  // console.log(arr)
  useEffect(()=>{Toast.hide();},[]);
  return (
    <div id="read">
      <Button
        type="primary"
        onClick={() => {
          router.push("/chapters");
        }}
      >
        回到小说章节页面
      </Button>
      <h1 style={{textAlign:"center"}}>
        {reading.title !== "" && reading.title !== "."
          ? reading.title
          : "第" + (num + 1) + "章"}
      </h1>
      {arr.map((v, i) => {
        return (
          <p key={i} className={indexCss.section}>
            {v}
          </p>
        );
      })}
      <div className={indexCss.bottom}>
      <Button
        type="ghost"
        onClick={() => {
          if (num > 0) {
            Toast.loading("Loading...",30);
            dispatch({
              type: "book/read",
              payload: { url: chapter[num - 1].link, num: num - 1 }
            });
          }
        }}
        inline
        style={{ marginRight: "4px" }}
        className="am-button-borderfix"
      >
        上一章
      </Button>
      <Button
        type="ghost"
        onClick={() => {
          if (num < chapter.length) {
            Toast.loading("Loading...",30);
            dispatch({
              type: "book/read",
              payload: { url: chapter[num + 1].link, num: num + 1 }
            });
          }
        }}
        inline
        style={{ marginRight: "4px" }}
        className="am-button-borderfix"
      >
        下一章
      </Button>
      </div>
    </div>
  );
}
export default connect(state => state.book)(readBook);
