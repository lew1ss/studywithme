import { useState } from 'react'
import AuthModal from './components/AuthModal';

function App() {
  const [ showAuth, setShowAuth ] = useState(true);
  const [ mode, setMode ] = useState('login');

  return (
    <>
      {showAuth && (
        <AuthModal
          mode={mode}
          setMode={setMode}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  )
}

export default App;
