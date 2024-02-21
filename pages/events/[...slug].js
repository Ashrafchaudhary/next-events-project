import Head from "next/head";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helper/api-util";

export default function FilteredEventsPage(props) {
    const pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name="description"
                content={`All events for ${props.date.month}/${props.date.year}`}
            />
        </Head>
    );

    if (props.hasError) {
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. pLease adjust your values!</p>;
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length == 0) {
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>No events found</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: {
                hasError: true,
            },
            // notFound: true,
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        },
    };
}
