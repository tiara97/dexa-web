import React, { useState, useEffect, useRef } from "react";
import { api } from "../../../lib/api";
import { Employee, Role } from "../../../types";
import { MasterDataComponent } from "../component/MasterDataComponent";

export const MasterDataContainer: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  const [formData, setFormData] = useState<{
    nip: string;
    name: string;
    position: string;
    role: Role;
    password?: string;
  }>({
    nip: "",
    name: "",
    position: "",
    role: "employee",
    password: "",
  });

  const loadEmployees = async (
    pageIndex: number = page,
    pageLimit: number = limit,
    searchQuery: string = search,
  ) => {
    setLoading(true);
    try {
      const response = await api.getEmployees(
        pageIndex,
        pageLimit,
        searchQuery,
      );
      setEmployees(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Failed to load employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees(page, limit, search);
  }, [page, limit, search]);

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        nip: employee.nip || "",
        name: employee.name,
        position: employee.position,
        role: employee.role,
        password: employee.password || "",
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        nip: "",
        name: "",
        position: "",
        role: "employee",
        password: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (submitting) return;
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      setSearch(val);
      setPage(1);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingEmployee) {
        await api.saveEmployee({ ...formData, id: editingEmployee.id });
      } else {
        await api.saveEmployee(formData);
      }
      await loadEmployees(page);
      handleCloseModal();
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    setDeleting(true);
    try {
      await api.deleteEmployee(employeeToDelete.id);
      await loadEmployees(page);
      setEmployeeToDelete(null);
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <MasterDataComponent
      confirmDelete={confirmDelete}
      deleting={deleting}
      editingEmployee={editingEmployee}
      employees={employees}
      employeeToDelete={employeeToDelete}
      formData={formData}
      handleCloseModal={handleCloseModal}
      handleOpenModal={handleOpenModal}
      handleSearch={handleSearch}
      handleSubmit={handleSubmit}
      isModalOpen={isModalOpen}
      limit={limit}
      loading={loading}
      meta={meta}
      page={page}
      search={searchInput}
      setEmployeeToDelete={setEmployeeToDelete}
      setFormData={setFormData}
      setLimit={setLimit}
      setPage={setPage}
      submitting={submitting}
    />
  );
};
