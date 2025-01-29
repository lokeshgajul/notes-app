import Main from "./components/Auth/Main";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <NotesProvider>
            <Main />
          </NotesProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
