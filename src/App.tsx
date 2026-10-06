/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import AppLayout from './components/AppLayout';
import SalesModule from './components/modules/SalesModule';
import FinanceModule from './components/modules/FinanceModule';
import HRModule from './components/modules/HRModule';
import StrategicKPIs from './components/modules/StrategicKPIs';
import SettingsModule from './components/modules/SettingsModule';
import AboutDashboard from './components/dashboards/AboutDashboard';
import NotificationCenter from './components/notifications/NotificationCenter';
import AuditLogView from './components/modules/AuditLogView';
import { DateRange } from './components/ui/DateRangePicker';
import { UserRole, PERMISSIONS } from './types/auth';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [userRole, setUserRole] = useState<UserRole>('CEO_CFO');

  const currentUser = {
    id: 'demo-user-1',
    name: 'Admin Demo',
    role: userRole
  };

  const permissions = PERMISSIONS[userRole];

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-12">
            {(userRole === 'CEO_CFO' || userRole === 'AUDITOR') && (
              <StrategicKPIs currentUser={currentUser} />
            )}
            <NotificationCenter />
            {permissions.vendas !== 'nenhum' && userRole === 'CEO_CFO' && (
              <SalesModule viewMode={permissions.vendas as any} currentUser={currentUser} />
            )}
          </div>
        );
      case 'sales':
        return <SalesModule viewMode={permissions.vendas as any} currentUser={currentUser} />;
      case 'finance':
        return <FinanceModule viewMode={permissions.financas as any} currentUser={currentUser} />;
      case 'hr':
        return <HRModule viewMode={permissions.rh as any} currentUser={currentUser} />;
      case 'audit':
        return <AuditLogView />;
      case 'settings':
        return <SettingsModule />;
      case 'about':
        return <AboutDashboard />;
      default:
        return null;
    }
  };

  return (
    <>
      <AppLayout 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        userRole={userRole}
        onRoleChange={setUserRole}
      >
        {renderModule()}
      </AppLayout>
      <OfflineIndicator />
    </>
  );
}


