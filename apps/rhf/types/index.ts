export type Staff = {
  id: string;
  name: string;
  from: Date;
  to: Date;
};

export type Room = {
  id: string;
  name: string;
  staffs: Array<Staff>;
};

export type Schedule = {
  id: string;
  date: string;
  rooms: Array<Room>;
};

export type FormType = {
  schedules: Array<Schedule>;
};
