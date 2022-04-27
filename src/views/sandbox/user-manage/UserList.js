import React, {useEffect, useRef, useState} from 'react'
import {Button, Modal, Switch, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import UserForm from "../../../components/user-manage/UserForm";

export default function UserList() {

    const [dataSource, setDataSource] = useState([])
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])
    const addForm = useRef(null)

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
            return <Switch checked={roleState} disabled={row.default} onChange={() => handleChange(row)}></Switch>
        }
    }, {
        title: '操作', render: (row) => {
            const confirmMethod = () => {
                Modal.confirm({
                    title: '您确定要删除吗？', icon: <ExclamationCircleOutlined/>, okText: '确认', cancelText: '取消', onOk() {
                        deleteMethod(row)
                    }
                });
            }
            return <div>
                <Button danger shape={"circle"} icon={<DeleteOutlined/>} onClick={() => confirmMethod()}
                        disabled={row.default}/>
                <Button type={"primary"} shape={"circle"} icon={<EditOutlined/>} disabled={row.default}/>
            </div>
        }
    }]
    const deleteMethod = (item) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:3004/users/${item.id}`)
    }
    const addFormOk = () => {
        addForm.current.validateFields().then(value => {
            setIsAddVisible(false)
            addForm.current.resetFields()
            //post到后端，生成id，再设置dataSource，方便后面的删除和更新
            axios.post(`http://localhost:3004/users`, {
                ...value, "roleState": true, "default": false,
            }).then(res => {
                setDataSource([...dataSource, {
                    ...res.data, role: roleList.filter(item => item.id === value.roleId)[0]
                }])
            })
        }).catch(err => {
            console.log(err)
        })
    }
    const handleChange = (item) => {
        item.roleState = !item.roleState
        setDataSource([...dataSource])
        axios.patch(`http://localhost:3004/users/${item.id}`, {roleState: item.roleState})
    }
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
            onOk={() => addFormOk()}
        >
            <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
        </Modal>
    </div>)
}
