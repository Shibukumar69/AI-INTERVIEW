import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-20 bg-white dark:bg-slate-950 rounded-[3rem] shadow-ia-card dark:shadow-xl max-w-2xl mx-auto mt-10 border border-[#e5dfeb] dark:border-white/10 transition-colors duration-300">
      <h1 className="text-9xl font-black text-purple-200 dark:text-slate-800 font-heading">404</h1>
      <h2 className="text-2xl font-extrabold text-[#191522] dark:text-slate-100 mt-4 uppercase tracking-tight font-heading">Page Not Found</h2>
      <p className="text-[#706879] dark:text-slate-400 mt-2 mb-8">The interview module you're looking for doesn't exist.</p>
      <Link to="/" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-2xl font-extrabold shadow-md transition-all">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
