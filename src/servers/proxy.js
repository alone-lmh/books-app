const express=require("express")
const axios=require("axios")
const cors=require("cors")

const app =express()

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())
//post请求
//请求地址/api/v1/proxy
//请求的时候传递一个参数url
app.post('/api/proxy',(req,res)=>{
    const {url}=req.body;
  console.log(url)
    axios.get(encodeURI(url)).then(response=>{
        res.json(response.data)
    })
})
app.listen(3005,()=>console.log('代理服务器启动完成'))