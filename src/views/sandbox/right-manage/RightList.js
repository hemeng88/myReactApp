import React, {useEffect, useState} from 'react'
import {Button, Table, Tag} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export default function RightList() {

    const [dataSource, setdataSource] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3004/rights?_embed=children").then(res => {
            const list=res.data
            list[0].children=""
            setdataSource(list)
        })
    }, [])

    const columns = [{
        title: 'ID', dataIndex: 'id', render: (id) => {
            return <b>{id}</b>
        }
    }, {
        title: '权限名称', dataIndex: 'title',
    }, {
        title: '权限路径', dataIndex: 'key', render: (key) => {
            return <Tag color="orange">{key}</Tag>
        }
    }, {
        title: '操作', render: () => {
            return <div>
                <Button shape="circle" danger icon={<DeleteOutlined />}></Button>
                <Button shape="circle" type="primary" icon={<EditOutlined />}></Button>
            </div>
        }
    },]

    return (<div>
        <Table dataSource={dataSource} columns={columns}/>;
    </div>)
}