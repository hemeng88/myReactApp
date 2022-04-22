import React, {useEffect, useState} from 'react'
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import './index.css'
import {useNavigate} from "react-router";
import axios from "axios";
import {CheckOutlined, HomeOutlined, KeyOutlined, MessageOutlined, SendOutlined, UserOutlined} from "@ant-design/icons";

export default function SideMenu() {
    const navigate = useNavigate()

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3004/rights?_embed=children").then(res => {
            setMenu(res.data)
        })
    }, []);

    const iconList = {
        "/home": <HomeOutlined/>,
        "/user-manage": <UserOutlined/>,
        "/right-manage": <KeyOutlined/>,
        "/news-manage": <MessageOutlined/>,
        "/audit-manage": <CheckOutlined/>,
        "/publish-manage": <SendOutlined/>,
    }

    Object.keys(menu).forEach(key => {
        menu[key].icon = iconList[menu[key].key]
        console.log(menu[key].key)
        menu[key].label = menu[key].title
        if (menu[key].children && menu[key].children.length > 0) {
            menu[key].children.forEach(key => {
                key.label = key.title
            })
        } else {
            delete menu[key].children
        }
    })

    function filterList(list) {
        return list.filter(item => {
            if (item.pagepermisson) {
                if (item.children && item.children.length) {
                    item.children = filterList(item.children);
                }
                return true;
            }
            return false
        });
    }

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
            items={filterList(menu)}
        />
    </Sider>)
}