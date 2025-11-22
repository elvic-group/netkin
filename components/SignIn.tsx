import React, { useState } from 'react';

interface SignInProps {
  onLogin?: (email: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
    }

    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
        onLogin(email);
      }
    }, 1000);
  };

  const handleFacebookLogin = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (onLogin) {
            onLogin('facebook-user@example.com');
        }
      }, 800);
  };

  return (
    <div className="relative flex-grow flex items-center justify-center py-32 px-4 w-full min-h-[900px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundPosition: 'center 20%' 
        }} 
      >
        <div className="absolute inset-0 bg-netkin-dark/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-netkin-dark via-transparent to-black/40"></div>
      </div>

      {/* Modal Card */}
      <div className="relative z-10 bg-white p-10 md:p-12 w-full max-w-[440px] shadow-2xl transition-all duration-500">
        <h2 className="text-3xl font-black text-center text-black mb-10 uppercase tracking-tighter">
          {isRegistering ? 'Register' : 'Sign In'}
        </h2>

        {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs font-bold uppercase text-center">
                {error}
            </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only">Email</label>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 text-xs font-bold border border-gray-300 text-black placeholder-black focus:outline-none focus:border-netkin-red transition-colors"
            />
          </div>
          <div>
            <label className="sr-only">Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 text-xs font-bold border border-gray-300 text-black placeholder-black focus:outline-none focus:border-netkin-red transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-netkin-red text-white font-bold text-xs uppercase py-4 tracking-widest hover:bg-red-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                isRegistering ? 'Register Now' : 'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-netkin-red text-[11px] font-medium hover:underline">
            Forgot your email or password?
          </a>
        </div>

        <div className="flex items-center gap-4 my-8">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Or</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>

        <button 
            onClick={handleFacebookLogin}
            className="w-full bg-[#3b5998] text-white font-bold text-xs uppercase py-4 tracking-widest hover:bg-[#2d4373] transition-colors shadow-md mb-10"
        >
          {isRegistering ? 'Sign up with Facebook' : 'Sign in with Facebook'}
        </button>

        <div className="text-center">
          <p className="text-[10px] md:text-xs text-black uppercase tracking-wide font-medium">
            {isRegistering ? 'Already have an account?' : 'New user?'} 
            <button 
                type="button"
                onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                    setEmail('');
                    setPassword('');
                }}
                className="font-black text-black hover:underline ml-1 uppercase"
            >
                {isRegistering ? 'Sign In' : 'REGISTER'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;