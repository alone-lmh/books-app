import React, { useEffect } from "react";
import router from "umi/router";
import loginCss from "../css/login.css";
import headImg from "../img/head.png";
import { Toast,InputItem, NavBar, Icon, Button } from "antd-mobile";
import { connect } from "dva";

function login(props) {
  const { dispatch} = props;
  var userName='';
  var psw='';
  useEffect(() => {
    document.getElementById("root").style.height = 100 + "%";
  }, []);
  function loginHandle(){
    if(userName&&psw){
      dispatch({type:'book/login',payload:{userName,psw,from:props.history.location.query.from}})
    }else{
      Toast.info('请输入用户名和密码!!!', 1);
    }
  }
  return (
    <div className={loginCss.login}>
      <NavBar className={loginCss.head}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => router.push('/'+props.history.location.query.from)}
      >
        登录
      </NavBar>
      <img src={headImg} className={loginCss.img}></img>
      <InputItem className={loginCss.ipt}
        placeholder="请输入用户名" onChange={(v)=>{userName=v}}
      >
        <div>用户名</div>
      </InputItem>
      <InputItem className={loginCss.ipt}
        type="password"
        placeholder="******" onChange={(v)=>{psw=v}}
      >
        密码
      </InputItem>
      <p className={loginCss.link} onClick={()=>{router.push('/reg?from='+props.history.location.query.from)}}>前去注册</p>
      <Button className={loginCss.btn} onClick={()=>{loginHandle()}}>登录</Button>
    </div>
  );
}
export default connect(state => state.book)(login);