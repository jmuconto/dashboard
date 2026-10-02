/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import AppLayout from './components/AppLayout';
import SalesDashboard from './components/dashboards/SalesDashboard';
import AcademicDashboard from './components/dashboards/AcademicDashboard';
import PromotersDashboard from './components/dashboards/PromotersDashboard';
import InnovationDashboard from './components/dashboards/InnovationDashboard';
import AboutDashboard from './components/dashboards/AboutDashboard';
import { DateRange } from './components/ui/DateRangePicker';

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('app')} />;
  }

  return (
    <AppLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      onLogout={() => setView('landing')}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
    >
      {activeTab === 'sales' && <SalesDashboard dateRange={dateRange} />}
      {activeTab === 'academic' && <AcademicDashboard dateRange={dateRange} />}
      {activeTab === 'promoters' && <PromotersDashboard dateRange={dateRange} />}
      {activeTab === 'agile' && <InnovationDashboard dateRange={dateRange} />}
      {activeTab === 'about' && <AboutDashboard />}
    </AppLayout>
  );
}

