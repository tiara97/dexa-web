import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm transition-colors font-medium"
        >
          <Home className="w-5 h-5" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
