import React,{Component, RefObject, createRef} from "react";
import { Form, FormInstance,Input,Checkbox,Button, Space } from "antd";

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

class Login extends Component {
    formRef: RefObject<FormInstance>

    constructor(props:any,context:any) {
        super(props,context);
        this.formRef = createRef<FormInstance>()
    }

    render() {
        return(
        <>
        <Form ref={this.formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}
         name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}
         initialValues={{ remember: true }} autoComplete="off">
            <Form.Item label="用户名" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="密码" name="password">
                <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    <Button type="primary" htmlType="submit">
                        重置
                    </Button>
                </Space>
              
            </Form.Item>
        </Form>
        </>
        );
        
    }
}

export default Login;