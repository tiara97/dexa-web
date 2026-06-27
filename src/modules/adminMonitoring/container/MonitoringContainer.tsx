import React, { useState, useEffect } from "react";
import { api } from "../../../lib/api";
import { Attendance } from "../../../types";
import { MonitoringComponent } from "../component/MonitoringComponent";
import dayjs from "dayjs";

export const MonitoringContainer: React.FC = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  const filteredAttendances = attendances;

  const loadAttendances = async (
    pageIndex: number = page,
    pageLimit: number = limit,
    filterDate?: string,
    filterStatus?: string,
  ) => {
    setLoading(true);
    try {
      const { data, meta } = await api.getAttendances(
        pageIndex,
        pageLimit,
        filterDate,
        filterStatus,
      );
      setAttendances(data);
      setMeta(meta);
    } catch (error) {
      console.error("Failed to load attendances", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendances(page, limit, filterDate, filterStatus);
  }, [page, limit, filterDate, filterStatus]);

  const handleClickPhoto = (url: string) => {
    setSelectedPhoto(`http://localhost:5000${url}`);
  };

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFilterDate(formData.get("date") as string);
    setFilterStatus(formData.get("status") as string);
    setPage(1);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFilterDate("");
    setFilterStatus("");
    setPage(1);
    const form = e.currentTarget.form;
    if (form) {
      if (form.date) (form.date as HTMLInputElement).value = "";
      if (form.status) (form.status as HTMLSelectElement).value = "";
    }
  };

  const handleClosePhoto = () => setSelectedPhoto(null);

  return (
    <MonitoringComponent
      attendances={filteredAttendances}
      filterDate={filterDate}
      filterStatus={filterStatus}
      handleClickPhoto={handleClickPhoto}
      handleClosePhoto={handleClosePhoto}
      handleFilter={handleFilter}
      handleReset={handleReset}
      loading={loading}
      selectedPhoto={selectedPhoto}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      meta={meta}
    />
  );
};
