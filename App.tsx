
import './global.css';
import AppNavigation from 'navigation/appNavigation';
import { GlobalProvider } from 'context/GlobalProvider';

export default function App() {
  console.log('App.tsx');
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
