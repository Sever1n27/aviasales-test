import { createEffect, restore, combine, createStore, createEvent, split, forward, guard } from 'effector';
import { Ticket } from '@types';

let searchId = '';

async function fetchSearchIdRequest() {
    const res = await fetch('https://front-test.beta.aviasales.ru/search');
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json().then((data) => {
        searchId = data.searchId;
    });
}

async function fetchTicketsRequest() {
    const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
}

export const stops = [0, 1, 2, 3];

export const fetchSearchId = createEffect(fetchSearchIdRequest);
export const fetchTickets = createEffect(fetchTicketsRequest);
export const $tickets = restore<{ stop: boolean; tickets: Ticket[] }>(fetchTickets.doneData, {
    stop: false,
    tickets: [],
}).on(fetchTickets.doneData, (state, data) => ({
    stop: data.stop,
    tickets: [...state.tickets, ...data.tickets],
}));
export const $isLoading = combine(
    fetchSearchId.pending,
    fetchTickets.pending,
    $tickets,
    (idPending, ticketsPending, tickets) => idPending || ticketsPending || !tickets.stop,
);
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

const $filteredTickets = combine($tickets, $stopFilters, (ticketsData, stopFilters) => {
    if (ticketsData.stop && stopFilters.length > 0) {
        return ticketsData.tickets.filter((ticket) =>
            ticket.segments.every((segment) => stopFilters.includes(segment.stops.length)),
        );
    }
});
const $shouldContinueFetch = $tickets.map((state) => !state.stop);

export const $error = createStore<string>('');
export const clearError = createEvent();

const { badRequest, notfoundError, serversideError, networkError } = split(fetchTickets.failData, {
    badRequest: (error: Error) => error.message === '400',
    notfoundError: (error: Error) => error.message === '404',
    serversideError: (error: Error) => error.message >= '500',
    networkError: (error: Error) => error.message === undefined,
});

$error
    .on(fetchTickets, () => '')
    .on(clearError, () => '')
    .on(badRequest, () => 'Неправильный запрос (HTTP 400)')
    .on(notfoundError, () => 'Страница не найдена (HTTP 404)')
    .on(serversideError, () => 'Ошибка на стороне сервера (HTTP 500)')
    .on(networkError, () => 'Проблема с сетевым подключением');

forward({
    from: fetchSearchId.doneData,
    to: fetchTickets,
});

guard({
    source: fetchTickets.doneData,
    filter: $shouldContinueFetch,
    target: fetchTickets,
});

// temp
forward({
    from: clearError,
    to: fetchTickets,
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

$tickets.watch((state) => {
    console.log(state);
});

$error.watch((state) => {
    console.log('error', state);
});

$mode.watch((state) => {
    console.log('mode:', state);
});
