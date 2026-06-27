import { useState, useEffect, FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";
import { LoginComponent } from "../component/LoginComponent";

export const LoginContainer: FC = () => {
  const navigate = useNavigate();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userStr = localStorage.getItem("current_user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        navigate(
          user.role === "admin" ? "/admin/dashboard" : "/employee/absensi",
        );
      } catch (e) {
        // invalid JSON
      }
    }
  }, [navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!nip || !password) {
      setError("NIP dan Password wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const response = await api.login(nip, password);

      if (response && response.token && response.user) {
        localStorage.setItem("access_token", response.token);
        localStorage.setItem("current_user", JSON.stringify(response.user));

        navigate(
          response.user.role === "admin"
            ? "/admin/dashboard"
            : "/employee/absensi",
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "NIP atau Password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginComponent
      error={error}
      handleLogin={handleLogin}
      loading={loading}
      nip={nip}
      password={password}
      setNip={setNip}
      setPassword={setPassword}
      setShowPassword={setShowPassword}
      showPassword={showPassword}
    />
  );
};
