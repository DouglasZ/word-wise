'use client';

import {ChangeEvent, useState, useTransition} from 'react';
import {Word} from '@prisma/client';
import {toast} from 'sonner';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {onSaveWord} from "@/lib/word-service";
import {TextEditor} from "@/components/text-editor";
import {FaArrowLeft, FaSave} from "react-icons/fa";
import {TextTranslator} from "@/components/text-translator";


const Register = () => {
  const [formContent, setFormContent] = useState<Partial<Word>>({
    word: '',
    description: '',
  });
  const [isPending, startTransition] = useTransition();

  const handleSave = async () => {

      if (!formContent.word || !formContent.description) {
            toast.error('Fill all fields');
            return;
      }

    startTransition(() => {
      onSaveWord(formContent)
        .then((data) => {
            toast.success(`Word ${data.word} saved`);
            handleClear();
        })
        .catch((error) => {
          console.error(error);
          toast.error('Something went wrong');
        });
    });
  };

  const handleClear = () => {
    setFormContent({
      word: '',
      description: '',
    });
  };
  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormContent({
      ...formContent,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-2 flex flex-col gap-2">
      <div className="flex justify-between gap-1">
        <div>
          <Button variant={'outline'} asChild tabIndex={4}>
            <Link href={'/'}>
                <FaArrowLeft />
                Back
            </Link>
          </Button>
        </div>
        <div className="flex gap-1">
          <Button onClick={handleSave} disabled={isPending} className="bg-blue-500 hover:bg-blue-700" tabIndex={3}>
              <FaSave /> Save
          </Button>
        </div>
      </div>
        <Input
          autoFocus
          type="text"
          name="word"
          placeholder="Word"
          className="w-full rounded border p-2"
          value={formContent.word}
          onChange={handleForm}
          tabIndex={1}
          onFocus={(e) => e.target.select()}
        />
        <TextEditor content={formContent.description as string} onChange={(content) => setFormContent({
            ...formContent,
            description: content,
        }) }/>

        <TextTranslator />
    </div>
  );
};

export default Register;
