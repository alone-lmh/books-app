import React, { useEffect } from 'react'
import loginCss from "../css/login.css";
import router from "umi/router";
import { Button } from "antd-mobile";

export default function notFound() {
  useEffect(() => {
    document.getElementById("root").style.height = 100 + "%";
  }, []);
  return (
    <div className={loginCss.page404}>
      <Button onClick={()=>{router.push('/')}} className={loginCss.homeBtn}>回到首页</Button>
    </div>
  )
}
