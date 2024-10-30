// /pages/api/auth/register.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Aquí deberías realizar la lógica para crear un nuevo usuario en tu backend
    // Por ejemplo, puedes hacer una llamada a tu backend para registrar al usuario

    // Ejemplo de respuesta
    if (username && password) {
      // Aquí deberías insertar el usuario en tu base de datos
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(400).json({ message: 'Username and password are required' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
