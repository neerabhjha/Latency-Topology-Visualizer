'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from 'next-themes';



export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"          // puts "dark" or "light" on <html>
            defaultTheme="system"      // or "dark"
            enableSystem
            disableTransitionOnChange
        >
            <Provider store={store}>{children}</Provider>
        </ThemeProvider>
    );
}