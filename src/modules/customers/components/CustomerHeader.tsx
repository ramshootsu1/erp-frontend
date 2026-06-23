import type { ReactNode } from 'react';
import { PageHeader } from '../../../components/ui';

type CustomerHeaderProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
};

export function CustomerHeader({
  title = 'Customers',
  description = 'Manage customer records, profiles, and related details.',
  actions,
}: CustomerHeaderProps) {
  return <PageHeader title={title} description={description} actions={actions} />;
}
