import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../../stores/LgmStore';
import { CSSProperties, useContext } from 'react';

export const LgmChatMessages = observer(() => {
    const store = useContext(LgmStoreContext);
    return <>
        {store.chat.messages.map((message, index) => {
            const isSelf = store.user.role === message.role;
            return <div key={message.id} style={{
                alignSelf: isSelf ? 'end' : 'start',
                ...MessageStyle,
                borderTopLeftRadius: isSelf ? 16 : 0,
                borderBottomRightRadius: isSelf ? 0 : 16
            }}>
                {message.message}
                <div style={RoleStyle}>{message.user} ({message.role})</div>
            </div>;
        })}
    </>;
});

const MessageStyle: CSSProperties = {
    borderRadius: 16,
    padding: '24px 16px 16px 16px',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    fontWeight: 'normal',
    fontSize: 14,
    position: 'relative',
};

const RoleStyle: CSSProperties = {
    position: 'absolute',
    top: 8,
    left: 16,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.5)',
}