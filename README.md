# Employee tracker

Trackminster is an advanced and comprehensive web application designed to assist employers in effectively managing and overseeing their employees' daily work activities. This tool offers a range of features to ensure seamless tracking and management of employee tasks.

**Key Features of Trackminster**:

*Task Monitoring*:

Administrators can assign and monitor tasks in real-time, ensuring that employees are on track with their responsibilities.
The system provides detailed insights into task progress, completion status, and time spent on each activity.
Graphical Reports:

it generates comprehensive graphical reports that offer a clear visualization of employee performance and productivity.
These reports can be customized to display various metrics, such as task completion rates, time management, and overall efficiency.
Administrators can use these insights to make informed decisions and identify areas for improvement.
User Account Management:

The application allows administrators to manage user accounts efficiently, including adding, removing, and modifying user roles and permissions.
This feature ensures that each employee has access to the relevant tools and resources needed for their specific role.
Real-Time Notifications:

Employees and administrators receive real-time notifications about task updates, deadlines, and important announcements.
This helps in maintaining clear and timely communication within the team.
Data Security:

It also prioritizes data security by implementing robust encryption and access control measures.
Employers can be assured that sensitive information is protected from unauthorized access.
User-Friendly Interface:

The application is designed with a user-friendly interface, making it easy for both administrators and employees to navigate and utilize its features.
The intuitive design reduces the learning curve and enhances user experience.
Integration Capabilities:

It can be integrated with other existing systems and tools used by the organization, ensuring a seamless workflow.
This feature enhances the application's versatility and adaptability to different business environments.
Scalability:

The tool is scalable to accommodate the growing needs of an organization, whether it’s a small business or a large enterprise.
Trackminster can handle an increasing number of users and tasks without compromising performance.
## Features

1. **Admin Login**: Administrators can log in with their username and password to access the admin dashboard and perform administrative tasks.

2. **Employee Management**: Administrators can add employees to the system by providing necessary details such as Name, Mail ID, Contact Number, Department, Joining Date, and Password. This feature enables easy management of employee accounts.

3. **Role-Based Access**: Both administrators and employees can log in using the same URL but will be directed to their respective dashboards based on their roles. Administrators will have access to the admin dashboard, while employees will have access to their personalized employee dashboard.

4. **Employee Task Logging**: Employees can log their daily tasks, including breaks, meetings, and work activities. By clicking the "Add Task" button, employees can fill out a form with fields such as Task Description, Task Type (Break, Meeting, or Work), Start Time, and Time taken to complete the task in minutes.

5. **Multiple Tasks per Day**: Employees can add multiple tasks for a given day. However, they can only add tasks for the current day or past dates.

6. **Employee Dashboard**: The employee dashboard provides graphical information about the employee's tasks. It includes two pie charts—one for the current day and another for the previous day. The pie charts display data for break, meeting, and work activities. Additionally, a stacked bar chart shows three bars representing "Not Working" (including breaks), "Working" (including work tasks), and "Meeting" (including meetings). The stacked bar chart represents weekly data.

7. **Admin Dashboard**: The admin dashboard displays a list of all employees. When the admin clicks on any employee's name, both the pie chart and stacked bar chart for that employee will be visible. This allows administrators to analyze and compare the tasks and work patterns of different employees.

8. **Date Filtering**: Both employees and administrators can filter the data based on a selected date. When a date is selected, the pie chart for that specific date and all the tasks recorded on that date will be shown. This feature allows for detailed analysis of employee activities on specific days.

9. **Employee Deactivation**: Administrators have the authority to deactivate an employee. Once an employee is deactivated, they will no longer be able to log in or add any tasks. This feature ensures control and management of active employee accounts.

10. **Profile Update**: Employees can update their profiles and passwords through the profile section. They can modify details such as their name, contact number, department, and password. However, the email ID cannot be changed.

## Technologies Used

This application is built using the following technologies:

- **Front-end**: HTML, CSS, JavaScript, React.js
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Charts**: Chart.js or any other suitable charting library
- **Deployment**: Docker, Kubernetes

## Getting Started

To set up the application locally, please follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/trackminster.git
```

2. Install the required dependencies:

```bash
cd Employee-Daily-Activity-Tracker
npm install
```

3. Set up the environment variables:

   - Create a `.env` file in the root directory of the project.
   - Define the necessary environment variables such as database connection URL, JWT