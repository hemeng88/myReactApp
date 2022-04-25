import {Form, Input, Select} from "antd";
import {Option} from "antd/es/mentions";

export default function UserForm(props) {
    return (
        <Form
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{
                    required: true, message: 'Please input the title of collection!',
                }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{
                    required: true, message: 'Please input the title of collection!',
                }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={[{
                    required: true, message: 'Please input the title of collection!',
                }]}
            >
                <Select>
                    {props.regionList.map(item => <Option value={item.value} key={item.id}>{item.title}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{
                    required: true, message: 'Please input the title of collection!',
                }]}
            >
                <Select>
                    {props.roleList.map(item => <Option value={item.id} key={item.id}>{item.roleName}</Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}

