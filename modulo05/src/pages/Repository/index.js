import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Loading, Owner } from './styles';
import Container from '../../components/Container';

export default function Repository({ match }) {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const repoName = decodeURIComponent(match.params.repository);

            const [reqRepository, reqIssues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    },
                }),
            ]);

            setRepository(reqRepository.data);
            setIssues(reqIssues.data);
            setLoading(false);
        }

        getData();
    }, []);

    if (loading) {
        return <Loading>Carregando</Loading>;
    }
    console.log(repository);

    return (
        <Container>
            <Owner>
                <Link to="/">Voltar aos repositórios</Link>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>
        </Container>
    );
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repository: PropTypes.string,
        }),
    }).isRequired,
};
