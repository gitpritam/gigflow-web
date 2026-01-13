export enum GigStatus {
  OPEN = "open",
  ASSIGNED = "assigned",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IGig {
  _id?: string;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  ownerId: string;
  status: GigStatus;
  assignedTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
