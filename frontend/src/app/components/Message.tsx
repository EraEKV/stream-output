import React from 'react'

type MessageProps = {
    sender: string;
    text: string;
}

const Message = (props: MessageProps) => {
    const { sender, text } = props;

    return (
        <div>
            {sender === 'me' ? (
                <div className="flex items-start gap-4 justify-end">
                    <div className="bg-black text-base rounded-lg p-4 max-w-[80%] text-white">
                        {/* <p>I'm looking for information on the latest advancements in AI technology.</p> */}
                        <p> { text } </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-start gap-4">
                    <div className="bg-gray-300 rounded-lg p-4 max-w-[80%]">
                        {/* <p>Hello! How can I assist you today?</p> */}
                        <p> { text } </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Message