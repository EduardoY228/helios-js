export enum Permission {
  CLIENT_READ = 'client:read',
  CLIENT_WRITE = 'client:write',
  ADMIN_READ = 'admin:read',
  ADMIN_WRITE = 'admin:write',
}

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Day =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type TimeStampDay =
  `${number}${number}${number}${number}-${Month}-${Day}`;

const t: TimeStampDay = '2002-11-1';
