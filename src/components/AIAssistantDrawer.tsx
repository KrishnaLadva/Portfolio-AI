import { useEffect, useRef, useState } from 'react';
import { Loader2, MessageSquareText, Send, X } from 'lucide-react';
import type { ChatMessage, PortfolioProject, ProfileData } from '../types/portfolio';
import { buildPortfolioContextPrompt } from '../utils/portfolioLogic';

interface AIAssistantDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ProfileData;
  projects: PortfolioProject[];
}

const STARTER_QUESTIONS = [
  'What did Krishna build in NextAura?',
  'What marketing and SEO skills does she have?',
  'Which AI tools does Krishna use?',
  'What is her education and graduation year?',
];

export default function AIAssistantDrawer({
  open,
  onOpenChange,
  profile,
  projects,
}: AIAssistantDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm ${profile.name}'s portfolio assistant. Ask me anything about her BCA education, NextAura MERN project, Canva & social media skills, SEO foundations, or AI Creative Lab workflows.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  async function askQuestion(questionText: string) {
    const trimmed = questionText.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const contextPrompt = buildPortfolioContextPrompt(profile, projects);
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          history: updatedHistory,
          contextPrompt,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not reach AI Portfolio Assistant.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to reach the assistant right now.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher button */}
      {!open && (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          aria-label="Open AI Portfolio Assistant"
          className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-xl bg-[#18181B] px-3.5 py-2.5 text-xs font-medium text-white shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#27272A] sm:right-5 sm:bottom-5 sm:px-4 sm:py-3 sm:text-sm"
        >
          <MessageSquareText className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
          <span className="hidden sm:inline">Ask Portfolio AI</span>
          <span className="sm:hidden">Ask AI</span>
        </button>
      )}

      {/* Slide-over drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI Portfolio Assistant"
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
          onClick={() => onOpenChange(false)}
        >
          <div
            className="flex h-full w-full max-w-md flex-col border-l border-[#E6E1D8] bg-[#FAF8F5] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6E1D8] bg-white px-5 py-4">
              <div>
                <h2 className="font-editorial text-lg font-semibold text-[#18181B]">
                  Portfolio Assistant
                </h2>
                <p className="text-xs text-[#71717A]">
                  Grounded in {profile.name}&apos;s actual resume &amp; boards
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close AI Portfolio Assistant"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E1D8] text-[#18181B] hover:bg-[#F2EFE9]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Starter prompts */}
            <div className="border-b border-[#E6E1D8] bg-[#F2EFE9]/60 px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                Suggested Questions
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    disabled={loading}
                    onClick={() => void askQuestion(q)}
                    className="rounded-lg border border-[#E6E1D8] bg-white px-2.5 py-1 text-left text-xs text-[#18181B] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat log */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#2563EB] text-white'
                        : 'border border-[#E6E1D8] bg-white text-[#18181B]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-[#E6E1D8] bg-white px-4 py-3 text-sm text-[#52525B]">
                    <Loader2 className="h-4 w-4 animate-spin text-[#2563EB]" aria-hidden="true" />
                    <span>Checking Krishna&apos;s profile...</span>
                  </div>
                </div>
              )}
              {error && (
                <div role="alert" className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-3 text-xs text-[#991B1B]">
                  {error}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void askQuestion(input);
              }}
              className="border-t border-[#E6E1D8] bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <label htmlFor="assistant-input" className="sr-only">
                  Ask a question about Krishna Ladva
                </label>
                <input
                  id="assistant-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about NextAura, skills, education..."
                  className="w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send question"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
