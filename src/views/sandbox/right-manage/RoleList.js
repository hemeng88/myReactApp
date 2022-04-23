import React, {useEffect, useState} from 'react'
import {Button, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, UnorderedListOutlined} from "@ant-design/icons";

export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    const columns = [{
        title: 'ID', dataIndex: 'id', render: (id) => {
            return <b>{id}</b>
        },
    }, {
        title: '角色名称', dataIndex: 'roleName'
    }, {
        title: '操作', render: (row) => {
            return <div>
                <Button shape="circle" danger icon={<DeleteOutlined/>}></Button>
                <Button shape="circle" type="primary" icon={<UnorderedListOutlined/>}></Button>
            </div>
        }
    }]
    useEffect(() => {
        axios.get("http://localhost:3004/roles").then(res => {
            setdataSource(res.data)
        })
    }, [])

    return (<div>
        <Table dataSource={dataSource} columns={columns} rowKey={(row) => row.id}></Table>
    </div>)
}