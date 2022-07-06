// declare namespace Express {
//   interface Request {
//     currentUserId: String;
//   }
// }
export {};
declare global {
  namespace Express {
    interface Request {
      currentUserId: String;
    }
  }
}
