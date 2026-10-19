import React from 'react';
import type { Metadata } from 'next';
import AdminLayout from '@/components/AdminLayout';

export const metadata: Metadata = {
  title: 'Admin Dashboard — Abu Bakr CMS',
  description: 'Control panel for managing projects, articles, experience, and site content.',
  robots: { index: false, follow: false }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
