import { useState } from "react";

// Future features:
//  - pause/unpause
//  - selector for changing from "synthesized speech" to "bespoke recordings"
//      (which will be unavailable until backed by a server with the .mp3 files,
//       like the GitHub homepage maybe)
//  - menu for user to change synthesizer voice, pitch, and rate

function ReaderForm() {

    const [txt, setTxt] = useState("");

    function handleChange(event) {
        setTxt(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        let chars = [...txt];

        let readableTxt = "";

        for (let i = 0; i < chars.length; i++)
        {
            if (chars[i] === "'")
            {
                readableTxt = readableTxt + " apostrophe";
            }
            else if (chars[i] === ",")
            {
                readableTxt = readableTxt + " comma";
            }
            else if (chars[i] === ".")
            {
                readableTxt = readableTxt + " period";
            }
            else if (chars[i] === " ")
            {
                readableTxt = readableTxt + " space";
            }
            else if (chars[i] === "\n")
            {
                readableTxt = readableTxt + " carriage return line feed";
            }
            else if (/[A-Z]/.test(chars[i])) // regEx to test for English capital
            {
                readableTxt = readableTxt + " capital" + " " + chars[i];
            }
            else if (/[a-z]/.test(chars[i])) // regEx to test for English lowercase
            {
                readableTxt = readableTxt + " " + chars[i]
            }
            else
            {
                readableTxt = readableTxt + " unknown character";
            }
        }

        let utterance = new SpeechSynthesisUtterance(readableTxt);
        utterance.pitch = .9;
        utterance.rate = .5;
        speechSynthesis.speak(utterance);
    }

    return (
        <>
            <h1>Character Reader</h1>

            <p>Utilizes Web Speech API. Not usable with Opera Android or Webview Android browsers</p>

            <p>Intended use case: Listening to a typed copy while proofreading against the original.</p>

            <p>
            Enter some text in the input below and click the button to hear it. Uses your operating system's default synthesizer voice.
            </p>

            <form onSubmit={handleSubmit}>
                <label>Text to read:</label>
                <br />
                <textarea rows="5" cols="33" onChange={handleChange} value={txt} />
                <br />
                <button type="submit">Read</button>
            </form>
        </>
    );
}

export default ReaderForm;