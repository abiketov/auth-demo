import React, { useState } from 'react';

interface LoginPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isVisible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Handle the login logic here
    console.log('Login with:', username, password);
    onClose(); // Close the popup after submission
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 p-2 bg-gray-500 text-white">Cancel</button>
          <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
