interface Attendee {
  type: string;
  status: {
    response: string;
    time: string;
    emailAddress: {
      name: string;
      address: string;
    };
  };
}
export interface Value {
  '@odata.etag': string;
  id: string;
  subject: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: Array<Attendee>;
}
export interface TeamsResponse {
  value: Array<Value>;
}
