import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Static admin credentials (hardcoded)
const ADMIN_CREDENTIALS = {
  email: 'admin@cityfix.com',
  password: 'Admin@123',
  name: 'Admin User',
  role: 'admin'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('cityfix_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Check if it's admin login (hardcoded)
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const userData = {
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: 'admin'
        };
        localStorage.setItem('cityfix_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, role: 'admin' };
      }

      // For regular users, check localStorage (simulating database)
      const users = JSON.parse(localStorage.getItem('cityfix_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          email: foundUser.email,
          name: foundUser.name,
          role: 'user'
        };
        localStorage.setItem('cityfix_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, role: 'user' };
      }

      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async (userData) => {
    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('cityfix_users') || '[]');
      
      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        return { success: false, error: 'Email already registered' };
      }

      // Add new user
      const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('cityfix_users', JSON.stringify(users));

      // Auto login after signup
      const userForSession = {
        email: newUser.email,
        name: newUser.name,
        role: 'user'
      };
      localStorage.setItem('cityfix_user', JSON.stringify(userForSession));
      setUser(userForSession);
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('cityfix_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};