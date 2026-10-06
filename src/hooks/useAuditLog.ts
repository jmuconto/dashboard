import { useEffect, useRef } from 'react';
import { UserRole } from '../types/auth';
import { logAccess } from '../utils/audit';

export function useAuditLog(userId: string, userName: string, userRole: UserRole, moduleName: string) {
  const loggedRef = useRef(false);

  useEffect(() => {
    // Only log once per module mount
    if (!loggedRef.current) {
      logAccess(userId, userName, userRole, moduleName);
      loggedRef.current = true;
    }
  }, [userId, userName, userRole, moduleName]);
}
