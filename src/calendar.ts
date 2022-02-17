import '@googleapis/calendar';
// eslint-disable-next-line camelcase
import {auth, calendar, calendar_v3} from '@googleapis/calendar';
// eslint-disable-next-line camelcase
import Schema$Event = calendar_v3.Schema$Event;

const serviceAccountFile = __dirname + '/service-account.json';
const calendarId = 'c_2k8jn65m107ct36bfj2ud9pfn0@group.calendar.google.com';
const authOnBehalfEmail = 'smarthytte@slomic.no';

async function getAllEvents(client, calendarId): Promise<Schema$Event[]> {
  const params = {
    calendarId: calendarId,
    maxResults: 50, // maximum 2500 events can be retrieved
    singleEvents: true,
    orderBy: 'startTime',
    pageToken: null,
  };
  let response = await client.events.list(params);
  const events: Schema$Event[] = response.data.items;

  // paginate through list of events if there are more pages
  while (response.data.nextPageToken) {
    params.pageToken = response.data.nextPageToken;
    response = await client.events.list(params);
    events.push(...response.data.items);
  }

  return events;
}

/**
 * The main function running the app
 * @return {Promise<void>} nothing in return
 */
async function main() {
  const auth2 = new auth.GoogleAuth({
    keyFile: serviceAccountFile,
    scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
  });

  const authClient = await auth2.getClient();
  authClient['subject'] = authOnBehalfEmail;

  const client = await calendar({
    version: 'v3',
    auth: authClient,
  });

  const events = await getAllEvents(client, calendarId);
  console.log(events);
}

main().catch((error) => {
  // In many cases, errors from the API will come back as `GaxiosError`.
  // These will include the full HTTP Response (you should check for it first)
  if (error.response) {
    console.error(error.response);
  } else {
    console.error(error);
  }
});
