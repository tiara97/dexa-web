import dayjs from "dayjs";
import { Eye, X } from "lucide-react";
import React from "react";
import { Pagination } from "../../../components/ui/Pagination";
import { Attendance, AttendanceStatus } from "../../../types";

interface IProps {
  attendances: Attendance[];
  filterDate: string;
  filterStatus: string;
  handleClickPhoto: (url: string) => void;
  handleClosePhoto: () => void;
  handleFilter: (e: React.FormEvent<HTMLFormElement>) => void;
  handleReset: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  limit: number;
  loading: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  page: number;
  selectedPhoto: string | null;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MonitoringComponent: React.FC<IProps> = (props) => {
  const {
    attendances,
    filterDate,
    filterStatus,
    handleClickPhoto,
    handleClosePhoto,
    handleFilter,
    handleReset,
    limit,
    loading,
    meta,
    page,
    selectedPhoto,
    setLimit,
    setPage,
  } = props;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Monitoring Absensi
          </h2>
        </div>
        <form
          className="flex space-x-2 w-full sm:w-auto"
          onSubmit={handleFilter}
        >
          <input
            name="date"
            type="date"
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
            defaultValue={filterDate}
          />
          <select
            name="status"
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
            defaultValue={filterStatus}
          >
            <option value="">Semua Status</option>
            <option value="1">In Time</option>
            <option value="2">Late</option>
            <option value="3">Alfa</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Filter
          </button>
          {(filterDate || filterStatus) && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Reset
            </button>
          )}
        </form>
      </div>

      <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Waktu Submit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Nama Karyawan
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Bukti Foto
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-slate-500 text-sm"
                  >
                    Loading data...
                  </td>
                </tr>
              ) : attendances.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-slate-500 text-sm"
                  >
                    Belum ada data absensi yang masuk.
                  </td>
                </tr>
              ) : (
                attendances.map((att) => (
                  <tr
                    key={att.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {dayjs(att.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {att.employeeName || "Pegawai"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {att.status === AttendanceStatus.Intime ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200 shadow-sm">
                          In Time
                        </span>
                      ) : att.status === AttendanceStatus.Late ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm">
                          Late
                        </span>
                      ) : att.status === AttendanceStatus.Alfa ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-200 shadow-sm">
                          Alfa
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-200 shadow-sm">
                          Unknown
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        onClick={() => handleClickPhoto(att.photoUrl || "")}
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Lihat Foto</span>
                      </button>
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

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={handleClosePhoto}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-800">
                Bukti WFH
              </h3>
              <button
                onClick={handleClosePhoto}
                className="text-slate-400 hover:text-slate-600 p-1 bg-white rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex justify-center bg-slate-100">
              <img
                src={selectedPhoto}
                alt="Bukti Absensi"
                className="max-w-full max-h-[70vh] object-contain rounded shadow-sm border"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
