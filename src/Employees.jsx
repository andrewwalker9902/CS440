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
            fetchEmployees();
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

            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="employees-container">
            <h2 className="section-header">Employee Management</h2>
            <div className="form-wrapper">
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
                <button className="primary-button" onClick={addEmployee}>Add Employee</button>
            </div>

            <div className="table-wrapper">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.email}>
                                <td>{emp.first_name}</td>
                                <td>{emp.last_name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteEmployee(emp.email)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;
