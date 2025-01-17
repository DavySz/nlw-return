import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";

import { FeedbackType } from "..";

import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "../ScreenShotBottom";
import { feedbackTypes } from "../types";

type FeedbackContentStepProps = {
    feedbackType: FeedbackType;
    onFeedbackSent: () => void;
    onFeedbackRestartRequested: () => void;
};

export function FeedbackContentStep({
    feedbackType,
    onFeedbackSent,
    onFeedbackRestartRequested,
}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setCommet] = useState("");
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        console.log(screenshot);
        console.log(comment);
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    onClick={onFeedbackRestartRequested}
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img
                        src={feedbackTypeInfo.image.source}
                        alt={feedbackTypeInfo.image.alt}
                        className="w-6 h-6"
                    />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea
                    value={comment}
                    onChange={(e) => setCommet(e.target.value)}
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    placeholder="Conte com detalhes oque está acontecendo..."
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenShotButton
                        onScreenshotTook={setScreenshot}
                        screenshot={screenshot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        Enviar feedback
                    </button>
                </footer>
            </form>
        </>
    );
}
