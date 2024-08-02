import axios from "axios";

const API = axios.create({
  baseURL: "https://trackminster-server.duckdns.org/",
});

// auth
export const login = (user) => API.post("/user/auth", user);

// employee list
export const getEmployees = () => API.get("/user/employees");
// employee by ID
export const getEmployee = (id) => API.get(`/user/${id}`);

// update employee
export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);

// task creation
export const createTask = (task, token) =>
  API.post(
    "/task/create",
    task,
    { headers: { Authorization: `Bearer ${token}` } },
    { withCredentials: true },
  );

// pie chart
export const pieData = (data) => API.post("/task/pie", data);
// bar graph
export const barData = (data) => API.post("/task/bar", data);

// get tasks
export const getTasks = (id) => API.get(`/user/tasks/${id}`);

// update task
export const editTask = (id, task) => API.patch(`/task/${id}`, task);

// delete task
export const deleteTask = (id) => API.delete(`/task/${id}`);

// filter tasks
export const filterTasks = (filter) => API.post("/task/date", filter);