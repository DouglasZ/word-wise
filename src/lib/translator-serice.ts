import { useState } from "react";

export const useTranslate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [translatedText, setTranslatedText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const translate = async (text: string, source: string, target: string) => {
        if (!text.trim()) {
            setTranslatedText(null);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
            );
            const data = await res.json();

            if (data.responseData?.translatedText) {
                setTranslatedText(data.responseData.translatedText);
            } else {
                throw new Error("Falha ao traduzir");
            }
        } catch (err) {
            setError("Erro ao buscar tradução: " + err);
            setTranslatedText(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { translate, translatedText, isLoading, error };
};
