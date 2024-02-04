export type Queries =
  | { $eq: any }
  | { $ne: any }
  | { $gt: any }
  | { $gte: any }
  | { $lt: any }
  | { $lte: any }
  | { $in: any[] }
  | { $nin: any[] }
  | { $and: Queries[] }
  | { $or: Queries[] }
  | { $nor: Queries[] }
  | { $not: Queries[] }
  | { $exists: boolean }
  | { $regex: string };
