import React, {useEffect, useState} from 'react'
import {Button, Modal, Switch, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import UserForm from "../../../components/user-manage/UserForm";

export default function UserList() {

    const [dataSource, setDataSource] = useState([])
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3004/users?_expand=role").then(res => {
            const list = res.data
            setDataSource(list)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3004/roles").then(res => {
            const list = res.data
            setRoleList(list)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3004/regions").then(res => {
            const list = res.data
            setRegionList(list)
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
        title: '用户状态', dataIndex: 'roleState', render: (roleState, row) => {
            return <Switch checked={roleState} disabled={row.default}></Switch>
        }
    }, {
        title: '操作', render: (row) => {
            const deleteMethod = () => {
                Modal.confirm({
                    title: '您确定要删除吗？', icon: <ExclamationCircleOutlined/>, okText: '确认', cancelText: '取消', onOk: () => {

                    }
                });
            }
            return <div>
                <Button danger shape={"circle"} icon={<DeleteOutlined/>} onClick={() => deleteMethod()}
                        disabled={row.default}/>
                <Button type={"primary"} shape={"circle"} icon={<EditOutlined/>} disabled={row.default}/>
            </div>
        }
    }]

    return (<div>
        <Button type={"primary"} onClick={() => {
            setIsAddVisible(true)
        }}>添加用户</Button>
        <Table dataSource={dataSource} columns={columns}/>
        <Modal
            visible={isAddVisible}
            title="添加用户"
            okText="确定"
            cancelText="取消"
            onCancel={() => {
                setIsAddVisible(false)
            }}
            onOk={() => {

            }}
        >
            <UserForm regionList={regionList} roleList={roleList}></UserForm>
        </Modal>
    </div>)
}