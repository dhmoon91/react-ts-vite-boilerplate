import { gql } from '@apollo/client';

import { Event } from '../../types/event';

export interface EventData {
    createEvent: Event;
}

export interface EventInput {
    summary: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
}

export const CREATE_EVENT = gql`
    mutation CreateEvent($data: EventInput!) {
        createEvent(data: $data) {
            summary
            description
            startDateTime
            endDateTime
            status
        }
    }
`;
