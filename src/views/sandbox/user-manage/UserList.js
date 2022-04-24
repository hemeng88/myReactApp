import React, {useEffect, useState} from 'react'
import {Button, Switch, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export default function UserList() {

    const [dataSource, setdataSource] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3004/users?_expand=role").then(res => {
            const list = res.data
            setdataSource(list)
        })
    }, [])

    const columns = [{
        title: '区域', dataIndex: 'region', render: (region) => {
            return <b>{region === "" ? '全球' : region}</b>
        }
    }, {
        title: '角色名称', dataIndex: 'role', render: (role) => {
            return role.roleName
        }
    }, {
        title: '用户名', dataIndex: 'username',
    }, {
        title: '用户状态', dataIndex: 'roleState', render: () => {
            return <Switch></Switch>
        }
    }, {
        title: '操作', render: (item) => {
            return <div>
                <Button danger shape={"circle"} icon={<DeleteOutlined/>}/>
                <Button type={"primary"} shape={"circle"} icon={<EditOutlined/>}/>
            </div>
        }
    }]

    return (<div>
        <Table dataSource={dataSource} columns={columns}/>;
    </div>)
}