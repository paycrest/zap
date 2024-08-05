"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}

      <ToastContainer
        position="bottom-right"
        theme="dark"
        stacked
        pauseOnHover
        pauseOnFocusLoss
      />
    </ThemeProvider>
  );
}
