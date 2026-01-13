import React from "react";
import { User } from "lucide-react";
import type { IUser } from "@/@types/interface/user.interface";

interface GigOwnerInfoProps {
  owner: IUser;
}

const GigOwnerInfo: React.FC<GigOwnerInfoProps> = ({ owner }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <User className="w-5 h-5" />
        {owner.name}
      </h3>
    </div>
  );
};

export default GigOwnerInfo;
