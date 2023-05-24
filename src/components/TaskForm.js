import React, {useState} from "react";
import api from "../api";

export default function () {

    const initialTask = {
        title: '',
        task: ''
    }

    const [task, setTask] = useState(initialTask);

    const handleChange = e => {
        if (e.target.id === "title") {
            setTask(prevState => {
                return {
                    title: e.target.value,
                    task: prevState.task
                }
            })
        } else if (e.target.id === "task") {
            setTask(prevState => {
                return {
                    title: prevState.title,
                    task: e.target.value
                }
            })
        }
    }

    const handleButton = e => {
        console.log(task.title);
        console.log(task.task);
    }

    const submitForm = async e => {
        e.preventDefault();

        try {
            await api.post('/tasks', { title:task.title, task:task.task });
            setTask({
                title:'',
                task:''
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={e => submitForm(e)}>
                Nazwa:
                <input id="title" type="text" value={task.title} onChange={e => handleChange(e)} required/>
                <br/>
                Zadanie:
                <input id="task" type="text" value={task.task} onChange={e => handleChange(e)} required/>
                <button type="submit" onClick={e => {
                    handleButton(e)
                }}>Dodaj
                </button>
            </form>
        </div>
    )
}