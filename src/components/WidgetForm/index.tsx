import { useState } from "react";

import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { feedbackTypes } from "./types";

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep
                    onFeedbackRestartRequested={() => handleRestartFeedback()}
                />
            ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep
                            onFeedbackTypeChanged={setFeedbackType}
                        />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackSent={() => setFeedbackSent(true)}
                            onFeedbackRestartRequested={() =>
                                handleRestartFeedback()
                            }
                        />
                    )}
                </>
            )}
            <footer className="text-xs text-neutral-400">
                Feito com ♥{" "}
                <a
                    className="underline underline-offset-2"
                    href="https://github.com/davysz"
                >
                    davysz
                </a>
            </footer>
        </div>
    );
}
