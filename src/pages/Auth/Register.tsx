import { useState } from "react";
import { Role } from "../../models/users/role.enum";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { showToast } from "../../utils/Toast";
import Button from "../../components/Button";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.User,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await AuthService.registerUser(form);
    setLoading(false);

    if (res) {
      showToast("success", res.message);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          id="name"
          placeholder="Enter your full name"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 
            bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 
            dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 
            focus:border-blue-400 dark:focus:border-blue-400 
            focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 
            bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 
            dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 
            focus:border-blue-400 dark:focus:border-blue-400 
            focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="role"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          Role
        </label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="form-input"
        >
          <option value={Role.User}>User</option>
          <option value={Role.Admin}>Admin</option>
        </select>
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          Password
        </label>
        <div className="relative">
        <input
           type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          id="password"
          placeholder="Create a password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 
            bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 
            dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 
            focus:border-blue-400 dark:focus:border-blue-400 
            focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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

      {/* Submit Button */}

      <div className="mt-6">
        <Button
          type="submit"
          variant="secondary"
          icon={<FiLogIn />}
          iconPosition="right"
          isLoading={loading}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default Register;
