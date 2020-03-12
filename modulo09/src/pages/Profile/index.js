import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import AvatarInput from './AvatarInput';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user.profile);

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />
                <Input type="text" name="name" placeholder="Nome completo" />
                <Input
                    type="text"
                    name="email"
                    placeholder="Seu endereço de e-mail"
                />

                <hr />

                <Input
                    name="password"
                    type="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Nova senha"
                />
                <Input
                    name="password"
                    type="confirmPassword"
                    placeholder="Confirmação de senha"
                />

                <button type="submit">Atualizar perfil</button>
            </Form>

            <button type="button" onClick={handleSignOut}>
                Sair do GoBarber
            </button>
        </Container>
    );
}
