import React from 'react';

const SignIn: React.FC = () => {
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
      <div className="relative z-10 bg-white p-10 md:p-12 w-full max-w-[440px] shadow-2xl">
        <h2 className="text-3xl font-black text-center text-black mb-10 uppercase tracking-tighter">
          Sign In
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="sr-only">Email</label>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-5 py-4 text-xs font-bold border border-gray-300 text-black placeholder-black focus:outline-none focus:border-netkin-red transition-colors"
            />
          </div>
          <div>
            <label className="sr-only">Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-5 py-4 text-xs font-bold border border-gray-300 text-black placeholder-black focus:outline-none focus:border-netkin-red transition-colors"
            />
          </div>

          <button className="w-full bg-netkin-red text-white font-bold text-xs uppercase py-4 tracking-widest hover:bg-red-700 transition-colors shadow-md">
            Sign In
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

        <button className="w-full bg-[#3b5998] text-white font-bold text-xs uppercase py-4 tracking-widest hover:bg-[#2d4373] transition-colors shadow-md mb-10">
          Sign in with Facebook
        </button>

        <div className="text-center">
          <p className="text-[10px] md:text-xs text-black uppercase tracking-wide font-medium">
            New user? <a href="#" className="font-black text-black hover:underline ml-0.5">REGISTER</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;