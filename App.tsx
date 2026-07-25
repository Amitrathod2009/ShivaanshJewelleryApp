import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens/SplashScreen';

export default function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </QueryClientProvider>
    </Provider>
  );
}
