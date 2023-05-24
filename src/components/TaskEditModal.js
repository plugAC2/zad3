import React, { useState } from 'react';

const TaskEditModal = ({taskEdit, onSave, onCancel }) => {
    const [title, setTitle] = useState(taskEdit.title);
    const [task, setTask] = useState(taskEdit.task);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleSave = () => {
        const updatedBook = {
            id:taskEdit.id,
            title:title,
            task: task };
        onSave(updatedBook);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit task</h2>
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
                <label>task:</label>
                <input type="text" value={task} onChange={handleTaskChange} />
                <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TaskEditModal;
