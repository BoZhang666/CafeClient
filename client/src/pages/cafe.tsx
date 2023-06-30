import { useEffect, useState } from "react";
import axios from "axios";

import { Button, Col, Drawer, Form, Input, Popconfirm, Row, Space, Table, Typography } from "antd"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createCafe, deleteCafe, getCafe, updateCafe } from "../store/cafeSlice";

import { API } from "../api";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface CafePanelProps {
    panelState: "create" | "edit" | "close";
    onClose: () => void;
    editData: any
}

const CafePanel = (props: CafePanelProps) => {
    const { panelState, onClose, editData } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()

    useEffect(() => {
        form.setFieldsValue(editData)
    }, [editData])

    const submit = () => {
        if (panelState === "create") {
            form.validateFields().then(data => {
                axios.post(API.CafeApi.createCafe, data)
                    .then((res) => {
                        dispatch(createCafe(res.data))
                        onClose()
                    })
            })
        }
        if (panelState === "edit") {
            form.validateFields().then(data => {
                axios.put(API.CafeApi.updateCafe, data)
                    .then((res) => {
                        dispatch(updateCafe(res.data))
                        onClose()
                    })
            })
        }
    }
    return (
        <>
            <Drawer
                title={panelState === "create" ? "Add a new cafe" : "Edit cafe's infomation"}
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
                                    { required: true, message: 'Please enter Cafe name' },
                                ]}
                            >
                                <Input placeholder="Please enter Cafe name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    { required: true, message: 'Please enter description' },
                                ]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="Please enter description"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter location',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter location" />
                            </Form.Item>
                        </Col>
                        {panelState === "edit" && <Col span={24}>
                            <Form.Item
                                name="id"
                                label="ID"
                            >
                                <Input placeholder="Please enter location" disabled />
                            </Form.Item>
                        </Col>}
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

interface EmploeePanelProps {
    onClose: () => void;
    cafeId: string;
}

const EmploeePanel = (props: EmploeePanelProps) => {

    const [emploees, setEmploees] = useState<any[]>()

    useEffect(() => {
        if (props.cafeId !== "") {
            axios.get(API.EmployeeApi.getEmployeeList, { params: { cafe: props.cafeId } })
            .then(res => {
                const data = res.data.map((item: { work_start_date: any })=>{
                        return {...item,work_start_date:dayjs(item.work_start_date).format('DD-MM-YYYY')}
                    })

                setEmploees(data)
            })
        }
    }, [props.cafeId])


    const columns = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Name', dataIndex: 'name', editable: true },
        { title: 'Email Address', dataIndex: 'email_address', editable: true, },
        { title: 'Phone Number', dataIndex: 'phone_number', editable: true, },
        { title: 'Gender', dataIndex: 'gender', editable: true, },
        { title: 'Work Start Date', dataIndex: 'work_start_date', editable: true, },
    ];

    return (
        <Drawer
            title="Emploees"
            width={720}
            onClose={props.onClose}
            open={props.cafeId !== ""}
            destroyOnClose={true}
            bodyStyle={{
                paddingBottom: 80,
            }}
        >
            <Table
                rowKey="id"
                bordered
                columns={columns}
                dataSource={emploees}
            />
        </Drawer>
    )
}

const Cafe = () => {

    const cafe = useAppSelector((state) => state.cafe)
    const dispatch = useAppDispatch()
    const [panelState, setPanelState] = useState<"edit" | "create" | "close">("close")
    const [editData, setEditData] = useState<{}>()
    const navigate = useNavigate();
    const [currentCafe, setCurrentCafe] = useState("")

    useEffect(() => {
        axios(API.CafeApi.getCafeList)
            .then(res => {
                dispatch(getCafe(res.data));
            })
    }, []);

    const handleOnEdit = (data: any) => {
        setEditData(data)
        setPanelState("edit")
    }

    const handleOnDelete = (id: string) => {
        axios.delete(API.CafeApi.deleteCafe, { data: { id } })
        dispatch(deleteCafe(id))
    }

    const columns = [
        { title: 'ID', dataIndex: 'id' },
        {
            title: 'Name', dataIndex: 'name', editable: true, render: (name: string, record: any) => {
                return <Button onClick={() => setCurrentCafe(record.id)} type="link">{name}</Button>
            }
        },
        { title: 'Description', dataIndex: 'description', editable: true, },
        { title: 'Location', dataIndex: 'location', editable: true, },
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
                dataSource={cafe.list}
            />
            <CafePanel editData={editData} panelState={panelState} onClose={() => setPanelState("close")} />
            <EmploeePanel cafeId={currentCafe} onClose={() => setCurrentCafe("")} />
        </>
    )
}

export default Cafe;