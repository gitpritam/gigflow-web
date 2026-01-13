import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { IndianRupee, AlertCircle, Send } from "lucide-react";
import { formatBudget } from "@/utils/formatCurrency";

interface BidFormProps {
  showBidForm: boolean;
  bidAmount: string;
  bidMessage: string;
  bidLoading: boolean;
  bidError: string;
  bidSuccess: string;
  gigBudget: number;
  onBidAmountChange: (value: string) => void;
  onBidMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const BidForm: React.FC<BidFormProps> = ({
  showBidForm,
  bidAmount,
  bidMessage,
  bidLoading,
  bidError,
  bidSuccess,
  gigBudget,
  onBidAmountChange,
  onBidMessageChange,
  onSubmit,
}) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        showBidForm ? "max-h-150 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <Card className="bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-inner">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Submit Your Bid
          </CardTitle>
          <CardDescription>
            Enter your bid amount and a message explaining why you're the best
            fit for this gig.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Bid Amount */}
            <div className="space-y-2">
              <Label htmlFor="bidAmount" className="text-gray-700 font-medium">
                Bid Amount (₹) *
              </Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) => onBidAmountChange(e.target.value)}
                  className="pl-10 bg-white"
                  min="1"
                  step="0.01"
                  disabled={bidLoading}
                />
              </div>
              <p className="text-sm text-gray-600">
                Client's budget: {formatBudget(gigBudget)}
              </p>
            </div>

            {/* Bid Message */}
            <div className="space-y-2">
              <Label htmlFor="bidMessage" className="text-gray-700 font-medium">
                Message *
              </Label>
              <textarea
                id="bidMessage"
                placeholder="Explain why you're the best fit for this gig..."
                value={bidMessage}
                onChange={(e) => onBidMessageChange(e.target.value)}
                className="w-full min-h-30 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:opacity-50"
                disabled={bidLoading}
              />
              <p className="text-sm text-gray-600">
                {bidMessage.length}/500 characters
              </p>
            </div>

            {/* Error Alert */}
            {bidError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-800 ml-2">{bidError}</p>
              </Alert>
            )}

            {/* Success Alert */}
            {bidSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <p className="text-green-800">{bidSuccess}</p>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-linear-primary"
              disabled={bidLoading}
            >
              {bidLoading ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Bid
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BidForm;
