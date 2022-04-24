import React, {useEffect, useState} from 'react'
import {Button, Modal, Table, Tree} from "antd";
import axios from "axios";
import {DeleteOutlined, ExclamationCircleOutlined, UnorderedListOutlined} from "@ant-design/icons";

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    const [rightList, setRightList] = useState([])
    const [currentRights, setCurrentRights] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
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
                <Button shape="circle" type="primary" icon={<UnorderedListOutlined/>}
                        onClick={() => {
                            setIsModalVisible(true)
                            setCurrentRights(row.rights)
                        }}></Button>
            </div>
        }
    }]

    const confirmMethod = (row) => {
        Modal.confirm({
            title: '您确定要删除吗？', icon: <ExclamationCircleOutlined/>, okText: '确认', cancelText: '取消', onOk: () => {
                setDataSource(dataSource.filter(data => data.id !== row.id))
                axios.delete(`http://localhost:3004/roles/${row.id}`)
            }
        });
    }

    useEffect(() => {
        axios.get("http://localhost:3004/roles").then(res => {
            setDataSource(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3004/rights?_embed=children").then(res => {
            setRightList(res.data)
        })
    }, [])

    const handleOk = () => {

    };

    const handleCancel = () => {
        setIsModalVisible(false)
    };

    const onCheck = (checkedKeys) => {
        setCurrentRights(checkedKeys)
    };

    return (<div>
        <Table dataSource={dataSource} columns={columns} rowKey={(row) => row.id}></Table>
        <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Tree
                checkable
                checkStrictly={true}
                treeData={rightList}
                checkedKeys={currentRights}
                onCheck={onCheck}
            />
        </Modal>
    </div>)
}