import React from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, IndianRupee } from "lucide-react";
import { formatBudget } from "@/utils/formatCurrency";
import { formatDeadline } from "@/utils/formatDeadline";
import type { IGig } from "@/@types/gig.types";
import { GigStatus } from "@/@types/gig.types";

interface GigCardProps {
  gig: IGig;
}

const statusClassMap: Record<GigStatus, string> = {
  [GigStatus.OPEN]: "badge-status-open",
  [GigStatus.ASSIGNED]: "badge-status-assigned",
  [GigStatus.COMPLETED]: "badge-status-completed",
  [GigStatus.CANCELLED]: "badge-status-cancelled",
};

const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  return (
    <Card className="hover:shadow-xl transition-all hover:-translate-y-1 bg-white border-gray-200">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl text-gray-900 flex-1">
            {gig.title}
          </CardTitle>
          <Badge className={`${statusClassMap[gig.status]} border-0`}>
            {gig.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold text-blue-600">
              {formatBudget(gig.budget)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDeadline(gig.deadline)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-600 line-clamp-2">
          {gig.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link to={`/gigs/${gig._id}`} className="w-full">
          <Button className="w-full btn-gradient-primary">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GigCard;
