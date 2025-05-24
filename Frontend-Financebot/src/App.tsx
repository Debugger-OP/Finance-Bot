import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import { GithubIcon, LinkedinIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { WavyBackground } from "./components/ui/wavy-background";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { InteractiveHoverButton } from "./components/magicui/interactive-hover-button";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [showResponse, setShowResponse] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      const res = await fetch(
        "https://financebot-damg.onrender.com/api/chat/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_input: userInput }),
        }
      );

      const data: { response?: string; error?: string } = await res.json();
      setResponse(data.response || data.error || "No response received.");
      setShowResponse(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponse("Error: " + error.message);
      } else {
        setResponse("An unknown error occurred.");
      }
      setShowResponse(true);
    }
  };

  const clearResponse = () => {
    setUserInput("");
    setResponse("");
    setShowResponse(false);
  };

  return (
    <div className="min-h-screen overflow-hidden relative text-white">
      <WavyBackground backgroundFill="black" blur={30} speed="slow">
        <div className="z-10 flex flex-col items-center justify-center gap-10 py-20 px-4">
          <TextGenerateEffect
            words="FinanceBot"
            className="text-white text-8xl sm:text-5xl font-bold "
          />

          <TextGenerateEffect
            words="Ask anything related to finance"
            className="text-white text-4xl sm:text-5xl font-bold text-center"
          />

          <AnimatePresence>
            <motion.div
              initial={{ height: "auto" }}
              animate={{ height: "auto" }}
              exit={{ height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-[350px] bg-white/10 backdrop-blur-lg border border-white/20 text-white">
                <CardHeader />

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="user_input"
                      placeholder="Ask me anything financial..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      required
                      className="w-full p-2 rounded-md bg-white/20 placeholder-white/80 text-white focus:outline-none"
                    />
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InteractiveHoverButton className="w-full justify-center text-black">
                        Ask
                      </InteractiveHoverButton>
                    </motion.div>
                  </form>

                  <AnimatePresence>
                    {showResponse && (
                      <motion.div
                        className="mt-4 p-3 bg-black/30 rounded-md max-h-60 overflow-y-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{response}</p>
                        <motion.button
                          onClick={clearResponse}
                          className="mt-2 text-sm text-red-400 hover:underline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Clear
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="justify-center text-sm text-muted-foreground">
                  Created by Saurav Sharma
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-20 flex flex-col items-center justify-center text-white gap-2 text-sm">
          <div className="flex gap-4">
            <a
              href="https://github.com/Debugger-OP"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-800 transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/saurav-sharma-83841a18b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-800 transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
          <p>
            Made by Saurav Sharma — because financial anxiety needs some UI.
          </p>
        </div>
      </WavyBackground>
    </div>
  );
}

export default App;
