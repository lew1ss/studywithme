import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthModal({ mode, setMode }) {
    return (
        <div className="modal">
            {mode === 'login' ? (
                <LoginForm switchToRegister={() => setMode('register')} />
            ) : (
                <RegisterForm switchToLogin={() => setMode('login')} />
            )}
        </div>
    );
}

export default AuthModal;