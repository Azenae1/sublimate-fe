import React from "react";

import EventCard from "../EventCard/EventCard";

const EventGrid = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-5 justify-start">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default EventGrid;
