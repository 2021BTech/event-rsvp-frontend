import type { ReactNode } from "react";
import type { User } from "../users/user.model";

export type Column<T> = {
  label: string;
  key: keyof T;
  className?: string;
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
};

export type Action<T> = {
  label: string;
  icon: ReactNode;
  onClick: (row: T) => void;
};

export type ReusableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  pageSize?: number;
};

export type AdminUsersResponse = {
  total: number;
  page: number;
  totalPages: number;
  data: User[];
};

export type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};