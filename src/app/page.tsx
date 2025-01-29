'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { filterWords, FilterWordsProps } from "@/lib/word-service";
import { toast } from "sonner";
import { Word } from "@prisma/client";
import { WordSpeaker } from "@/components/word-speaker";
import { FaPlus } from "react-icons/fa";
import { debounce } from "@/lib/debounce";
import { Loading } from "@/components/loading";

export default function Home() {
    const [isLoading, startTransition] = useTransition();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [words, setWords] = useState<Word[]>([]);
    const [data, setData] = useState<FilterWordsProps>({
        words: [],
        totalPages: 0,
        currentPage: 0,
        totalItems: 0,
    });

    useEffect(() => {
        startTransition(() => {
            filterWords(filter, page)
                .then((resp) => {
                    setData((prev) => ({
                        ...resp,
                        words: page === 1 ? resp.words : [...prev.words, ...resp.words],
                    }));
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        });
    }, [filter, page]);

    useEffect(() => {
        setWords(data.words);
    }, [data.words]);

    const handleSearch = debounce((value: string) => {
        setFilter(value);
        setPage(1);
    }, 300);

    return (
            <div className="flex flex-col">

                <div className="flex gap-8">
                    <Input placeholder="Search" className="w-full" onChange={(e) => handleSearch(e.target.value)} autoFocus />
                    <Button asChild className="bg-green-500 hover:bg-green-700">
                        <Link href="/register">
                            <FaPlus />
                        </Link>
                    </Button>
                </div>

                <div className="mt-3">
                    <ul className="list-none p-0 m-0">
                        {words.map((word, index) => (
                            <li
                                key={word.id}
                                className={`mb-2 opacity-0 translate-y-4 animate-fadeIn transition duration-500`}
                                style={{
                                    animationDelay: `${(index % 10) * 100}ms`,
                                    animationFillMode: "both",
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">{word.word}</span>
                                    <WordSpeaker text={word.word} />
                                </div>
                                <div className="ml-5 rounded border bg-gray-600 border-gray-800 p-2 text-xs text-white shadow">
                                    <div dangerouslySetInnerHTML={{ __html: word.description as string }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loading size={40} />
                        </div>
                    ) : (
                        <div className="mt-4 flex justify-between items-center">
                            <Button
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={page >= data.totalPages}
                            >
                                {page < data.totalPages ? "Load More" : "No More Words"}
                            </Button>
                            <div className="text-xs text-gray-400">
                                Total: {data.totalItems} - Page: {data.currentPage} / {data.totalPages}
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
}
