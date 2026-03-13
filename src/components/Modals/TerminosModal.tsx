import { LuX } from 'react-icons/lu'

type TerminosModalProps = {
    onClose: () => void
}

export function TerminosModal({ onClose }: TerminosModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />

            <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 px-4 sm:px-6">
                    <h2 className="text-xl font-bold text-title sm:text-2xl">Términos y Condiciones</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 transition-colors hover:bg-zinc-100"
                        aria-label="Cerrar términos"
                    >
                        <LuX className="h-6 w-6 text-zinc-600" />
                    </button>
                </div>

                <div className="custom-scrollbar overflow-y-auto p-5 text-[15px] leading-relaxed text-zinc-700 sm:p-8">
                    <h2 className="mb-4 text-center text-lg font-bold text-zinc-900">
                        Términos y Condiciones de Uso
                    </h2>
                    
                    <h3 className="mt-6 mb-2 font-bold text-zinc-900">INFORMACIÓN RELEVANTE</h3>
                    <p className="mb-4">
                        Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todas los productos que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña.
                    </p>
                    <p className="mb-4">
                        El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. Unicash no asume la responsabilidad en caso de que entregue dicha clave a terceros.
                    </p>
                    <p className="mb-4">
                        Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.
                    </p>
                    <p className="mb-4">
                        Los precios de los productos ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en este sitio web.
                    </p>

                    <h3 className="mt-6 mb-2 font-bold text-zinc-900">LICENCIA</h3>
                    <p className="mb-4">
                        Unicash a través de su sitio web concede una licencia para que los usuarios utilicen los productos que son vendidos en este sitio web de acuerdo a los Términos y Condiciones que se describen en este documento.
                    </p>

                    <h3 className="mt-6 mb-2 font-bold text-zinc-900">USO NO AUTORIZADO</h3>
                    <p className="mb-4">
                        En caso de que aplique (para venta de software, templetes, u otro producto de diseño y programación) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo.
                    </p>

                    <h3 className="mt-6 mb-2 font-bold text-zinc-900">PROPIEDAD</h3>
                    <p className="mb-4">
                        Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ningún tipo de garantía, expresa o implícita. En ningún esta compañía será responsables de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos.
                    </p>

                    <h3 className="mt-6 mb-2 font-bold text-zinc-900">POLÍTICA DE REEMBOLSO Y GARANTÍA</h3>
                    <p className="mb-4">
                        En el caso de productos que sean mercancías irrevocables no-tangibles, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo. Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente. La garantía no cubre averías o daños ocasionados por uso indebido. Los términos de la garantía están asociados a fallas de fabricación y funcionamiento en condiciones normales de los productos y sólo se harán efectivos estos términos si el equipo ha sido usado correctamente. Esto incluye:
                    </p>
                    <ul className="mb-4 ml-6 list-disc [&>li]:mb-1">
                        <li>De acuerdo a las especificaciones técnicas indicadas para cada producto.</li>
                        <li>En condiciones ambientales acorde con las especificaciones indicadas por el fabricante.</li>
                        <li>En uso específico para la función con que fue diseñado de fábrica.</li>
                        <li>En condiciones de operación eléctricas acorde con las especificaciones y tolerancias indicadas.</li>
                    </ul>

                    <h3 className="mt-6 mb-2 font-bold text-zinc-900">COMPROBACIÓN ANTIFRAUDE</h3>
                    <p className="mb-4">
                        La compra del cliente puede ser aplazada para la comprobación antifraude. También puede ser suspendida por más tiempo para una investigación más rigurosa, para evitar transacciones fraudulentas.
                    </p>

                    <h3 className="mt-6 mb-2 font-bold text-zinc-900">PRIVACIDAD</h3>
                    <p className="mb-4">
                        Este Unicash garantiza que la información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.
                    </p>
                    <p className="mb-4">
                        La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta.
                    </p>
                    <p className="mb-4">
                        Unicash reserva los derechos de cambiar o de modificar estos términos sin previo aviso.
                    </p>
                </div>

                <div className="border-t border-zinc-200 bg-zinc-50 p-4 sm:p-6 text-center">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-button-primary px-8 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-title active:scale-[0.98] sm:text-lg"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    )
}