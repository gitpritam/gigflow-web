import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGigBids } from "@/hook/getGigBids.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { formatBudget } from "@/utils/formatCurrency";
import { formatDateDDMMYYYY } from "@/utils/formatDeadline";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, UserCheck } from "lucide-react";
import { BidStatus } from "@/@types/bid.types";

const ShowBidsPage: React.FC = () => {
  const { gigId } = useParams<{ gigId: string }>();
  const navigate = useNavigate();
  const { data: bids, loading, error, hireBid } = useGigBids(gigId || "");
  const [hiringBidId, setHiringBidId] = useState<string | null>(null);
  const [hireError, setHireError] = useState<string | null>(null);
  const [hireSuccess, setHireSuccess] = useState<string | null>(null);

  const handleHire = async (bidId: string) => {
    setHiringBidId(bidId);
    setHireError(null);
    setHireSuccess(null);

    const result = await hireBid(bidId);

    if (result.success) {
      setHireSuccess("Freelancer hired successfully!");
      setTimeout(() => setHireSuccess(null), 3000);
    } else {
      setHireError(result.error || "Failed to hire freelancer");
    }

    setHiringBidId(null);
  };

  const getStatusColor = (status: BidStatus) => {
    switch (status) {
      case BidStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case BidStatus.ACCEPTED:
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case BidStatus.REJECTED:
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 w-8 h-8" />
          <p className="text-muted-foreground">Loading bids...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-red-600 text-center">{error}</p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full mt-4"
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gig Bids</h1>
          <p className="text-muted-foreground mt-2">
            Review and hire freelancers for your gig
          </p>
        </div>
      </div>

      {hireSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          {hireSuccess}
        </Alert>
      )}

      {hireError && (
        <Alert className="mb-6 bg-red-50 border-red-200">{hireError}</Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Bids ({bids.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {bids.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No bids received yet for this gig.
              </p>
              <Button
                onClick={() => navigate("/dashboard")}
                className="btn-gradient-primary"
              >
                Back to Dashboard
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Freelancer</TableHead>
                    <TableHead>Bid Amount</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid) => (
                    <TableRow key={bid._id}>
                      <TableCell className="font-medium">
                        {bid.freelancer?.name || "Unknown"}
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">
                        {formatBudget(bid.price)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {bid.message}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(bid.status)}>
                          {bid.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {bid.createdAt
                          ? formatDateDDMMYYYY(bid.createdAt)
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {bid.status === BidStatus.PENDING ? (
                          <Button
                            size="sm"
                            className="btn-gradient-primary"
                            onClick={() => handleHire(bid._id)}
                            disabled={hiringBidId === bid._id}
                          >
                            {hiringBidId === bid._id ? (
                              <>
                                <Spinner className="w-4 h-4 mr-2" />
                                Hiring...
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Hire
                              </>
                            )}
                          </Button>
                        ) : bid.status === BidStatus.ACCEPTED ? (
                          <Badge className="bg-green-100 text-green-800">
                            Hired
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">
                            {bid.status}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowBidsPage;
