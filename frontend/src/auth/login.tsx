"use client"; 
import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${api}/auth/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso:', data);
        router.push('/'); 
      } else {
        const errorData = await response.json();
        console.error('Error de inicio de sesión:', errorData.message);
        alert('Error de inicio de sesión: ' + errorData.message); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta? 
          <span
            onClick={() => router.push('/register')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
