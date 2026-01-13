import type { IUser } from "./interface/user.interface";

export enum BidStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface IBid {
  _id: string;
  gigId: string;
  freelancerId: string;
  freelancer?: IUser;
  price: number;
  message: string;
  status: BidStatus;
  createdAt: Date;
  updatedAt: Date;
}
