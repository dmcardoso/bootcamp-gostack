import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
    const [techs, setTechs] = useState([]);
    const [newTech, setNewTech] = useState('');

    useEffect(() => {
        const storageTechs = localStorage.getItem('techs');

        if (storageTechs) {
            setTechs(JSON.parse(storageTechs));
        }

        return () => {};
    }, []);

    useEffect(() => {
        localStorage.setItem('techs', JSON.stringify(techs));
    }, [techs]);

    const handleAdd = useCallback(() => {
        setTechs([...techs, newTech]);
        setNewTech('');
    }, [newTech, techs]);

    const techSize = useMemo(() => {
        return techs.length;
    }, [techs]);

    return (
        <>
            <ul>
                {techs.map((tech) => (
                    <li key={tech}>{tech}</li>
                ))}
            </ul>
            <strong>
                Você tem {techSize} tecnologias <br />
            </strong>
            <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
            />
            <button onClick={handleAdd} type="button">
                Adicionar
            </button>
        </>
    );
}

export default App;
