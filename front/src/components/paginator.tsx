'use client';

import React from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      {/* Botón Anterior */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded-md text-white ${
          currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        « Anterior
      </button>

      {/* Números de página */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? "bg-blue-500 text-white font-semibold"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded-md text-white ${
          currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        Siguiente »
      </button>
    </div>
  );
};

export default Paginator;
