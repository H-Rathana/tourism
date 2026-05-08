import AppRoutes from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';
function App() {
  return(
    <Toaster
  position="bottom-left"
  reverseOrder={false}
/>,
    <AppRoutes />
  );
}

export default App;