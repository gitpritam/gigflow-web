import React from "react";
import { Button } from "@/components/ui/button";

interface BidButtonProps {
  isOwner: boolean;
  showBidForm: boolean;
  onClick: () => void;
}

const BidButton: React.FC<BidButtonProps> = ({
  isOwner,
  showBidForm,
  onClick,
}) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <Button
        onClick={onClick}
        className="w-full btn-gradient-primary text-lg py-6"
        disabled={isOwner}
      >
        {isOwner
          ? "Cannot Bid on Your Own Gig"
          : showBidForm
          ? "Hide Bid Form"
          : "Place a Bid"}
      </Button>
    </div>
  );
};

export default BidButton;
