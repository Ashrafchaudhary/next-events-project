import EventItem from "./event-item";

import classes from "../../styles/event-list.module.css";

export default function EventList({ items }) {
    return (
        <ul className={classes.list}>
            {items.map((item) => (
                <EventItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    location={item.location}
                    date={item.date}
                    image={item.image}
                />
            ))}
        </ul>
    );
}
