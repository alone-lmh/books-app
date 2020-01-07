import React, { useEffect } from "react";
import { connect } from "dva";
import { Tabs, Tag ,Button} from "antd-mobile";
import router from "umi/router";
import classifyCss from "../css/classify.css";

function classify(props) {
  const tabs = [{ title: "男生" }, { title: "女生" }, { title: "出版" }];
  var { classify, dispatch, type, limit } = props;
  function check(t) {
    type = t;
    let allB = document.getElementsByTagName("b");
    for (let i = 0; i < allB.length; i++) {
      allB[i].style.color = "#aaa";
      allB[i].style.borderColor = "#aaa";
    }
    event.target.style.color = "#108ee9";
    event.target.style.borderColor = "#108ee9";
    dispatch({ type: "book/add", payload: { type: t } });
  }
  function find(gender, type, major) {
    // console.log(1)
    dispatch({
      type: "book/loadData",
      payload: { gender, type, major, page: 0, flag: false, limit }
    });
  }
  // console.log(classify);
  return (
    <div>
      <b
        className={classifyCss.btn}
        onClick={() => {
          check(1);
        }}
      >
        热门
      </b>
      <b
        className={classifyCss.btn}
        onClick={() => {
          check(2);
        }}
      >
        留存
      </b>
      <b
        className={classifyCss.btn}
        onClick={() => {
          check(3);
        }}
      >
        连载
      </b>
      <b
        className={classifyCss.btn}
        onClick={() => {
          check(4);
        }}
      >
        完结
      </b>
      <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
        <div>
          {classify.length !== 0
            ? classify.male.map((v, i) => {
                return (
                  <Tag
                    className={classifyCss.tag}
                    key={i}
                    onChange={() => {
                      find("male", type, v);
                    }}
                  >
                    {v}
                  </Tag>
                );
              })
            : ""}
        </div>
        <div>
          {classify.length !== 0
            ? classify.female.map((v, i) => {
                return (
                  <Tag
                    className={classifyCss.tag}
                    key={i}
                    onChange={() => {
                      find("female", type, v);
                    }}
                  >
                    {v}
                  </Tag>
                );
              })
            : ""}
        </div>
        <div>
          {classify.length !== 0
            ? classify.press.map((v, i) => {
                return (
                  <Tag
                    className={classifyCss.tag}
                    key={i}
                    onChange={() => {
                      find("press", type, v);
                    }}
                  >
                    {v}
                  </Tag>
                );
              })
            : ""}
        </div>
      </Tabs>
      <Button className={classifyCss.link}
        type="ghost"
        onClick={() => {
          router.push("/bookrack");
        }}
      >
        进入我的书架
      </Button>
    </div>
  );
}
export default connect(state => state.book)(classify);
