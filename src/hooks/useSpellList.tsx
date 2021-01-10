import { useEffect, useState } from 'react';
import { Dnd5eApiPreview, GraphqlLikeResponse } from '../interfaces';
import { Dnd5eApiClient } from '../services';

export function useSpellList() {
    const [spellList, setSpellList] = useState<Dnd5eApiPreview[]>([]);
    const [isSpellListLoading, setIsLoading] = useState(false);
    const [spellListError, setError] = useState('');

    useEffect(() => {
        const apiClient = new Dnd5eApiClient();
        setIsLoading(true);
        apiClient
            .getSpellList()
            .then((data: GraphqlLikeResponse<Dnd5eApiPreview>) => {
                setSpellList(data.results);
            })
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    return { spellList, isSpellListLoading, spellListError };
}
