export default function ContactoPage() {
    return (
        <section className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="mb-2 text-center font-display text-4xl text-blanco">
                CONTACTANOS
            </h1>
            <p className="mb-12 text-center text-gris">
                Visitanos, escribenos o llamanos.
            </p>

            <div className="grid gap-10 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <div className="rounded border border-rojo-oscuro bg-negro p-6">
                        <h2 className="mb-2 font-display text-xl text-blanco">
                            Telefono
                        </h2>
                        <p className="text-blanco">+593 984425964</p>
                    </div>

                    <div className="rounded border border-rojo-oscuro bg-negro p-6">
                        <h2 className="mb-2 font-display text-xl text-blanco">
                            Horario
                        </h2>
                        <p className="text-blanco">Lunes a sabado: 6:00 am - 11:00 pm</p>
                    </div>

                    <div className="rounded border border-rojo-oscuro bg-negro p-6">
                        <h2 className="mb-2 font-display text-xl text-blanco">
                            Direccion
                        </h2>
                        <p className="text-blanco">Quito, Ecuador</p>
                    </div>
                </div>

                <div className="overflow-hidden rounded border border-rojo-oscuro">
                    <iframe
                        src="https://www.google.com/maps?q=Equinoccial+Center,Quito,Ecuador&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: "320px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}