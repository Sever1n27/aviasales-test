import { createEffect, restore, combine, createStore, createEvent, sample, forward } from 'effector';
import { Ticket } from '@types';

async function fetchSearchIdRequest() {
    const res = await fetch('https://front-test.beta.aviasales.ru/search');
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
}

async function fetchTicketsRequest(id: { searchId: string }) {
    const searchId = id?.searchId;
    const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
}

export const stops = [0, 1, 2, 3];

export const fetchSearchId = createEffect(fetchSearchIdRequest);
export const $id = restore(fetchSearchId.doneData, null);
export const fetchTickets = createEffect(fetchTicketsRequest);
export const $tickets = restore<{ stop: boolean; tickets: Ticket[] }>(fetchTickets.doneData, {
    stop: false,
    tickets: [],
}).on(fetchTickets.doneData, (state, data) => ({
    stop: data.stop,
    tickets: [...state.tickets, ...data.tickets],
}));

export const changeStopFilter = createEvent<number>();
export const restoreStopFilter = createEvent();
export const $stopFilters = createStore(stops)
    .on(changeStopFilter, (state, payload) =>
        state.includes(payload) ? state.filter((item) => item !== payload) : [...state, payload],
    )
    .on(restoreStopFilter, () => {
        if ($stopFilters.getState().length < stops.length) {
            return stops;
        } else return [];
    });

// temporary, refetch searchId on error
forward({
    from: fetchTickets.fail,
    to: fetchSearchId,
});

const $filteredTickets = combine($tickets, $stopFilters, (ticketsData, stopFilters) => {
    if (ticketsData.stop && stopFilters.length > 0) {
        return ticketsData.tickets.filter((ticket) =>
            ticket.segments.every((segment) => stopFilters.includes(segment.stops.length)),
        );
    }
});
export const changeShownTickets = createEvent<string>();
export const $mode = createStore<string>('cheapest').on(changeShownTickets, (state, payload) => payload);

export const $fastestTickets = $filteredTickets.map((tickets) =>
    tickets
        ? tickets
              .sort(
                  (a, b) =>
                      a.segments[0].duration +
                      a.segments[1].duration -
                      (b.segments[0].duration + b.segments[1].duration),
              )
              .slice(0, 5)
        : [],
);

export const $cheapestTickets = $filteredTickets.map((tickets) =>
    tickets ? tickets.sort((a, b) => a.price - b.price).slice(0, 5) : [],
);

combine({ id: $id, tickets: $tickets }, ({ id, tickets }) => {
    if (!tickets.stop && id) {
        fetchTickets(id);
    }
});

$tickets.watch((state) => {
    console.log(state);
});

$cheapestTickets.watch((state) => {
    console.log('cheapest:', state);
});

$fastestTickets.watch((state) => {
    console.log('fastest:', state);
});

$mode.watch((state) => {
    console.log('mode:', state);
});
