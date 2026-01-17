import type { IUser } from "./interface/user.interface";

export enum BidStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface IBid {
  _id: string;
  gigId: string;
  bidderId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  freelancerId?: string;
  freelancer?: IUser;
  price: number;
  message: string;
  status: BidStatus;
  createdAt: Date;
  updatedAt: Date;
}
