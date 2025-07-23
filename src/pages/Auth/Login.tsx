import { FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/Toast";
import AuthService from "../../services/auth.service";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await AuthService.loginUser(form);
    setLoading(false);

    if (res?.token) {
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      showToast("success", `${res.user.name} logged in successfully`);
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="form-input"
        />
      </div>

      {/* Password with toggle icon */}
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
            Password
          </label>
          <a href="#" className="text-sm text-gray-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="form-input pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <Button
          type="submit"
          variant="secondary"
          icon={<FiLogIn />}
          iconPosition="right"
          isLoading={loading}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Login;
