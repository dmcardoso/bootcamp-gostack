import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Container,
    Title,
    Separator,
    Form,
    FormInput,
    SubmitButton,
    LogoutButton,
} from './styles';
import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user.profile);
    const emailRef = useRef(null);
    const oldPasswordRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        dispatch(
            updateProfileRequest({
                name,
                email,
                oldPassword,
                password,
                confirmPassword,
            }),
        );
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu perfil</Title>
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
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        ref={oldPasswordRef}
                        secureTextEntry
                        placeholder="Sua senha atual"
                        value={oldPassword}
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        onChangeText={setOldPassword}
                    />
                    <FormInput
                        icon="lock-outline"
                        ref={passwordRef}
                        secureTextEntry
                        placeholder="Sua nova senha"
                        returnKeyType="next"
                        value={password}
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                        autoCapitalize="none"
                        onChangeText={setPassword}
                    />
                    <FormInput
                        icon="lock-outline"
                        ref={confirmPasswordRef}
                        secureTextEntry
                        placeholder="Confirmação de senha"
                        returnKeyType="send"
                        value={confirmPassword}
                        autoCapitalize="none"
                        onChangeText={setConfirmPassword}
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        Atualizar perfil
                    </SubmitButton>

                    <LogoutButton onPress={handleLogout}>
                        Sair do GoBarber
                    </LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}
