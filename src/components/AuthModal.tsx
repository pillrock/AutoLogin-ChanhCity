import React, { useState } from 'react';
import { FaTimes, FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, email: string, password: string) => void;
  onForgotPassword: (email: string) => void;
  onSocialLogin: (provider: 'google' | 'facebook' | 'github') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  onRegister,
  onForgotPassword,
  onSocialLogin 
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isForgotPassword) {
      if (!email) {
        setError('Vui lòng nhập email của bạn');
        return;
      }
      onForgotPassword(email);
      setSuccess('Hướng dẫn khôi phục mật khẩu đã được gửi đến email của bạn');
      return;
    }

    if (isLogin) {
      if (!username || !password) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }
      onLogin(username, password);
    } else {
      if (!username || !email || !password) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }
      if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }
      onRegister(username, email, password);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'github') => {
    setError('');
    onSocialLogin(provider);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/90 border-2 border-neon-blue rounded-xl p-8 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-neon-blue mb-6 text-center">
          {isForgotPassword ? 'Khôi Phục Mật Khẩu' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username (not shown for forgot password) */}
          {!isForgotPassword && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên đăng nhập"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-neon-blue/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-neon-blue/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
            />
          </div>

          {/* Password (not shown for forgot password) */}
          {!isForgotPassword && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-neon-blue/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
              />
            </div>
          )}

          {/* Error/Success message */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm text-center">{success}</div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors"
          >
            {isForgotPassword ? 'Gửi Yêu Cầu' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}
          </button>

          {/* Forgot password link (only shown in login mode) */}
          {isLogin && !isForgotPassword && (
            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="w-full text-center text-sm text-neon-blue hover:text-neon-blue/80"
            >
              Quên mật khẩu?
            </button>
          )}

          {/* Back to login (only shown in forgot password mode) */}
          {isForgotPassword && (
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(false);
                setError('');
                setSuccess('');
              }}
              className="w-full text-center text-sm text-neon-blue hover:text-neon-blue/80"
            >
              Quay lại đăng nhập
            </button>
          )}

          {/* Toggle login/register (not shown in forgot password mode) */}
          {!isForgotPassword && (
            <div className="text-center text-gray-400">
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                className="text-neon-blue hover:text-neon-blue/80"
              >
                {isLogin ? 'Đăng Ký' : 'Đăng Nhập'}
              </button>
            </div>
          )}

          {/* Social login (only shown in login/register mode) */}
          {!isForgotPassword && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/90 text-gray-400">Hoặc đăng nhập với</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-black/50 text-sm font-medium text-gray-400 hover:bg-gray-800/50 hover:text-white"
                >
                  <FaGoogle className="text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-black/50 text-sm font-medium text-gray-400 hover:bg-gray-800/50 hover:text-white"
                >
                  <FaFacebook className="text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-black/50 text-sm font-medium text-gray-400 hover:bg-gray-800/50 hover:text-white"
                >
                  <FaGithub className="text-xl" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal; 