import { ThemeProvider } from 'styled-components'
import windows95Theme from './theme';
import StartContainer from './components/StartContainer/StartContainer';
import MainScreen from 'components/MainScreen/MainScreen';
import useClockUpdate from 'hooks/useClockUpdate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  
  useClockUpdate()

  return (
    <DndProvider backend={HTML5Backend}>
    <ThemeProvider theme={windows95Theme}>
      <MainScreen />
      <StartContainer />
    </ThemeProvider>
    </DndProvider>
  );
}

export default App;
