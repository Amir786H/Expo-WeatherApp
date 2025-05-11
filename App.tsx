import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import AppNavigation from 'navigation/appNavigation';
import { GlobalProvider } from 'context/GlobalProvider';

export default function App() {
  return (
    <>
      {/* <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" /> */}
      <GlobalProvider>
        <AppNavigation />
      </GlobalProvider>
    </>
  );
}
