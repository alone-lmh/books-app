import React, { useEffect } from "react";
import router from "umi/router";
import loginCss from "../css/login.css";
import headImg from "../img/head.png";
import { Toast, InputItem, NavBar, Icon, Button } from "antd-mobile";
import { connect } from "dva";

function reg(props) {
  const { dispatch } = props;
  var userName = "";
  var psw = "";
  useEffect(() => {
    document.getElementById("root").style.height = 100 + "%";
  }, []);
  function regHandle() {
    if (userName && psw) {
      if (!/^\S{5,13}$/.test(userName)) {
        Toast.info("用户名应为5-13位字符!!!", 1);
      } else if (!/^\S{6,18}$/.test(psw)) {
        Toast.info("密码应为6-18位字符!!!", 1);
      } else {
        dispatch({ type: "book/reg", payload: { userName, psw,from:props.history.location.query.from } });
      }
    } else {
      Toast.info("请输入用户名和密码!!!", 1);
    }
  }
  return (
    <div className={loginCss.login}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => router.push('/login?from='+props.history.location.query.from)}
      >
        注册
      </NavBar>
      <img src={headImg} className={loginCss.img}></img>
      <InputItem
        className={loginCss.ipt}
        placeholder="请输入用户名"
        onChange={v => {
          userName = v;
        }}
      >
        <div>用户名</div>
      </InputItem>
      <InputItem
        type="password"
        placeholder="****"
        onChange={v => {
          psw = v;
        }}
      >
        密码
      </InputItem>
      <p className={loginCss.link} onClick={()=>{router.push('/login?from='+props.history.location.query.from)}}>前去登录</p>
      <Button
        className={loginCss.btn}
        onClick={() => {
          regHandle();
        }}
      >
        注册
      </Button>
    </div>
  );
}
export default connect(state => state.book)(reg);
