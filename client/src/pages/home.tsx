import {useState} from 'react';
import {Button} from 'antd';
import { useNavigate } from "react-router-dom";
const Home = ()=>{
    const navigate = useNavigate();
    const goToCafeList = ()=>{
        navigate("/cafes");
    }
    const goToEmployeeList = ()=>{
        navigate("/employees");
    }

    return (
        <div style={{display:'flex',justifyContent:'center',height:300,alignItems:'center'}}>
            <Button onClick={goToCafeList} style={{marginRight:20}}>Cafe Infomation</Button>
            <Button onClick={goToEmployeeList}>Employee Infomation</Button>
        </div>
    );
}

export default Home;