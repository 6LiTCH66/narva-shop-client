import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import DrawerNavigation from "./navigation/DrawerNavigation";
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
    // useReactQueryDevTools(queryClient);
    const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
          <NavigationContainer>
              <DrawerNavigation/>
          </NavigationContainer>
      </QueryClientProvider>
  );
}


