export interface IEmail {
    _id: string;
    from: string;
    to: string;
    message: string;
    status: 0 | 1;
  }
  
export interface IEmailsFilter {
  page: number;
  pageSize: number;
  email: string;
}
  