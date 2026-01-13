import React from "react";
import { CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, IndianRupee, Briefcase } from "lucide-react";
import { formatBudget } from "@/utils/formatCurrency";
import { formatDateDDMMYYYY } from "@/utils/formatDeadline";
import type { IGig } from "@/@types/gig.types";
import { GigStatus } from "@/@types/gig.types";

interface GigDetailsHeaderProps {
  gig: IGig;
}

const statusClassMap: Record<GigStatus, string> = {
  [GigStatus.OPEN]: "badge-status-open",
  [GigStatus.ASSIGNED]: "badge-status-assigned",
  [GigStatus.COMPLETED]: "badge-status-completed",
  [GigStatus.CANCELLED]: "badge-status-cancelled",
};

const GigDetailsHeader: React.FC<GigDetailsHeaderProps> = ({ gig }) => {
  return (
    <CardHeader>
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex-1">
          <CardTitle className="text-3xl text-gray-900 mb-2">
            {gig.title}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />
              <span className="font-semibold text-blue-600 text-lg">
                {formatBudget(gig.budget)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Deadline: {formatDateDDMMYYYY(gig.deadline)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>Posted {formatDateDDMMYYYY(gig.createdAt!)}</span>
            </div>
          </div>
        </div>
        <Badge className={`${statusClassMap[gig.status]} border-0 text-sm`}>
          {gig.status}
        </Badge>
      </div>
    </CardHeader>
  );
};

export default GigDetailsHeader;
