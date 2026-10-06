import { AuditEntry, UserRole } from '../types/auth';

const STORAGE_KEY = 'dashone_audit_logs';

export function getAuditLogs(): AuditEntry[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function logAccess(userId: string, userName: string, userRole: UserRole, module: string, action: string = 'Acesso') {
  const newEntry: AuditEntry = {
    id: Math.random().toString(36).substring(2, 9),
    userId,
    userName,
    userRole,
    module,
    action,
    timestamp: new Date().toISOString(),
  };

  const currentLogs = getAuditLogs();
  const updatedLogs = [newEntry, ...currentLogs].slice(0, 100); // Keep last 100 logs
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
}

export function clearAuditLogs() {
  localStorage.removeItem(STORAGE_KEY);
}
