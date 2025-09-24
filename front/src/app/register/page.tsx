import RegisterForm from "@/components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
      {/* Card de registro */}
      <div className="bg-[#101726] p-8 rounded-2xl shadow-lg w-[90%] sm:w-[500px]">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Crea tu cuenta
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Completa el formulario para registrarte
        </p>

        {/* Formulario de registro */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

