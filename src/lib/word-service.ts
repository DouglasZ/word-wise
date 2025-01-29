'use server';

import {db} from "@/lib/db";
import {Word} from "@prisma/client";

type WordProps = Partial<Word>

export interface FilterWordsProps {
    words: Word[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
}

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

export const filterWords = async (filter?: string, page: number = 1, pageSize: number = 10) => {
    try {
        const skip = (page - 1) * pageSize;

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
            skip,
            take: pageSize,
        });

        const totalCount = await db.word.count({
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

        return {
            words,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
            totalItems: totalCount,
        } as FilterWordsProps;
    } catch (error) {
        throw new Error(`Failed to fetch words: ${error instanceof Error ? error.message : String(error)}`);
    }
};

