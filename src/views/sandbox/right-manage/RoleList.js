import React, {useEffect, useState} from 'react'
import {Button, Modal, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, ExclamationCircleOutlined, UnorderedListOutlined} from "@ant-design/icons";

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
                <Button shape="circle" danger icon={<DeleteOutlined/>} onClick={() => confirmMethod(row)}></Button>
                <Button shape="circle" type="primary" icon={<UnorderedListOutlined/>}></Button>
            </div>
        }
    }]

    const confirmMethod = (row) => {
        Modal.confirm({
            title: '您确定要删除吗？', icon: <ExclamationCircleOutlined/>, okText: '确认', cancelText: '取消', onOk: () => {
                setdataSource(dataSource.filter(data => data.id !== row.id))
                axios.delete(`http://localhost:3004/roles/${row.id}`)
            }
        });
    }

    useEffect(() => {
        axios.get("http://localhost:3004/roles").then(res => {
            setdataSource(res.data)
        })
    }, [])

    return (<div>
        <Table dataSource={dataSource} columns={columns} rowKey={(row) => row.id}></Table>
    </div>)
}