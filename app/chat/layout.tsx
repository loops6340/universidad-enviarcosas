import FormularioAntiBot from "@/components/FormularioAntiBot";

function ChatLayout({ children }: { children: any }) {
    return (
        <>
            {/* <FormularioAntiBot /> */}
            {children}
        </>
    )
}

ChatLayout.defaultProps = {
    route: "chat"
}

export default ChatLayout;