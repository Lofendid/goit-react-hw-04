import { Toaster } from 'react-hot-toast';

export default function ErrorMessage() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: 'red',
          color: 'white',
        },
      }}
    />
  );
}
