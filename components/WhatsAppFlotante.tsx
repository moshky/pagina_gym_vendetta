export default function WhatsAppFlotante() {
    return (
        <a
            href="https://wa.me/593984425964"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg transition hover:scale-110"
            aria-label="Escribenos por WhatsApp"
        >
            <img
                width="32"
                height="32"
                src="https://img.icons8.com/color/48/whatsapp--v1.png"
                alt="WhatsApp"
            />
        </a>
    );
}