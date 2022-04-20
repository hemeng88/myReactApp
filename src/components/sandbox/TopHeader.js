import {useState} from "react";
import {Avatar, Dropdown, Menu} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const menu = (<Menu
        items={[{
            label: "超级管理员"
        }, {
            danger: true, label: '退出登录',
        },]}
    />);
    return (<Header className="site-layout-background" style={{padding: "0 16px"}}>
        {collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}></MenuUnfoldOutlined> :
            <MenuFoldOutlined onClick={changeCollapsed}></MenuFoldOutlined>}
        <div style={{float: "right"}}>
            <span>欢迎admin回来</span>
            <Dropdown overlay={menu}>
                <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
        </div>
    </Header>)
}