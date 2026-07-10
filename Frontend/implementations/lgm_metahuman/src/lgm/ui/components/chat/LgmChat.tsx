import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../../stores/LgmStore';
import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { Send } from '@mui/icons-material';
import useWave from 'use-wave';
import { LgmChatMessages } from './LgmChatMessages';

export const LgmChat = observer(() => {
    const store = useContext(LgmStoreContext);
    const [text, setText] = useState('');
    const wave = useWave();
    const messagesRef = useRef<HTMLDivElement>(null);

    // Follow new messages only while the user is at (or near) the bottom -
    // scrolling back to read history must not be hijacked.
    const messageCount = store.chat.messages.length;
    useEffect(() => {
        const el = messagesRef.current;
        if (!el) return;
        const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
        if (nearBottom) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messageCount]);

    return <div style={RootStyle}>
        <div style={HeaderStyle}>Chat</div>
        <div ref={messagesRef} style={MessagesContainerStyle}>
            {/* spacer keeps a short conversation anchored to the bottom
                without justify-content:end, which breaks scrolling */}
            <div style={{ marginTop: 'auto' }} />
            <LgmChatMessages/>
        </div>
        <div style={TextboxContainerStyle}>
            <input
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && text.length > 0) {
                        store.chat.send(text);
                        setText('');
                    }
                }}
                onChange={(e) => setText(e.target.value)}
                value={text}
                type={'text'}
                style={TextboxStyle}
                placeholder={'Type a message...'}
            />
            <div
                className={'hoverable'}
                ref={wave}
                onClick={() => {
                    if (text.length > 0) {
                        store.chat.send(text);
                        setText('');
                    }
                }}
                style={TextboxSendButtonStyle}>
                <Send />
            </div>
        </div>
    </div>;
});

const RootStyle: CSSProperties = {
    borderRadius: 16,
    border: '1px solid #3c3c3c',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: 8,
    flexBasis: 0,
};

const HeaderStyle: CSSProperties = {
    height: 54,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20
};

const MessagesContainerStyle: CSSProperties = {
    flexGrow: 1,
    height: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    overflowY: 'auto',
    margin: '16px 0 16px 0',
};

const TextboxContainerStyle: CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 54,
    borderRadius: 16,
    display: 'flex',
    padding: '0 8px 0 8px',
    alignItems: 'center'
};

const TextboxStyle: CSSProperties = {
    flexGrow: 1,
    width: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    height: '100%',
    color: 'white',
    fontSize: 14,
};

const TextboxSendButtonStyle: CSSProperties = {
    borderRadius: 100,
    width: 40,
    height: 40,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};