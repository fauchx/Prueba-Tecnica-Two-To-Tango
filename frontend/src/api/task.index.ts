import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const tasksFilePath = path.join(process.cwd(), 'tasks.json'); 

const readTasksFromFile = () => {
  const fileContent = fs.readFileSync(tasksFilePath, 'utf-8');
  return JSON.parse(fileContent);
};

const writeTasksToFile = (tasks: any) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = readTasksFromFile();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error obteniendo tareas:', error);
      res.status(500).json({ message: 'Error al obtener tareas' });
    }
  } else if (req.method === 'POST') {
    try {
      const newTask = { id: Date.now(), ...req.body }; 
      const tasks = readTasksFromFile();
      tasks.push(newTask);
      writeTasksToFile(tasks);
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creando tarea:', error);
      res.status(500).json({ message: 'Error al crear tarea' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
