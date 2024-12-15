import React, { useState, useEffect } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

const TaskListManager = () => {
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [tableInstance, setTableInstance] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "To Do",

            });

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos");
                const data = await response.json();
                const mappedTasks = data.slice(0, 20).map((task) => ({
                    id: task.id,
                    title: task.title,
                    description: "", // Placeholder since API doesn't provide descriptions
                    status: task.completed ? "Done" : "To Do",
                }));
                setTasks(mappedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    // Initialize Tabulator
    useEffect(() => {
        const table = new Tabulator("#task-table", {
            layout: "fitColumns",
            columns: [
                { title: "Task ID", field: "id", hozAlign: "center", width: 100 },
                { title: "Title", field: "title", editor: "input" },
                { title: "Description", field: "description", editor: "textarea" },
                {
                    title: "Status",
                    field: "status",
                    editor: "select",
                    editorParams: { values: ["To Do", "In Progress", "Done"] },
                },
                {
                    title: "Actions",
                    formatter: function (cell) {
                        let deleteButton = document.createElement("button");
                        deleteButton.innerHTML = "X";
                        deleteButton.style.backgroundColor = "red";
                        deleteButton.style.color = "white";
                        deleteButton.style.border = "none";
                        deleteButton.style.padding = "5px 10px";
                        deleteButton.style.cursor = "pointer";
                        deleteButton.onclick = () => {
                            const rowData = cell.getRow().getData();
                            deleteTask(rowData.id);
                        };
                        return deleteButton;
                    },
                    width: 100,
                    hozAlign: "center",
                },
            ],
        });

        setTableInstance(table);
        return () => table.destroy();
    }, []);

    // Update table data and filtering
    useEffect(() => {
        if (tableInstance) {
            const filteredTasks =
                filterStatus === "All"
                    ? tasks
                    : tasks.filter((task) => task.status === filterStatus);

            tableInstance.setData(filteredTasks);
        }
    }, [tasks, filterStatus, tableInstance]);

    // Add a new task
    const addTask = () => {
        const newTaskWithId = { ...newTask, id: tasks.length + 1 }; // Ensure a unique ID
        setTasks((prevTasks) => [...prevTasks, newTaskWithId]);
        setIsModalOpen(false); // Close the modal after adding the task
        setNewTask({ title: "", description: "", status: "To Do" }); // Reset form
    };

    // Delete a task
    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Only delete the specific task by ID
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task List Manager</h1>

            <div className="mb-4 flex items-center gap-4">
                <button
                    className="btn btn-success"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Task
                </button>
                <select
                    className="border px-4 py-2 rounded"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-red-500 bg-opacity-50 flex justify-center items-center">
                <div className="bg-red-100 p-6 rounded shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            className="border px-4 py-2 w-full"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Description</label>
                        <textarea
                            className="border px-4 py-2 w-full"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Status</label>
                        <select
                            className="border px-4 py-2 w-full"
                            value={newTask.status}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-warning"
                            onClick={addTask}
                        >
                            Add Task
                        </button>
                        <button
                            style={{ backgroundColor: 'red' }}
                            className="text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            
            )}

            <div id="task-table"></div>
        </div>
    );
};

export default TaskListManager;
