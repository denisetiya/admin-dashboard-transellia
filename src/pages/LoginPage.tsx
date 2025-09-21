import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Redirect to dashboard after successful login
    navigate('/dashboard');
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};
