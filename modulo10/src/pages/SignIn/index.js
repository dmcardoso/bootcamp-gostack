import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn({ navigation }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const passwordRef = useRef(null);

    function handleSubmit() {
        dispatch(signInRequest(email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        value={email}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        returnKeyType="next"
                        onChangeText={setEmail}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        ref={passwordRef}
                        placeholder="Sua senha secreta"
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Acessar
                    </SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignUp')}>
                    <SignLinkText>Criar conta gratuita</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
