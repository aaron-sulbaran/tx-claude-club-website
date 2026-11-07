"use client";

import { formatMeetingDate, useNextMeeting } from "./useNextMeeting";

const INSTAGRAM_URL = "https://www.instagram.com/texasclaude";

// The next meeting as a short key/value list, modeled on the details card in
// the club's GM posts. Keys are sentence case on purpose (no mono caps).
export default function MeetingDetails() {
  const meeting = useNextMeeting();
  const keyClass = "text-subtle";
  const rowClass = "grid grid-cols-[5.5rem_1fr] gap-3 border-t-2 border-ink py-3 text-[15px]";

  return (
    <div aria-live="polite">
      <h2 className="mb-2 text-xl">Next meeting</h2>
      {meeting.status === "loading" && (
        <p className={`py-3 text-[15px] ${keyClass}`}>Checking the club calendar</p>
      )}
      {meeting.status === "found" && (
        <dl>
          <div className={rowClass}>
            <dt className={keyClass}>What</dt>
            <dd>{meeting.event.title}</dd>
          </div>
          <div className={rowClass}>
            <dt className={keyClass}>Date</dt>
            <dd>{formatMeetingDate(meeting.event.date)}</dd>
          </div>
          {meeting.event.startTime && (
            <div className={rowClass}>
              <dt className={keyClass}>Time</dt>
              <dd>
                {meeting.event.startTime}
                {meeting.event.endTime ? ` to ${meeting.event.endTime}` : ""}
              </dd>
            </div>
          )}
          {meeting.event.location && (
            <div className={rowClass}>
              <dt className={keyClass}>Place</dt>
              <dd>{meeting.event.location}</dd>
            </div>
          )}
        </dl>
      )}
      {meeting.status === "none" && (
        <p className="border-t-2 border-ink py-3 text-[15px]">
          Nothing on the calendar yet. Dates go up on{" "}
          <a href={INSTAGRAM_URL} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{" "}
          first.
        </p>
      )}
    </div>
  );
}
