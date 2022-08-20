import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../ComplaintsBook';

const FormImportantTextBlock: StorefrontFunctionComponent = () => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div
            className={`${handles.complaintsBookImportantText} flex flex-column w-100`}
        >
            <p
                className={`${handles.complaintsBookImportantTextParagraph} w-100`}
            >
                *&nbsp; El proveedor deberá dar respuesta al reclamo en un plazo
                no mayor de quince (15) días hábiles.
            </p>
            <p
                className={`${handles.complaintsBookImportantTextParagraph} w-100`}
            >
                *&nbsp;La formulación del reclamo no impide acudir a otras vías
                de solución de controversias ni es requisito previo para
                interponer una denuncia ante el INDECOPI.
            </p>
            <p
                className={`${handles.complaintsBookImportantTextParagraph} w-100`}
            >
                *&nbsp;Le informamos que la respuesta a su reclamo tendrá las
                acciones adoptadas y será remitida al correo electrónico o a los
                teléfonos de contacto registrados.
            </p>
            <p
                className={`${handles.complaintsBookImportantTextParagraph} w-100`}
            >
                &nbsp;Acepto las &nbsp;
                <a
                    href="#"
                    target={'_blank'}
                    className={`${handles.complaintsBookImportantTextLink}`}
                >
                    Política de Privacidad y tratamiento de Datos personales
                </a>
                &nbsp; y acepto las &nbsp;
                <a
                    href="#"
                    target={'_blank'}
                    className={`${handles.complaintsBookImportantTextLink}`}
                >
                    Políticas Privacidad de Datos
                </a>
                &nbsp; de Tiendas Él.
            </p>
        </div>
    );
};

export default FormImportantTextBlock;
