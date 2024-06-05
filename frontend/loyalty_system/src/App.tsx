import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/landing/landing';
import SignIn from './pages/signIn/signIn';
import Header from './components/general/header/header';
import SignUp from './pages/signup/signup';
import Account from './pages/account/account';
import ScanCode from './pages/scanCode/scanCode';
import CountPoints from './pages/countPoints/countPoints';
import { ProtectedRoute } from './auth';
import ManagerRoute from './auth/managerRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={
          <>
            <Header />
            <Routes>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="scan" element={<ManagerRoute><ScanCode /></ManagerRoute>} />
              <Route path="count" element={<ManagerRoute><CountPoints /></ManagerRoute>} />
            </Routes>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
