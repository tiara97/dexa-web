import React, { FC } from "react";
import { Dayjs } from "dayjs";
import "dayjs/locale/id";
import { Button } from "../../../components/ui/Button";
import { Camera, Upload, Video, XCircle } from "lucide-react";

interface IProps {
  capturePhoto: () => void;
  currentDateTime: Dayjs;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  hasSubmittedToday: boolean;
  isCheckingAttendance: boolean;
  isCameraOpen: boolean;
  isSubmitting: boolean;
  isTransitioning: boolean;
  photoPreview: string | null;
  startCamera: () => void;
  stopCamera: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const AbsensiComponent: FC<IProps> = (props) => {
  const {
    capturePhoto,
    currentDateTime,
    fileInputRef,
    handlePhotoUpload,
    handleSubmit,
    hasSubmittedToday,
    isCheckingAttendance,
    isCameraOpen,
    isSubmitting,
    isTransitioning,
    photoPreview,
    startCamera,
    stopCamera,
    videoRef,
  } = props;

  function AlreadySubmitComponent() {
    return (
      <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Absensi Selesai
        </h3>
        <p className="text-slate-600">
          Anda sudah melakukan absensi hari ini. Terima kasih dan selamat
          bekerja!
        </p>
      </div>
    );
  }

  function SubmitAttendanceComponent() {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-800 mb-1">
                Waktu Saat Ini
              </p>
              <p className="text-3xl font-bold text-blue-900">
                {currentDateTime.locale("id").format("HH:mm:ss")}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {currentDateTime.locale("id").format("dddd, D MMMM YYYY")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bukti Foto WFH
              </label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
              />
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={startCamera}
                  className="flex items-center justify-center space-x-2 border-slate-300 bg-white hover:bg-slate-50 py-3"
                >
                  <Video className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-600">Buka Kamera Web</span>
                </Button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs">
                    ATAU
                  </span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center space-x-2 border-dashed border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 py-3"
                >
                  <Upload className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-600">Unggah File Foto</span>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="h-full min-h-[240px] border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center bg-slate-50 overflow-hidden relative">
              {isCameraOpen ? (
                <div className="w-full h-full flex flex-col relative bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex justify-center space-x-4">
                    <button
                      onClick={capturePhoto}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105"
                      title="Ambil Foto"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                    <button
                      onClick={stopCamera}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105"
                      title="Tutup Kamera"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <Camera className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    Preview foto atau kamera
                    <br />
                    akan muncul di sini
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!photoPreview || isSubmitting || isCameraOpen}
            className="w-full md:w-auto px-8"
          >
            {isSubmitting ? "Memproses..." : "Submit Absensi"}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 md:p-8 min-h-[400px]">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
          Form Absensi WFH
        </h2>

        {isCheckingAttendance ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-400 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-medium text-slate-700">
              Mengecek status absensi...
            </h3>
          </div>
        ) : isTransitioning ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-medium text-slate-700">
              Menyimpan data absensi...
            </h3>
            <p className="text-sm text-slate-500 mt-2">Mohon tunggu sebentar</p>
          </div>
        ) : hasSubmittedToday ? (
          AlreadySubmitComponent()
        ) : (
          SubmitAttendanceComponent()
        )}
      </div>
    </div>
  );
};
