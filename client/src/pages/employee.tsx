import { useEffect, useState } from "react";
import axios from "axios";

import { Button, Col, DatePicker, Drawer, Form, Input, Popconfirm, Row, Select, Space, Table, Typography } from "antd"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../store/employeeSlice";
import { useNavigate } from "react-router-dom";

import { API } from "../api";
import { getCafe } from "../store/cafeSlice";
import dayjs from "dayjs";
import { ArrowLeftOutlined, LeftCircleOutlined } from "@ant-design/icons";

// import 'dayjs'


interface EmployeePanelProps {
    panelState: "create" | "edit" | "close";
    onClose: () => void;
    editData: any
}

const EmployeePanel = (props: EmployeePanelProps) => {
    const { panelState, onClose, editData } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const cafe = useAppSelector((state) => state.cafe)

    useEffect(() => {
        axios(API.CafeApi.getCafeList)
            .then(res => {
                dispatch(getCafe(res.data));
            })
    }, [])

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                ...editData,
                work_start_date: dayjs(editData.work_start_date),
                cafe: editData.cafe.id
            })
        }
    }, [editData])

    const submit = () => {
        if (panelState === "create") {
            form.validateFields().then(data => {
                axios.post(API.EmployeeApi.createEmployee, { ...data, phone_number: parseInt(data.phone_number) })
                    .then((res) => {
                        dispatch(createEmployee({
                            ...res.data
                        }))
                        onClose()
                    })
            })
        }
        if (panelState === "edit") {
            form.validateFields().then(data => {
                axios.put(API.EmployeeApi.updateEmployee, { ...data, phone_number: parseInt(data.phone_number), cafe: data.cafe })
                    .then((res) => {
                        dispatch(updateEmployee(res.data))
                        onClose()
                    })
            })
        }
    }
    return (
        <>
            <Drawer
                title={panelState === "create" ? "Add a new employee" : "Edit employee's information"}
                width={720}
                onClose={onClose}
                open={panelState !== "close"}
                destroyOnClose={true}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={submit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form preserve={false} layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    { required: true, message: 'Please enter employee name' },
                                ]}
                            >
                                <Input placeholder="Please enter employee name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="email_address"
                                label="Email address"
                                rules={[
                                    { required: true, message: 'Please enter email address' },
                                ]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="Please enter email address"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="phone_number"
                                label="Phone number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter phone number',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter phone number" />
                            </Form.Item>
                        </Col>
                        {panelState === "edit" && <Col span={24}>
                            <Form.Item
                                name="id"
                                label="ID"
                            >
                                <Input placeholder="Please enter id" disabled />
                            </Form.Item>
                        </Col>}
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    { required: true, message: 'Please select gender' },
                                ]}
                            >
                                <Select options={[{ label: "Female", value: "female" }, { label: "Male", value: "male" }]} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="work_start_date"
                                label="Work start date"
                                rules={[
                                    { required: true, message: 'Please select work start date' },
                                ]}
                            >
                                <DatePicker format={'DD-MM-YYYY'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item
                                name="cafe"
                                label="Cafe"
                                rules={[
                                    { required: true, message: 'Please select cafe' },
                                ]}
                            >
                                <Select
                                    style={{ width: 120 }}
                                    //@ts-ignore
                                    options={cafe.list.map(item => ({ label: item.name, value: item.id }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

interface EmploeePanelProps {
    onClose: () => void;
    employeeId: string;
}


const Employee = () => {

    const employee = useAppSelector((state) => state.employee)
    const dispatch = useAppDispatch()
    const [panelState, setPanelState] = useState<"edit" | "create" | "close">("close")
    const [editData, setEditData] = useState<{}>()
    const navigate = useNavigate();
    const [currentEmployee, setCurrentEmployee] = useState("")

    useEffect(() => {
        axios(API.EmployeeApi.getEmployeeList)
            .then(res => {
                const data =res.data.map((item: { work_start_date: any })=>{
                        return {...item,work_start_date:dayjs(item.work_start_date).format('DD-MM-YYYY')}
                    })
            
                dispatch(getEmployee(data));
            })
    }, []);

    const handleOnEdit = (data: any) => {
        setEditData(data)
        setPanelState("edit")
    }

    const handleOnDelete = (id: string) => {
        axios.delete(API.EmployeeApi.deleteEmployee, { data: { id } })
        dispatch(deleteEmployee(id))
    }

    const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'ID', dataIndex: 'id' },
        { title: 'Email address', dataIndex: 'email_address' },
        { title: 'Phone number', dataIndex: 'phone_number' },
        { title: 'Gender', dataIndex: 'gender' },
        { title: 'Work start date', dataIndex: 'work_start_date' },
        { title: 'Cafe', dataIndex: 'cafe', render: (cafe: any) => cafe.name },
        {
            title: 'Actions', dataIndex: 'actions', render: (_: string, record: any) => {
                return (
                    <div>
                        <Typography.Link onClick={() => handleOnEdit(record)} style={{ marginRight: 8 }}>
                            Edit
                        </Typography.Link>

                        <Popconfirm title="Sure to delete?" onConfirm={() => handleOnDelete(record.id)}>
                            <a href="#">Delete</a>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];
    const goBack = ()=>{
        navigate('/');
    }
    return (
        <>
            <ArrowLeftOutlined style={{marginRight: 20,marginLeft:10,cursor:'pointer'}} onClick={goBack}/>
            <Button onClick={() => setPanelState("create")} style={{marginBottom: 20}}>New</Button>
            <Table
                rowKey="id"
                bordered
                columns={columns}
                dataSource={employee.list}
            />
            <EmployeePanel editData={editData} panelState={panelState} onClose={() => setPanelState("close")} />
            {/* <EmploeePanel employeeId={currentEmployee} onClose={() => setCurrentEmployee("")} /> */}
        </>
    )
}

export default Employee;