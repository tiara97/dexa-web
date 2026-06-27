import React, { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { api } from "../../../lib/api";
import { AbsensiComponent } from "../component/AbsensiComponent";

export const AbsensiContainer: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Dayjs>(dayjs());
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [isCheckingAttendance, setIsCheckingAttendance] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if already submitted today
  useEffect(() => {
    const checkAttendance = async () => {
      const userStr = localStorage.getItem("current_user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const attendance = await api.getAttendanceById(user.id);
          if (attendance) {
            setHasSubmittedToday(true);
          } else {
            setHasSubmittedToday(false);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsCheckingAttendance(false);
        }
      } else {
        setIsCheckingAttendance(false);
      }
    };
    checkAttendance();
  }, []);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Attach stream to video element when camera is opened
  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraOpen(true);
      setPhotoPreview(null);
    } catch (err) {
      alert(
        "Tidak dapat mengakses kamera. Pastikan browser Anda memiliki izin untuk menggunakan kamera.",
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPhotoPreview(dataUrl);
        stopCamera();
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        if (isCameraOpen) stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!photoPreview) {
      alert("Harap unggah atau ambil foto bukti bekerja.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert base64 Data URL to Blob
      const res = await fetch(photoPreview);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append("photo", blob, `attendance-${dayjs().valueOf()}.jpg`);

      await api.submitAttendance(formData);

      setIsTransitioning(true);
      setPhotoPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => {
        setIsTransitioning(false);
        setHasSubmittedToday(true);
      }, 1500);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Gagal mengirim absensi",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AbsensiComponent
      capturePhoto={capturePhoto}
      currentDateTime={currentDateTime}
      fileInputRef={fileInputRef}
      handlePhotoUpload={handlePhotoUpload}
      handleSubmit={handleSubmit}
      hasSubmittedToday={hasSubmittedToday}
      isCheckingAttendance={isCheckingAttendance}
      isCameraOpen={isCameraOpen}
      isSubmitting={isSubmitting}
      isTransitioning={isTransitioning}
      photoPreview={photoPreview}
      startCamera={startCamera}
      stopCamera={stopCamera}
      videoRef={videoRef}
    />
  );
};
