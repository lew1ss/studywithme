function RegisterForm({ switchToLogin }) {
    return (
        <>
            <h2>Register</h2>
            <input placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Register</button>

            <p>
                Zaten hesabın var mı?
                <span onClick={switchToLogin}>Giriş Yap</span>
            </p>
        </>
    );
}

export default RegisterForm;