import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
      {/* Card de login */}
      <div className="bg-[#101726] p-8 rounded-2xl shadow-lg w-[90%] sm:w-[400px]">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Inicia sesión en tu cuenta
        </h1>
        <p className="text-gray-400 text-center mb-6">Bienvenido</p>

        {/* Aquí va el formulario */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
