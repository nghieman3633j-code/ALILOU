import { useEffect, useState } from 'react';

export function useAuditLogs() {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/logs`);
      const data = await response.json();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  return { logs };
}