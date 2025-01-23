'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useEffect, useState, useTransition} from "react";
import {filterWords} from "@/lib/word-service";
import {toast} from "sonner";
import {Word} from "@prisma/client";
import {WordSpeaker} from "@/components/word-speaker";
import {FaPlus} from "react-icons/fa";
import {debounce} from "@/lib/debounce";
import {Loading} from "@/components/loading";

export default function Home() {
    const [isLoading, startTransition] = useTransition();
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        startTransition(() => {
            filterWords()
                .then((data) => setWords(data))
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        });

    }, []);

    const handleSearch = debounce((value: string) => {
        startTransition(() => {
            filterWords(value)
                .then((data) => setWords(data))
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        });
    }, 300);


    return (
        <div className="container mx-auto p-2">
            <div className="flex flex-col ">

                <div className="flex gap-8">
                    <Input placeholder="Search" className="w-full" onChange={(e) => handleSearch(e.target.value)}  autoFocus/>
                    <Button asChild className="bg-green-500 hover:bg-green-700">
                        <Link href={'/register'}><FaPlus /></Link>
                    </Button>
                </div>

                {isLoading ?
                    <div className="h-full flex items-center justify-center min-h-[300px]">
                        <Loading size={40} />
                    </div>
                :
                    <div className="mt-3">
                        <ul className="list-none p-0 m-0">
                            {words.map((word) => (
                                <li key={word.id} className="mb-2">
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
                    </div>
                }
            </div>
        </div>
  );
}
