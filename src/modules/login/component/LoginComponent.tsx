import { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Eye, EyeOff } from "lucide-react";

interface IProps {
  error: string;
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  nip: string;
  password: string;
  setNip: (val: string) => void;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

export const LoginComponent: FC<IProps> = (props) => {
  const {
    error,
    handleLogin,
    loading,
    nip,
    password,
    setNip,
    setPassword,
    showPassword,
    setShowPassword,
  } = props;
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Login to Dexa WFH
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Silakan masuk menggunakan akun Anda
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                {error}
              </div>
            )}

            <Input
              label="Nomor Induk Pegawai (NIP)"
              type="text"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              placeholder="Masukkan NIP"
              disabled={loading}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                disabled={loading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 flex items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-center text-slate-500">
              Mock Default Accounts:
              <br />
              Admin:{" "}
              <span className="font-semibold">NIP: 10001 / pass: password</span>
              <br />
              Employee:{" "}
              <span className="font-semibold">
                NIP: 10002 - 10011 / pass: password
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
