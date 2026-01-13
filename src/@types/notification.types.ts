export interface INotification {
  _id?: string;
  type: string;
  message: string;
  data?: {
    bidId?: string;
    gigId?: string;
    gigTitle?: string;
    price?: number;
    [key: string]: any;
  };
  timestamp: Date;
  read?: boolean;
  createdAt?: Date;
}
