import React from 'react'
import {Button} from "antd";
import axios from 'axios';

export default function Home() {
    const ajax = () => {
        //获取数据
        axios.get("http://localhost:8000/posts").then(res => {
            console.log(res.data)
        })
    }
    return (<div>
        <Button type={"primary"} onClick={ajax}>button</Button>
    </div>)
}