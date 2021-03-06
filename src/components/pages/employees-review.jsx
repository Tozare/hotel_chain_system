import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "@material-ui/core";
import {UpdateEmployee} from "../emploee/updateEmployee";
import './employees-review.css';
import {authenticationService} from "../../services/auth.service";
import { useHistory } from 'react-router-dom';

export const EmployeesReview = () => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);

    if (currentUser.role.name !== 'Manager'){
        history.push('/');
        return null;
    }

    const [employees, setEmployees] = useState([]);
    const [updateEmployee, setUpdateEmployee] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/hotels/all/employees")
            .then(res => {
                console.log(res.data);
                setEmployees(res.data);
            });
    }, []);

    return <div>
        {
            updateEmployee !== null &&
            <div className='update-modal'>
                <UpdateEmployee employee={updateEmployee} cancel = {() => setUpdateEmployee(null)}/>
            </div>
        }
        <div className='employees-list'>
            <div className='employees-list_header'>Employees</div>
            {
                employees.map((employee) => {
                    return <div className='employees-list-element'>
                        <div className='employees-list-element_part'>ID: {employee.id}</div>
                        <div className='employees-list-element_part'>Name: {employee.name}</div>
                        <div className='employees-list-element_part'>Position: {employee.position}</div>
                        <div className='employees-list-element_part'>Hours: {employee.hours}</div>
                        <div className='employees-list-element_part'>Salary: {employee.salary}</div>
                        {<div className='employees-list-element_part'>Supervisor: {employee.supervisor ? employee.supervisor.name: 'No supervisor'}</div>}
                        <div  className='employees-list-element_btn'>
                            <Button  variant="contained"
                                     color="primary"
                                     onClick={() => setUpdateEmployee(employee)}
                            >
                                update
                            </Button>
                        </div>
                    </div>
                })
            }
        </div>
    </div>

}