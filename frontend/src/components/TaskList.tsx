import { Task } from '../utils/types'; 

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => (
  <ul>
    {tasks.map(task => (
      <li key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.dueDate}</p>
        <p>{task.status}</p>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default TaskList;
