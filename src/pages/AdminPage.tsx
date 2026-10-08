import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { ActivePage } from '../types';
import { AdminAuthModal } from '../components/admin/AdminAuthModal';
import { AdminHeader } from '../components/admin/AdminHeader';
import { OverviewTab } from '../components/admin/OverviewTab';
import { FinanceTab } from '../components/admin/FinanceTab';
import { OrdersTab } from '../components/admin/OrdersTab';
import { HatcheryFlockTab } from '../components/admin/HatcheryFlockTab';
import { InventoryTab } from '../components/admin/InventoryTab';
import { WholesaleTab } from '../components/admin/WholesaleTab';
import { MessagesTab } from '../components/admin/MessagesTab';
import { SettingsTab } from '../components/admin/SettingsTab';

interface AdminPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setActivePage }) => {
  const { isAuthenticated, activeAdminTab } = useAdmin();

  if (!isAuthenticated) {
    return <AdminAuthModal setActivePage={setActivePage} />;
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      <AdminHeader setActivePage={setActivePage} />

      <main style={{ flex: 1, width: '100%', padding: 'clamp(16px, 3vw, 32px) 0' }}>
        <div className="container">
          {activeAdminTab === 'overview' && <OverviewTab />}
          {activeAdminTab === 'finance' && <FinanceTab />}
          {activeAdminTab === 'orders' && <OrdersTab />}
          {activeAdminTab === 'hatchery' && <HatcheryFlockTab />}
          {activeAdminTab === 'inventory' && <InventoryTab />}
          {activeAdminTab === 'wholesale' && <WholesaleTab />}
          {activeAdminTab === 'messages' && <MessagesTab />}
          {activeAdminTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};
