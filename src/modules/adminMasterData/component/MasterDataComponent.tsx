import React from "react";
import { Employee, Role } from "../../../types";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Pagination } from "../../../components/ui/Pagination";
import { Edit2, Trash2, Plus, X, Search } from "lucide-react";

interface IProps {
  formData: {
    nip: string;
    name: string;
    position: string;
    role: Role;
    password?: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      nip: string;
      name: string;
      position: string;
      role: Role;
      password?: string;
    }>
  >;
  confirmDelete: () => void;
  deleting: boolean;
  editingEmployee: Employee | null;
  employees: Employee[];
  employeeToDelete: Employee | null;
  handleCloseModal: () => void;
  handleOpenModal: (employee?: Employee) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isModalOpen: boolean;
  limit: number;
  loading: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  page: number;
  search: string;
  setEmployeeToDelete: React.Dispatch<React.SetStateAction<Employee | null>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  submitting: boolean;
}

export const MasterDataComponent: React.FC<IProps> = (props) => {
  const {
    confirmDelete,
    deleting,
    editingEmployee,
    employees,
    employeeToDelete,
    formData,
    handleCloseModal,
    handleOpenModal,
    handleSearch,
    handleSubmit,
    isModalOpen,
    limit,
    loading,
    meta,
    page,
    search,
    setEmployeeToDelete,
    setFormData,
    setLimit,
    setPage,
    submitting,
  } = props;

  const isFormValid =
    formData.nip.trim() !== "" &&
    formData.name.trim() !== "" &&
    formData.position.trim() !== "" &&
    (editingEmployee || (formData.password && formData.password.trim() !== ""));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Master Data Karyawan
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama karyawan..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <Button
            onClick={() => handleOpenModal()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Karyawan</span>
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  NIP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Posisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500 text-sm"
                  >
                    Loading data...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500 text-sm"
                  >
                    Belum ada data karyawan.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {emp.nip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {emp.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          emp.role === "admin"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {emp.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(emp)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {emp.role !== "admin" && (
                        <button
                          onClick={() => setEmployeeToDelete(emp)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {meta && (
        <Pagination
          meta={meta}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-bold text-slate-900">
                {editingEmployee ? "Edit Karyawan" : "Tambah Karyawan"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600"
                disabled={submitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Nomor Induk Pegawai (NIP)"
                required
                value={formData.nip}
                onChange={(e) =>
                  setFormData({ ...formData, nip: e.target.value })
                }
                disabled={submitting}
              />
              <Input
                label="Nama Lengkap"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={submitting}
              />
              <Input
                label="Posisi / Jabatan"
                required
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                disabled={submitting}
              />
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Password"
                  type="password"
                  required={!editingEmployee}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.role}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as Role })
                  }
                  disabled={submitting}
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin HRD</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3 border-t mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={submitting || !isFormValid}>
                  {submitting ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {employeeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Hapus Karyawan?
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Apakah Anda yakin ingin menghapus{" "}
                <strong>{employeeToDelete.name}</strong>? Tindakan ini tidak
                dapat dibatalkan.
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEmployeeToDelete(null)}
                  disabled={deleting}
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {deleting ? "Menghapus..." : "Hapus"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
