export interface Message {
    _id?: string;
    jobId?: string;
    fromUserId?: string;
    toUserId?: string;
    message?: string;
    read?: boolean;
}