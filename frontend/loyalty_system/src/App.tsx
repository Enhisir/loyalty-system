import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/landing/landing';
import SignIn from './pages/signIn/signIn';
import Header from './components/general/header/header';
import SignUp from './pages/signup/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="signin" element={<>
          <Header />
          <main>
            <SignIn />
          </main>
        </>} />
        <Route path="signup" element={<>
          <Header />
          <main>
            <SignUp />
          </main>
        </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
