import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string; dueDate: string; status: string }) => void;
  initialData?: { title: string; description: string; dueDate: string; status: string };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [status, setStatus] = useState(initialData?.status || 'PENDING');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
