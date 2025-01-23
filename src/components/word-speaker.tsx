import {Button} from "@/components/ui/button";
import {FaVolumeUp} from "react-icons/fa";
import {useState} from "react";

interface WordSpeakerProps {
    text: string;
}

export const WordSpeaker = ({ text }: WordSpeakerProps) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const speakWord = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";

        setIsSpeaking(true);

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    return(
        <Button
            onClick={speakWord}
            variant={"link"}
            size={"icon"}
            className={isSpeaking ? "animate-pulse text-green-500" : ""}
        >
            <FaVolumeUp />
        </Button>
    );
};