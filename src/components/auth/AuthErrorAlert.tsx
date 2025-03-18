
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthErrorAlertProps {
  error: string | null;
}

export const AuthErrorAlert = ({ error }: AuthErrorAlertProps) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
