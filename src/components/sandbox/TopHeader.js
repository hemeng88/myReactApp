import {useState} from "react";
import {Dropdown, Menu} from "antd";
import {DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const menu = (<Menu
        items={[{
            label: (<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>),
        }, {
            label: (<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>), icon: <DownOutlined/>, disabled: true,
        }, {
            label: (<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>), disabled: true,
        }, {
            danger: true, label: 'a danger item',
        },]}
    />);
    return (<Header className="site-layout-background" style={{padding: "0 16px"}}>
        {collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}></MenuUnfoldOutlined> :
            <MenuFoldOutlined onClick={changeCollapsed}></MenuFoldOutlined>}
        <div style={{float: "right"}}>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    欢迎admin回来 <DownOutlined/>
                </a>
            </Dropdown>
        </div>
    </Header>)
}