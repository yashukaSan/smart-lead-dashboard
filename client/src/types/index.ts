export * from './auth.types';
export * from './lead.types';

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export interface ApiSuccess<T> {
  success: true;
  [key: string]: unknown;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
