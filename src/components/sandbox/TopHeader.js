import React, {useState} from 'react'
import {Header} from "antd/es/layout/layout";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

export default function TopHeader() {
    const [collapsed] = useState(false)
    return (<Header className="site-layout-background" style={{padding: 0}}>
        {collapsed ? <MenuUnfoldOutlined></MenuUnfoldOutlined> : <MenuFoldOutlined></MenuFoldOutlined>}
    </Header>)
}