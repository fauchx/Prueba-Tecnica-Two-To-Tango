import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks(); // Refrescar la lista de tareas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tareas</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
            <button onClick={() => router.push(`/tasks/${task.id}`)}>Ver Detalles</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/create-task')}>Crear Nueva Tarea</button>
    </div>
  );
};

export default TaskList;
