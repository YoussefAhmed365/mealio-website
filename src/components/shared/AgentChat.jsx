// src/components/shared/AgentChat.jsx
import { useState, useRef, useEffect } from 'react';
import '../../assets/css/AgentChat.css';

const AgentChat = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState([]);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat, loading]);

    // Auto-resize textarea
    useEffect(() => {
        const ta = textareaRef.current;
        if (ta) {
            ta.style.height = 'auto';
            ta.style.height = Math.min(ta.scrollHeight, 140) + 'px';
        }
    }, [prompt]);

    const handleAskAgent = async () => {
        if (!prompt.trim()) return;
        const currentPrompt = prompt;
        setPrompt('');
        setLoading(true);
        setChat(prev => [...prev, { type: 'user', text: currentPrompt }]);

        try {
            const res = await fetch('http://localhost:5000/api/agent/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    prompt: currentPrompt,
                    history: chat.map(msg => ({
                        role: msg.type === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.text }]
                    }))
                }),
            });

            if (!res.ok) {
                setLoading(false);
                setChat(prev => [...prev, { type: 'agent', text: 'Sorry, I couldn\'t process that request. Please try again.' }]);
                return;
            }

            setLoading(false);
            setChat(prev => [...prev, { type: 'agent', text: '' }]);

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let accumulatedText = "";
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const parts = buffer.split('\n\n');
                
                // The last part might be incomplete, so we keep it in the buffer
                buffer = parts.pop() || "";

                for (const part of parts) {
                    const lines = part.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.slice(6).trim();
                            if (dataStr === '[DONE]') continue;
                            if (dataStr) {
                                try {
                                    const parsed = JSON.parse(dataStr);
                                    if (parsed.text) {
                                        accumulatedText += parsed.text;
                                        setChat(prev => {
                                            const newChat = [...prev];
                                            newChat[newChat.length - 1] = { ...newChat[newChat.length - 1], text: accumulatedText };
                                            return newChat;
                                        });
                                    } else if (parsed.error) {
                                        accumulatedText += "\n\n" + parsed.error;
                                        setChat(prev => {
                                            const newChat = [...prev];
                                            newChat[newChat.length - 1] = { ...newChat[newChat.length - 1], text: accumulatedText };
                                            return newChat;
                                        });
                                    }
                                } catch (e) {
                                    console.error('Error parsing JSON chunk', e, dataStr);
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setLoading(false);
            setChat(prev => [...prev, { type: 'agent', text: 'A network error occurred. Please check your connection and try again.' }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAskAgent();
        }
    };

    // Lightweight markdown renderer for agent responses
    const renderMessageText = (text, isAgent) => {
        if (!isAgent) {
            return text.split('\n').map((line, i) => (
                <span key={i}>
                    {line}
                    {i < text.split('\n').length - 1 && <br />}
                </span>
            ));
        }

        const lines = text.split('\n');
        return lines.map((line, i) => {
            // Headings
            if (line.startsWith('### ')) {
                return <h4 key={i} style={{ fontSize: '0.95rem', fontWeight: 700, margin: '12px 0 4px', color: '#92400e' }}>{parseBold(line.slice(4))}</h4>;
            }
            if (line.startsWith('## ')) {
                return <h3 key={i} style={{ fontSize: '1.05rem', fontWeight: 700, margin: '14px 0 4px', color: '#78350f' }}>{parseBold(line.slice(3))}</h3>;
            }
            // Bullet points
            if (line.startsWith('* ') || line.startsWith('- ')) {
                return (
                    <div key={i} style={{ display: 'flex', gap: 8, marginLeft: 4, marginTop: 2 }}>
                        <span style={{ color: '#d97706', fontWeight: 700, flexShrink: 0 }}>•</span>
                        <span>{parseBold(line.slice(2))}</span>
                    </div>
                );
            }
            // Numbered list
            const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
            if (numberedMatch) {
                return (
                    <div key={i} style={{ display: 'flex', gap: 8, marginLeft: 4, marginTop: 4 }}>
                        <span style={{ color: '#d97706', fontWeight: 700, flexShrink: 0, minWidth: 18 }}>{numberedMatch[1]}.</span>
                        <span>{parseBold(numberedMatch[2])}</span>
                    </div>
                );
            }
            // Empty line → spacer
            if (line.trim() === '') {
                return <div key={i} style={{ height: 8 }} />;
            }
            // Bold text
            if (line.startsWith('*') && line.endsWith('*')) {
                return <strong key={i} style={{ fontWeight: 700, color: '#92400e' }}>{line.slice(2, -2)}</strong>;
            }
            // Normal paragraph
            return <p key={i} style={{ margin: '2px 0' }}>{parseBold(line)}</p>;
        });
    };

    // Parse **bold** segments within a line
    const parseBold = (text) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} style={{ fontWeight: 700, color: '#92400e' }}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="agent-chat">

            {/* Messages */}
            {chat.length === 0 ? (
                <div className="agent-chat__empty">
                    <div className="agent-chat__empty-icon">
                        {/* Sparkle SVG */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3v1m0 16v1m-7.07-2.93l.71-.71M4.22 5.64l.71.71m14.14 0l-.71.71M18.36 18.36l-.71-.71M3 12h1m16 0h1" />
                            <circle cx="12" cy="12" r="4" />
                        </svg>
                    </div>
                    <h2 className="agent-chat__empty-title">Mealio AI Assistant</h2>
                    <p className="agent-chat__empty-subtitle">
                        Ask me about meal plans, recipes, nutrition tips, or anything food-related. I'm here to help!
                    </p>
                    <div className="agent-chat__suggestions">
                        {['Suggest a healthy breakfast', 'High protein lunch ideas', 'Quick dinner recipes'].map((s) => (
                            <button
                                key={s}
                                className="agent-chat__chip"
                                onClick={() => { setPrompt(s); }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="agent-chat__messages">
                    {chat.map((message, index) => (
                        <div
                            key={index}
                            className={`agent-chat__row ${message.type === 'user' ? 'agent-chat__row--user' : ''}`}
                        >
                            {/* Avatar */}
                            <div className={`agent-chat__avatar ${message.type === 'agent' ? 'agent-chat__avatar--agent' : 'agent-chat__avatar--user'}`}>
                                {message.type === 'agent' ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 3v1m0 16v1m-7.07-2.93l.71-.71M4.22 5.64l.71.71m14.14 0l-.71.71M18.36 18.36l-.71-.71M3 12h1m16 0h1" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                )}
                            </div>

                            {/* Bubble */}
                            <div className={`agent-chat__bubble ${message.type === 'agent' ? 'agent-chat__bubble--agent' : 'agent-chat__bubble--user'}`}>
                                {renderMessageText(message.text, message.type === 'agent')}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                        <div className="agent-chat__typing-row">
                            <div className="agent-chat__avatar agent-chat__avatar--agent">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 3v1m0 16v1m-7.07-2.93l.71-.71M4.22 5.64l.71.71m14.14 0l-.71.71M18.36 18.36l-.71-.71M3 12h1m16 0h1" />
                                </svg>
                            </div>
                            <div className="agent-chat__typing-bubble">
                                <div className="agent-chat__typing-dot" />
                                <div className="agent-chat__typing-dot" />
                                <div className="agent-chat__typing-dot" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            )}

            {/* Input */}
            <div className="agent-chat__input-area">
                <div className="agent-chat__input-wrapper">
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything about meals..."
                        rows={1}
                        className="agent-chat__textarea"
                        id="agent-chat-input"
                    />
                    <button
                        onClick={handleAskAgent}
                        disabled={loading || !prompt.trim()}
                        className="agent-chat__send-btn"
                        id="agent-chat-send"
                        aria-label="Send message"
                    >
                        {loading ? (
                            <svg className="agent-chat__send-btn--loading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentChat;