import React from "react";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GigStatus } from "@/@types/gig.types";

interface GigStatusAlertProps {
  status: GigStatus;
}

const GigStatusAlert: React.FC<GigStatusAlertProps> = ({ status }) => {
  if (status === GigStatus.OPEN) return null;

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertCircle className="w-4 h-4 text-yellow-600" />
      <p className="text-yellow-800 ml-2">
        This gig is currently <strong>{status}</strong> and not accepting new
        bids.
      </p>
    </Alert>
  );
};

export default GigStatusAlert;
