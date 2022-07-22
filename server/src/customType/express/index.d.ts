declare namespace Express {
  export interface Request {
    currentUserId: string;
    currentUserNickname: string;
  }
}
