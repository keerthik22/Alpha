import { fetchFilteredCustomers } from '@/app/lib/data'; 
import { lusitana } from '@/app/ui/fonts';
import CustomersTable from '@/app/ui/customers/table';
import { Suspense } from 'react';
import CustomersTableSkeleton from '@/app/ui/skeletons';
import Link from 'next/link';
import Search from '@/app/ui/search';

export default async function CustomersPage({
  searchParams = { query: '', page: '1' },
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const query = resolvedSearchParams.query || '';
  
  const rawCustomers = await fetchFilteredCustomers(query); 
  const customers = rawCustomers.map((customer) => ({
    ...customer,
    total_pending: customer.total_pending ? Number(customer.total_pending) / 100 : 0,
    total_paid: customer.total_paid ? Number(customer.total_paid) / 100 : 0,
  }));

  return (
    <div className="w-full px-6 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl font-semibold text-gray-900`}>
            Customers
          </h1>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200"
          >
            ← Return to Home
          </Link>
        </div>

        <div className="flex justify-end">
          <Search placeholder="Search customers..." />
        </div>

        <Suspense fallback={<CustomersTableSkeleton />}>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    </div>
  );
}