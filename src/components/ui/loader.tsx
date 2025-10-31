"use client";

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-40 z-50">

      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-sm mt-4">{text}</p>
    </div>
  );
}
