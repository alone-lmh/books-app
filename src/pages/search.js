import React, { useEffect } from "react";
import { SearchBar, Tag } from "antd-mobile";
import { connect } from "dva";
import router from "umi/router";
import classifyCss from "../css/classify.css";

function search(props) {
  const { dispatch, hotWord,limit } = props;
  useEffect(() => {
    dispatch({ type: "book/hotWord" });
  }, []);
  function search(word){
    dispatch({type:"book/search",payload:{word,page:0,major:word,flag:true,limit}})
  }
  function back(){
    router.push("/");
  }
  return (
    <div>
      <SearchBar placeholder="Search" onSubmit={(value)=>{search(value)}} maxLength={8} onCancel={()=>{back()}} />
      {hotWord.length !== 0
        ? hotWord.map((v, i) => {
            return (
              <Tag className={classifyCss.tag} key={i} onChange={()=>{search(v.title)}}>
                {v.title}
              </Tag>
            );
          })
        : ""}
    </div>
  );
}
export default connect(state => state.book)(search);
