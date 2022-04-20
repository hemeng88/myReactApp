import React from 'react'
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import './index.css'
import {useNavigate} from "react-router";

export default function SideMenu() {
    function getItem(label, key, children, type) {
        return {
            key,
            children,
            label,
            type,
        };
    }

    const navigate = useNavigate()

    const items = [
        getItem('首页', '/home'),
        getItem('用户管理', '/user-manage', [
            getItem('用户列表', '/user-manage/list'),
        ]),
        getItem('权限管理', '/right-manage', [
            getItem('角色列表', '/right-manage/role/list'),
            getItem('权限列表', '/right-manage/right/list'),
        ]),
        getItem('新闻管理', 'sub3', [
            getItem('撰写新闻', '9'),
            getItem('草稿箱', '10'),
            getItem('新闻分类', '11'),
        ]),
        getItem('审核管理', 'sub4', [
            getItem('审核新闻', '12'),
            getItem('审核列表', '13'),
        ]),
        getItem('发布管理', 'sub5', [
            getItem('待发布', '14'),
            getItem('已发布', '15'),
        ])
    ];

    return (<Sider trigger={null} collapsible collapsed={false}>
        <div className="logo">全球新闻发布管理系统</div>
        <Menu
            onClick={(e) => {
                navigate(e.key)
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            mode="inline"
            theme="dark"
            items={items}
        />
    </Sider>)
}