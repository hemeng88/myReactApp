import React, {useEffect, useState} from 'react'
import {Button, Modal, Table, Tag} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

export default function RightList() {

    const [dataSource, setdataSource] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3004/rights?_embed=children").then(res => {
            const list = res.data
            list.forEach((item) => {
                if (item.children.length === 0) {
                    item.children = ""
                }
            })
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
        title: '操作', render: (row) => {
            const confirmMethod = () => {
                Modal.confirm({
                    title: '您确定要删除吗？', icon: <ExclamationCircleOutlined/>, okText: '确认', cancelText: '取消', onOk: () => {
                        if (row.grade === 1) {
                            setdataSource(dataSource.filter(data => data.id !== row.id))
                            axios.delete(`http://localhost:3004/rights/${row.id}`)
                        }
                        if (row.grade === 2) {
                            let list = dataSource.filter(data => data.id === row.rightId)
                            list[0].children = list[0].children.filter(data => data.id !== row.id)
                            setdataSource([...dataSource])
                            axios.delete(`http://localhost:3004/children/${row.id}`)
                        }
                    }
                });
            }
            return <div>
                <Button shape="circle" danger icon={<DeleteOutlined/>} onClick={() => confirmMethod()}></Button>
                <Button shape="circle" type="primary" icon={<EditOutlined/>}></Button>
            </div>
        }
    },]

    return (<div>
        <Table dataSource={dataSource} columns={columns}/>;
    </div>)
}