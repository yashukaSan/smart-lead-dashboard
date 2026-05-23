import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { LeadStatus, LeadSource } from '../../types/lead.types';
import type {Lead,CreateLeadRequest } from "../../types/lead.types";

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.nativeEnum(LeadStatus),
  source: z.nativeEnum(LeadSource),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLeadRequest) => Promise<void>;
  lead?: Lead;
  loading?: boolean;
}

export default function LeadModal({ isOpen, onClose, onSubmit, lead, loading = false }: LeadModalProps) {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    if (lead) {
      setValue('name', lead.name);
      setValue('email', lead.email);
      setValue('status', lead.status);
      setValue('source', lead.source);
    } else {
      reset();
    }
  }, [lead, setValue, reset]);

  const handleFormSubmit = async (data: LeadFormData) => {
    setError(null);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save lead');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lead ? 'Edit Lead' : 'Create New Lead'}
      footer={
        <div className="flex gap-3 justify-end w-full">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(handleFormSubmit)}
            loading={loading}
          >
            {lead ? 'Update' : 'Create'}
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}
        <Input
          label="Name"
          placeholder="Lead name"
          required
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
          {...register('email')}
          error={errors.email?.message}
        />
        <Select
          label="Status"
          required
          options={Object.values(LeadStatus).map((status) => ({
            value: status,
            label: status,
          }))}
          {...register('status')}
          error={errors.status?.message}
        />
        <Select
          label="Source"
          required
          options={Object.values(LeadSource).map((source) => ({
            value: source,
            label: source,
          }))}
          {...register('source')}
          error={errors.source?.message}
        />
      </form>
    </Modal>
  );
}
