import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login validation
    if (!email || !password) {
      toast.error('Please enter email and password');
      return false;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      phone: '+62 812 3456 7890'
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    toast.success('Login successful!');
    navigate('/');
    return true;
  };

  const signup = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    // Mock signup validation
    if (!name || !email || !phone || !password) {
      toast.error('Please fill in all fields');
      return false;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock successful signup
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    toast.success('Account created successfully!');
    navigate('/');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
