import React, { useState, useEffect } from 'react';

import { Container, HourList, Hour, Title } from './styles';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import api from '~/services/api';

export default function SelectDateTime({ route, navigation }) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);
    const { provider } = route.params;

    useEffect(() => {
        async function loadAvaliable() {
            const response = await api.get(
                `providers/${provider.id}/avaliable`,
                {
                    params: {
                        date: date.getTime(),
                    },
                },
            );

            setHours(response.data);
        }

        loadAvaliable();
    }, [date, provider.id]);

    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time,
        });
    }

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HourList
                    data={hours}
                    keyExtractor={(item) => item.time}
                    renderItem={({ item }) => (
                        <Hour
                            onPress={() => handleSelectHour(item.value)}
                            enabled={item.avaliable}>
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}
