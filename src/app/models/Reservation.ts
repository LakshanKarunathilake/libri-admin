import {ReservationUser} from './ReservationUser';

export interface Reservation {
  biblionumber: string;
  title: string;
  author: string;
  abstract: string;
  copyrightdate: string;
  biblioitemnumber: string;
  isbn: string;
  url: string;
  users: Array<ReservationUser>;
}
