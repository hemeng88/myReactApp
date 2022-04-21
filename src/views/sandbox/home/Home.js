import React from 'react'
import {Button} from "antd";
import axios from 'axios';

export default function Home() {
    const ajax = () => {
        //获取数据 get
        // axios.get("http://localhost:3004/posts").then(res => {
        //     console.log(res.data)
        // })

        //增添数据 post
        // axios.post("http://localhost:3004/posts",{
        //     title: "33333",
        //     author: "xiaoming"
        // })

        //修改数据 put
        // axios.put("http://localhost:3004/posts/1",{
        //     title: "1111-修改"
        // })

        //修改数据 patch
        // axios.patch("http://localhost:3004/posts/2",{
        //     title: "xiaoming-xiugai"
        // })

        //修改数据 delete
        //axios.delete("http://localhost:3004/posts/2")}

        //获取关联数据 _embed
        axios.get("http://localhost:3004/rights?_embed=children").then(res => {
            console.log(res.data);
        })

        //获取关联数据 _expand
        // axios.get("http://localhost:3004/comments?_expand=post").then(res => {
        //     console.log(res.data)
        // })
    }
    return (<div>
        <Button type={"primary"} onClick={ajax}>button</Button>
    </div>)
}
