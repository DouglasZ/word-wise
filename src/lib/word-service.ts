'use server';

import {db} from "@/lib/db";
import {Word} from "@prisma/client";

type WordProps = Partial<Word>

export const onSaveWord = async (obj: WordProps) => {
  try {
    const word = db.word.create({
      data: {
        word: obj.word as string,
        description: obj.description as string,
      },
    });

    return word;
  } catch (error) {
    throw new Error('Internal Error:: ' + error);
  }
};

export const filterWords = async (filter?: string) => {
    try {
        const words = await db.word.findMany({
            where: filter
                ? {
                    OR: [
                        {
                            word: {
                                contains: filter,
                                mode: 'insensitive',
                            },
                        },
                        {
                            description: {
                                contains: filter,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }
                : undefined,
        });

        return words;
    } catch (error) {
        throw new Error(`Failed to fetch words: ${error instanceof Error ? error.message : String(error)}`);
    }
};

