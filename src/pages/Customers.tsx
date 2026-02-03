import { useEffect, useState } from 'react';
import { getCustomers } from '../api/customers/customers.api';
import type { Customer } from '../api/customers/customers.api';


function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-slate-600">
        Loading customers…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        Failed to load customers: {error}
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-slate-600">
        No customers yet.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800">
        Customers
      </h1>

      <ul className="mt-4 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
        {customers.map((c) => (
          <li key={c.id} className="p-4">
            <div className="font-medium text-slate-800">
              {c.name}
            </div>

            {c.email && (
              <div className="text-sm text-slate-600">
                {c.email}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;
