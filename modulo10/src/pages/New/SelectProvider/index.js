import React, { useState, useEffect } from 'react';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';
import Background from '~/components/Background';
import api from '~/services/api';

export default function SelectProvider({ navigation }) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        async function loadProviders() {
            const response = await api.get('providers');

            setProviders(response.data);
        }

        loadProviders();
    }, []);
    return (
        <Background>
            <Container>
                <ProvidersList
                    data={providers}
                    keyExctractor={(provider) => String(provider.id)}
                    renderItem={({ item: provider }) => (
                        <Provider
                            onPress={() =>
                                navigation.navigate('SelectDateTime', {
                                    provider,
                                })
                            }>
                            <Avatar
                                source={{
                                    uri: provider.avatar
                                        ? provider.avatar.url
                                        : `https://api.adorable.io/avatar/50/${
                                              provider.name
                                          }.png`,
                                }}
                            />
                            <Name>{provider.name}</Name>
                        </Provider>
                    )}
                />
            </Container>
        </Background>
    );
}
