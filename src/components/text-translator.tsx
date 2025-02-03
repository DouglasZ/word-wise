import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {GrTransaction} from "react-icons/gr";
import {useEffect, useState} from "react";
import {useTranslate} from "@/lib/translator-serice";
import {debounce} from "@/lib/debounce";

const languages = [
    {label: 'English', value: 'en-US'},
    {label: 'Portuguese', value: 'pt-BR'},
    {label: 'Spanish', value: 'es-ES'},
    {label: 'French', value: 'fr-FR'},
    {label: 'German', value: 'de-DE'},
    {label: 'Italian', value: 'it-IT'},
    {label: 'Dutch', value: 'nl-NL'},
    {label: 'Russian', value: 'ru-RU'},
    {label: 'Japanese', value: 'ja-JP'},
    {label: 'Chinese', value: 'zh-CN'},
]


export const TextTranslator = () => {
    const [sourceLanguage, setSourceLanguage] = useState('en-US');
    const [sourceText, setSourceText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('pt-BR');
    const { translate, translatedText, isLoading, error } = useTranslate();

    const handleTranslate = (value: string, sourceLanguage: string, targetLanguage: string) => {
        translate(value, sourceLanguage, targetLanguage);
    }

    const handleChangeSource = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage)
    }

    useEffect(() => {
        if (sourceText.trim()) {
            handleTranslate(sourceText, sourceLanguage, targetLanguage);
        }
    }, [sourceLanguage, targetLanguage]);


    const handleSourceText = debounce((value: string) => {
        handleTranslate(value, sourceLanguage, targetLanguage);
        setSourceText(value);
    }, 500);

    return (
        <div className="flex-grow flex flex-col gap-2 shadow-md p-1 rounded-sm border border-gray-200">
            <div className="w-full flex justify-between items-center">
                <Select onValueChange={(value) => setSourceLanguage(value)} defaultValue={sourceLanguage} value={sourceLanguage}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button variant={'outline'} onClick={handleChangeSource}>
                    <GrTransaction />
                </Button>

                <Select onValueChange={(value) => setTargetLanguage(value)} defaultValue={targetLanguage} value={targetLanguage}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div>
                    <Textarea className="resize-none h-40" onChange={(event) => handleSourceText(event.target.value)}/>
                </div>
                <div className="h-40 border border-gray-200 rounded-sm p-2 relative">
                    {isLoading ?
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    :
                        error ? error : translatedText}
                </div>
            </div>
        </div>
    );
}