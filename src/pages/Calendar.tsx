import React, {
    FunctionComponent,
    useContext,
    useState,
    useCallback,
    useEffect,
    ChangeEvent,
} from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import { ProfileContext } from '../context/profile';
import {
    CREATE_EVENT,
    EventData,
    EventInput,
} from '../graphql/user/create_event.mutation';
import { Event } from '../types/event';

interface CalendarContentProps {
    className?: string;
}

export const Calendar: FunctionComponent<CalendarContentProps> = ({
    className,
}) => {
    Calendar.defaultProps = {
        className: '',
    };

    const { profile } = useContext(ProfileContext);

    const [eventResult, setEventResult] = useState<Event>({
        summary: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        status: '',
    });

    const [eventInfo, setEventInfo] = useState<EventInput>({
        summary: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
    });

    const [createEventMut] = useMutation<EventData, { data: EventInput }>(
        CREATE_EVENT
    );

    const createEvent = useCallback(
        async (data: EventInput) => {
            try {
                const res = await createEventMut({
                    variables: {
                        data: {
                            summary: data.summary,
                            description: data.description,
                            startDateTime: data.startDateTime,
                            endDateTime: data.endDateTime,
                        },
                    },
                });
                if (res.data?.createEvent) {
                    setEventResult(res.data.createEvent);
                }
            } catch (err) {
                console.info(err);
            }
        },
        [createEventMut]
    );

    useEffect(() => {
        setEventInfo({
            summary: '',
            description: '',
            startDateTime: '',
            endDateTime: '',
        });

        setEventResult({
            summary: '',
            description: '',
            startDateTime: '',
            endDateTime: '',
            status: '',
        });
    }, []);

    if (!profile) {
        return (
            <div>
                You need to login first
                <Link to="/login">Login</Link>
            </div>
        );
    }

    if (profile && !profile?.isSync) {
        return (
            <div>
                You need to login via google
                <Link to="/oauth">구글로 로그인</Link>
            </div>
        );
    }

    return (
        <div className={className}>
            summary:{' '}
            <input
                required
                type="text"
                name="summary"
                value={eventInfo.summary}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setEventInfo({
                        ...eventInfo,
                        summary: evt.target.value,
                    });
                }}
            />
            <br />
            description:{' '}
            <input
                required
                type="text"
                name="description"
                value={eventInfo.description}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setEventInfo({
                        ...eventInfo,
                        description: evt.target.value,
                    });
                }}
            />
            <br />
            startDateTime:{' '}
            <input
                required
                type="datetime-local"
                name="startDateTime"
                value={eventInfo.startDateTime}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setEventInfo({
                        ...eventInfo,
                        startDateTime: evt.target.value,
                    });
                }}
            />
            <br />
            endDateTime:{' '}
            <input
                required
                type="datetime-local"
                name="endDateTime"
                value={eventInfo.endDateTime}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setEventInfo({
                        ...eventInfo,
                        endDateTime: evt.target.value,
                    });
                }}
            />
            <br />
            userId:{' '}
            <input
                required
                disabled
                type="number"
                name="userId"
                value={profile.id}
            />
            <br />
            <input
                type="submit"
                onClick={() => {
                    createEvent(eventInfo);
                }}
            />
            {eventResult.summary && (
                <div>
                    <div>
                        {profile.firstName} {profile.lastName} Created Event
                        succussfully
                    </div>
                    <br />
                    <div>summary: {eventResult.summary}</div>
                    <br />
                    <div>description: {eventResult.description}</div>
                    <br />
                    <div>startDateTime: {eventResult.startDateTime}</div>
                    <br />
                    <div>endDateTime: {eventResult.endDateTime}</div>
                    <br />
                    <div>status: {eventResult.status}</div>
                    <br />
                </div>
            )}
        </div>
    );
};
