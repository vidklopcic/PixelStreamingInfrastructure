import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../../stores/LgmStore';
import { CSSProperties, useContext } from 'react';

export const LgmChatMessages = observer(() => {
    const store = useContext(LgmStoreContext);
    return <>
        {store.chat.messages.map((message, index) => {
            const isSelf = message.from === store.user.id;
            return <div key={message.id} style={{
                alignSelf: isSelf ? 'end' : 'start',
                ...MessageStyle,
                borderTopLeftRadius: isSelf ? 16 : 0,
                borderBottomRightRadius: isSelf ? 0 : 16,
            }}>
                {message.message}
            </div>;
        })}
    </>;
});

const MessageStyle: CSSProperties = {
    borderRadius: 16,
    padding: 16,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    fontWeight: 'normal',
    fontSize: 14
};