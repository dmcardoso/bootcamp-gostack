import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

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
import { signUpRequest } from '~/store/modules/auth/actions';

export default function SignUp({ navigation }) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        value={name}
                        onChangeText={setName}
                        onSubmitEditing={() => emailRef.current.focus()}
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        ref={emailRef}
                        returnKeyType="next"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <FormInput
                        icon="lock-outline"
                        ref={passwordRef}
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        returnKeyType="send"
                        value={password}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        Criar conta
                    </SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já tenho conta</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
