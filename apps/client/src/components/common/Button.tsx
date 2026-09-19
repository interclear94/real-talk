import { type ButtonHTMLAttributes } from "react";

export default function Button({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 whitespace-nowrap ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
