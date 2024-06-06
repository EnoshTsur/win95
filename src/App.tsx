import { ThemeProvider } from 'styled-components'
import windows95Theme from './theme';
import useClockUpdate from 'hooks/useClockUpdate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider, QueryClient } from 'react-query';
import ScreenWrapper from 'components/ScreenWrapper/ScreenWrapper';
import { MemoryRouter } from 'react-router-dom';

const client = new QueryClient()

function App() {
  
  useClockUpdate()

  return (
    <QueryClientProvider client={client}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={windows95Theme}>
          <MemoryRouter>
            <ScreenWrapper />
          </MemoryRouter>
        </ThemeProvider>
      </DndProvider>
    </QueryClientProvider>
  );
}

export default App;
