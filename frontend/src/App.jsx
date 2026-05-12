import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './context/SocketContext';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <BrowserRouter>
    <SocketProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1c1c30',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize: '14px',
            maxWidth: '380px',
          },
          success: { iconTheme: { primary: '#34d399', secondary: '#1c1c30' } },
          error:   { iconTheme: { primary: '#f87171', secondary: '#1c1c30' } },
          duration: 4000,
        }}
      />
    </SocketProvider>
  </BrowserRouter>
);

export default App;
