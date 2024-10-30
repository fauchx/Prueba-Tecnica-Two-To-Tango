import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [task, setTask] = useState<Task | null>(null); 

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks`);
      const foundTask = response.data.find((t: Task) => t.id.toString() === id); 
      setTask(foundTask || null); 
    } catch (error) {
      console.error('Error al obtener la tarea:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

 

  return (
    <div>
      {task ? (
        <div>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>Estado: {task.status}</p>
          <button>Editar Tarea</button>
        </div>
      ) : (
        <p>Cargando tarea...</p>
      )}
    </div>
  );
};

export default TaskDetail;
