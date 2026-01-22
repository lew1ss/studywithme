import { useState } from "react";

function LoginForm({ switchToRegister, onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            localStorage.setItem('token', data.token);

            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button disabled={loading}>
                {loading ? 'Giriş yapılıyor...' : 'Login'}
            </button>

            <p>
                Hesabın yok mu?
                <span onClick={switchToRegister}>Kayıt Ol</span>
            </p>
        </form>
    );
}