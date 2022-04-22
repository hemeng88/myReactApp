import React from "react"
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import {Navigate, Routes} from "react-router";
import {Route} from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import RoleList from "./right-manage/RoleList";
import RightList from "./right-manage/RightList";
import Nopermission from "./nopermission/Nopermission";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import './NewsSandBox.css'

export default function NewsSandBox() {
    return (<Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
            <TopHeader></TopHeader>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px', padding: 24, minHeight: 280,overflow: 'auto'
                }}
            >
                <Routes>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/user-manage/list"} element={<UserList/>}/>
                    <Route path={"/right-manage/role/list"} element={<RoleList/>}/>
                    <Route path={"/right-manage/right/list"} element={<RightList/>}/>
                    {/*默认页和路由不存在的的页面*/}
                    <Route path="/" element={<Navigate to="/home" replace/>}/>
                    <Route path="*" element={<Nopermission/>}/>
                </Routes>
            </Content>
        </Layout>
    </Layout>)
}