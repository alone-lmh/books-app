import React, { useEffect } from "react";
import { Toast, SearchBar, Tag, List} from "antd-mobile";
import { connect } from "dva";
import router from "umi/router";
import classifyCss from "../css/classify.css";

function search(props) {
  const Item = List.Item;
  const { dispatch, hotWord, limit, tipWord } = props;
  useEffect(() => {
    Toast.hide();
    dispatch({ type: "book/add", payload: { tipWord: [] } });
  }, []);
  function search(word) {
    Toast.loading("Loading...",30);
    dispatch({
      type: "book/search",
      payload: { word, page: 0, major: word, flag: true, limit }
    });
  }
  function getTip(word) {
    if (word !== "") {
      dispatch({ type: "book/tipWord", payload: { word } });
    } else {
      dispatch({ type: "book/add", payload: { tipWord: [] } });
    }
  }
  function back() {
    router.push("/");
  }
  return (
    <div>
      <SearchBar
        placeholder="Search"
        onSubmit={value => {
          search(value);
        }}
        onChange={value => {
          getTip(value);
        }}
        onCancel={() => {
          back();
        }}
      />
      {tipWord.length !== 0 ? (
        <List className="my-list">
          {tipWord.map((v, i) => {
            return (
              <Item
                key={i}
                onClick={() => {
                  search(v.text);
                }}
                className={classifyCss.list}
              >
                {v.text}
              </Item>
            );
          })}
        </List>
      ) : (
        hotWord.map((v, i) => {
          return (
            <Tag
              className={classifyCss.tag}
              key={i}
              onChange={() => {
                search(v.title);
              }}
            >
              {v.title}
            </Tag>
          );
        })
      )}
    </div>
  );
}
export default connect(state => state.book)(search);
