import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/utils/apiRequest";
import type { IGig } from "@/@types/gig.types";
import { GigStatus } from "@/@types/gig.types";
import { useAuthStore } from "@/store";
import type { IUser } from "@/@types/interface/user.interface";
import GigDetailsHeader from "@/components/gigDetails/GigDetailsHeader";
import GigDescription from "@/components/gigDetails/GigDescription";
import GigOwnerInfo from "@/components/gigDetails/GigOwnerInfo";
import BidButton from "@/components/gigDetails/BidButton";
import BidForm from "@/components/gigDetails/BidForm";
import GigStatusAlert from "@/components/gigDetails/GigStatusAlert";
import { AxiosError } from "axios";

const ShowGigDetailsPage: React.FC = () => {
  const { gigId } = useParams<{ gigId: string }>();
  const { user } = useAuthStore();
  const [gig, setGig] = useState<(IGig & { owner: IUser }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showBidForm, setShowBidForm] = useState<boolean>(false);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [bidMessage, setBidMessage] = useState<string>("");
  const [bidLoading, setBidLoading] = useState<boolean>(false);
  const [bidError, setBidError] = useState<string>("");
  const [bidSuccess, setBidSuccess] = useState<string>("");

  useEffect(() => {
    const fetchGigDetails = async () => {
      if (!gigId) return;

      try {
        setLoading(true);
        setError("");
        const response = await apiRequest("GET", `/gigs/${gigId}`);
        setGig(response as IGig & { owner: IUser });
      } catch (err) {
        console.error("Error fetching gig details:", err);
        if (err instanceof AxiosError)
          setError(
            err.response?.data?.message ||
              "Failed to load gig details. Please try again."
          );
      } finally {
        setLoading(false);
      }
    };

    fetchGigDetails();
  }, [gigId]);

  const handleBidClick = () => {
    setShowBidForm(!showBidForm);
    setBidError("");
    setBidSuccess("");
  };

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBidError("");
    setBidSuccess("");

    // Validation
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setBidError("Please enter a valid bid amount");
      return;
    }
    if (!bidMessage.trim()) {
      setBidError("Please enter a message with your bid");
      return;
    }

    try {
      setBidLoading(true);
      const payload = {
        gigId,
        price: parseFloat(bidAmount),
        message: bidMessage,
      };
      await apiRequest("POST", `/bids`, payload);

      setBidSuccess("Bid submitted successfully!");
      setBidAmount("");
      setBidMessage("");
      setTimeout(() => {
        setShowBidForm(false);
        setBidSuccess("");
      }, 2000);
    } catch (err) {
      console.error("Error submitting bid:", err);
      if (err instanceof AxiosError)
        setBidError(
          err.response?.data?.message ||
            "Failed to submit bid. Please try again."
        );
    } finally {
      setBidLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-12 h-12 text-blue-600" />
          <p className="text-gray-600">Loading gig details...</p>
        </div>
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-6 h-6" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{error || "Gig not found"}</p>
            <Link to="/gigs">
              <Button className="w-full btn-linear-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gigs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/gigs"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gigs
        </Link>

        {/* Main Gig Card */}
        <Card className="shadow-xl border-gray-200 bg-white">
          <GigDetailsHeader gig={gig} />
          <CardContent className="space-y-6">
            <GigDescription description={gig.description} />
            <GigOwnerInfo owner={gig.owner} />

            {/* Bid CTA Button */}
            {gig.status === GigStatus.OPEN && (
              <BidButton
                isOwner={user?._id === gig.owner._id}
                showBidForm={showBidForm}
                onClick={handleBidClick}
              />
            )}

            {/* Sliding Bid Form */}
            <BidForm
              showBidForm={showBidForm}
              bidAmount={bidAmount}
              bidMessage={bidMessage}
              bidLoading={bidLoading}
              bidError={bidError}
              bidSuccess={bidSuccess}
              gigBudget={gig.budget}
              onBidAmountChange={setBidAmount}
              onBidMessageChange={setBidMessage}
              onSubmit={handleBidSubmit}
            />

            {/* Status Information */}
            <GigStatusAlert status={gig.status} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShowGigDetailsPage;
