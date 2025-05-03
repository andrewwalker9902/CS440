import React, { useEffect, useState } from 'react';
import './Employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone: ''
    });

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:3000/employee');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const addEmployee = async () => {
        const { email, first_name, last_name, phone } = newEmployee;

        if (!email || !first_name || !last_name || !phone) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEmployee)
            });

            if (!response.ok) {
                throw new Error('Failed to add employee');
            }

            setNewEmployee({ email: '', first_name: '', last_name: '', phone: '' });
            fetchEmployees(); // Refresh list after adding
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const deleteEmployee = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/employee/${email}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }

            fetchEmployees(); // Refresh list after deleting
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="employees-container">
            <h1>Employee Management</h1>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={newEmployee.first_name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newEmployee.last_name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                />
                <button onClick={addEmployee}>Add Employee</button>
            </div>

            <h2>Employee List</h2>
            <ul>
                {employees.map((emp) => (
                    <li key={emp.email}>
                        {emp.first_name} {emp.last_name} ({emp.email}, {emp.phone}){' '}
                        <button onClick={() => deleteEmployee(emp.email)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Employees;
