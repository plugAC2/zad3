import React, { useState, useEffect } from 'react';
import api from "../api";
import TaskEditModal from "./TaskEditModal";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        fetchTasks();
    }, [tasks]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (e, id, title, task) => {
        e.preventDefault();
        setSelected({
            id,
            title,
            task
        });
        setShowModal(true);
    }

    const handleSaveBook = async (updatedBook) => {
        console.log('Saving book:', updatedBook);

        try {
            await api.put(`/tasks/${updatedBook.id}`, { id:updatedBook.id, title:updatedBook.title, task:updatedBook.task });
            setSelected({
                title:'',
                task:''
            })
        } catch (error) {
            console.error(error);
        }

        setShowModal(false);
    };

    const handleCancelEdit = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h2>Task List</h2>
            <table>
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Zadanie</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.task}</td>
                        <td>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </td>
                        <td>
                            <button onClick={(e) => handleEdit(e, task.id, task.title, task.task)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {
                showModal && (
                    <TaskEditModal taskEdit={selected} onSave={handleSaveBook} onCancel={handleCancelEdit}/>
                )
            }
        </div>
    );
};

export default TaskList;
