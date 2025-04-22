import React, { useState } from 'react';
import './Employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState(' ');

    //add a new employee
    const addEmployee = () => {
        if (newEmployee.trim() !== '') {
            setEmployees([...employees, newEmployee]);
            setNewEmployee(' ');
        } else {
            alert('Please enter a valid employee name.');
        }
    };

    //remove an employee by index
    const removeEmployee = (index) => {
        setEmployees(employees.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Employee Management</h1>
        <div>
            <input
               type="text"
               placeholder="Enter employee name"
                value={newEmployee}
                onChange={(e) => setewEmployee(e.target.value)}
            />
            <button onClick={addEmployee}>Add Employee</button>
            </div>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee, index) => (
                    <li key={index}>
                        {employee}{' '}
                        <button onClick={() => removeEmployee(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            </div>
    );
};

export default Employees;