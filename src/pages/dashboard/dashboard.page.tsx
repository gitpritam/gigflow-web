import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGigs } from "@/hook/getGigs.hook";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { formatBudget } from "@/utils/formatCurrency";
import { formatDateDDMMYYYY } from "@/utils/formatDeadline";
import { Spinner } from "@/components/ui/spinner";
import { Eye, Plus } from "lucide-react";
import { GigStatus } from "@/@types/gig.types";
import { apiRequest } from "@/utils/apiRequest";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [updatingGigId, setUpdatingGigId] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusSuccess, setStatusSuccess] = useState<string | null>(null);

  // Fetch only the user's gigs using ownership filter
  const {
    data: gigs,
    loading,
    error,
    refetch,
  } = useGigs({
    ownership: "true",
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const handleStatusChange = async (gigId: string, newStatus: GigStatus) => {
    setUpdatingGigId(gigId);
    setStatusError(null);
    setStatusSuccess(null);

    try {
      await apiRequest("PATCH", `/gigs/${gigId}/status`, { status: newStatus });
      setStatusSuccess("Status updated successfully!");
      setTimeout(() => setStatusSuccess(null), 3000);
      refetch();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update status";
      setStatusError(message);
    } finally {
      setUpdatingGigId(null);
    }
  };

  const getStatusColor = (status: GigStatus) => {
    switch (status) {
      case GigStatus.OPEN:
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case GigStatus.ASSIGNED:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case GigStatus.COMPLETED:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case GigStatus.CANCELLED:
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
          <p className="text-muted-foreground">Loading your gigs...</p>
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your gigs and track bids
          </p>
        </div>
        <Button
          onClick={() => navigate("/gigs/add")}
          className="btn-gradient-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Post New Gig
        </Button>
      </div>

      {statusSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
          {statusSuccess}
        </Alert>
      )}

      {statusError && (
        <Alert className="mb-6 bg-red-50 border-red-200 text-red-800">
          {statusError}
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Gigs</CardTitle>
        </CardHeader>
        <CardContent>
          {gigs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                You haven't posted any gigs yet.
              </p>
              <Button
                onClick={() => navigate("/gigs/add")}
                className="btn-gradient-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post Your First Gig
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Change Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gigs.map((gig) => (
                    <TableRow key={gig._id}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {gig.title}
                      </TableCell>
                      <TableCell>{formatBudget(gig.budget)}</TableCell>
                      <TableCell>
                        {gig.deadline
                          ? formatDateDDMMYYYY(gig.deadline)
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(gig.status)}>
                          {gig.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {gig.createdAt
                          ? formatDateDDMMYYYY(gig.createdAt)
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={gig.status}
                          onValueChange={(value) =>
                            handleStatusChange(gig._id!, value as GigStatus)
                          }
                          disabled={updatingGigId === gig._id}
                        >
                          <SelectTrigger className="w-35">
                            {updatingGigId === gig._id ? (
                              <div className="flex items-center gap-2">
                                <Spinner className="w-3 h-3" />
                                <span className="text-xs">Updating...</span>
                              </div>
                            ) : (
                              <SelectValue />
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={GigStatus.OPEN}>Open</SelectItem>
                            <SelectItem value={GigStatus.ASSIGNED}>
                              Assigned
                            </SelectItem>
                            <SelectItem value={GigStatus.COMPLETED}>
                              Completed
                            </SelectItem>
                            <SelectItem value={GigStatus.CANCELLED}>
                              Cancelled
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/gigs/${gig._id}/bids`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Show Bids
                          </Button>
                        </div>
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

export default DashboardPage;
