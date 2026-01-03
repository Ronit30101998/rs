import { useState } from 'react';
import { X, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'signin' | 'signup';
type AuthMethod = 'email' | 'phone';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithEmail, signUpWithEmail, signInWithPhone, signUpWithPhone } = useAuth();

  const [mode, setMode] = useState<AuthMode>('signin');
  const [method, setMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      let result;

      if (method === 'email') {
        if (mode === 'signin') {
          result = await signInWithEmail(email, password);
        } else {
          result = await signUpWithEmail(email, password);
        }
      } else {
        if (mode === 'signin') {
          result = await signInWithPhone(phone, password);
        } else {
          result = await signUpWithPhone(phone, password);
        }
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        if (mode === 'signup') {
          setSuccess('Account created successfully! Please check your email to verify your account.');
        } else {
          setSuccess('Signed in successfully!');
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPhone('');
    setPassword('');
    setError(null);
    setSuccess(null);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  const switchMethod = (newMethod: AuthMethod) => {
    setMethod(newMethod);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => switchMethod('email')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              method === 'email'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mail className="w-5 h-5" />
            Email
          </button>
          <button
            onClick={() => switchMethod('phone')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              method === 'phone'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Phone className="w-5 h-5" />
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {method === 'email' ? (
            <div className="mb-4">
              <label className="block text-gray-900 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-600"
                placeholder="your@email.com"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-900 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-600"
                placeholder="+1234567890"
              />
              <p className="text-sm text-gray-500 mt-1">Include country code (e.g., +1 for US)</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-900 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-600"
              placeholder="••••••••"
            />
            <p className="text-sm text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
