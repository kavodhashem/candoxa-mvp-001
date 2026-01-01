
import React, { useState, useEffect } from 'react';
import { UserState } from './types';
import SignupWizard from './components/SignupWizard';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Toast from './components/Toast';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    name: "Candoxa User",
    email: "",
    wallet: "",
    points: 0,
    memories: 0,
    referralCode: "",
    isLoggedIn: false,
    links: [],
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (updatedUser: UserState) => {
    setUser({ ...updatedUser, isLoggedIn: true });
    showToast("Welcome to the Memory Layer!");
  };

  const handleLogoClick = () => {
    if (user.isLoggedIn) {
      showToast("Redirecting to your Dashboard...");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {toastMessage && <Toast message={toastMessage} />}
      
      {user.isLoggedIn && (
        <Header user={user} onLogoClick={handleLogoClick} />
      )}

      <main className={`flex-1 flex flex-col items-center ${user.isLoggedIn ? 'p-4 md:p-8' : 'justify-center p-4'}`}>
        {!user.isLoggedIn ? (
          <SignupWizard 
            onComplete={handleLogin} 
            showToast={showToast} 
          />
        ) : (
          <Dashboard 
            user={user} 
            setUser={setUser} 
            showToast={showToast} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
