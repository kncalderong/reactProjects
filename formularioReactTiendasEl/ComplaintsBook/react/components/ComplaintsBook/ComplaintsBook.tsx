/*essential imports */
import React, { useState, useEffect } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import axios from 'axios';

/*typeScript interfaces */
import { ComplaintsBookProvinciasJSON } from '../../typings/complaints-book-provincias-json';

/*subcomponents */
import FormBlock from './subComponents/FormBlock';
import FormSelectBlock from './subComponents/FormSelectBlock';
import Timer from './subComponents/Timer';
import FormRadioBlock from './subComponents/FormRadioBlock';
import FormTextAreaBlock from './subComponents/FormTextAreaBlock';
import FormImportantTextBlock from './subComponents/FormImportantTextBlock';

/*data from distritos, tiendas and initialvalues*/
import DistritosPeruJSON from '../../data/DistritosPeruJSON.json';
import TiendasElPeru from '../../data/TiendasElPeru.json';
import {
    initialState,
    documentTypes,
    requestDetailsTypes,
    requestDetailsLabels,
    claimDetailsTypes,
    claimDetailsLabels,
    departamentos,
    rucStoreNumber,
} from '../../data/InitialValues';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */
export const CSS_HANDLES = [
    'complaintsBookContainer',
    'complaintsBookTitle',
    'complaintsBookSubtitle',
    'complaintsBookMainRow',
    'complaintsBookFormBlock',
    'complaintsBookFormLabel',
    'complaintsBookFormLabelRequired',
    'complaintsBookFormInput',
    'complaintsBookFormSelectInput',
    'complaintsBookFormLocationLine',
    'complaintsBookRUCText',
    'complaintsBookInitialInfo',
    'complaintsBookInitialInfoLabel',
    'complaintsBookInitialInfoValue',
    'complaintsBookInitialInfoSelectForm',
    'complaintsBookRadioContainer',
    'complaintsBookRadioItem',
    'complaintsBookTextarea',
    'complaintsBookTextareaSpace',
    'complaintsBookTextareaMaximum',
    'complaintsBookImportantText',
    'complaintsBookImportantTextParagraph',
    'complaintsBookImportantTextLink',
    'complaintsBookClaimDetails',
    'complaintsBookRequestDetails',
    'complaintsBookSubmitButton',
] as const;

/**
 * declaracion del componente
 */
const ComplaintsBook: StorefrontFunctionComponent = () => {
    const handles = useCssHandles(CSS_HANDLES);

    /*basic states to handle form info */
    const [formObject, setFormObject] = useState(initialState);
    const [departamento, setDepartamento] = useState('');
    const [provincia, setProvincia] = useState('');
    const [distrito, setDistrito] = useState('');
    const [correlativeNumber, setCorrelativeNumber] = useState('');
    const [storeName, setStoreName] = useState('TIENDA EL ON-LINE');
    const [storeCode, setStoreCode] = useState('V-000');
    const [storeAddress, setStoreAddress] = useState('TIENDA EL ON-LINE');
    const [documentNumber, setDocumentNumber] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    /* options for 'select' inputs*/
    const [opcionesProvincias, setOpcionesProvincias] = useState<any>([]);
    const [opcionesDistritos, setOpcionesDistritos] = useState<any>([]);
    const [opcionesTiendas, setOpcionesTiendas] = useState<any>([]);

    /*function to get all correlative numbers and check if its not already in masterdata */
    let checkCorrelative = async () => {
        const urlGetDocuments =
            '/api/dataentities/entidadreclamos1/search?_fields=_all';
        let getRandomNumber = () => {
            return Math.floor(100000 + Math.random() * 900000);
        };
        let randomNumber = getRandomNumber();
        try {
            let res = await axios.get(urlGetDocuments);
            let currentRelativeNumbers = res.data.map((item: any) => {
                return item.correlativeNumber;
            });
            let randomCorrelativeNumber = `LR-${randomNumber}`;

            while (currentRelativeNumbers.includes(randomCorrelativeNumber)) {
                randomNumber = getRandomNumber();
                randomCorrelativeNumber = `LR-${randomNumber}`;
            }
            setCorrelativeNumber(randomCorrelativeNumber);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        checkCorrelative();
    }, []);

    /*function to post the form to masterdata */
    let submitForm = async (objectToSubmit: Object) => {
        const urlPost =
            '/api/dataentities/entidadreclamos1/documents?_schema=esquemareclamos2';
        try {
            let res = await axios.post(urlPost, objectToSubmit);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    /*function to handle all info for the post request of the form */
    let handleSubmit = (e: any) => {
        let objectToSubmit = {
            time: new Date().toLocaleString(),
            correlativeNumber: correlativeNumber,
            storeName: storeName,
            storeCode: storeCode,
            storeAddress: storeAddress,
            rucStoreNumber: rucStoreNumber,
            name: formObject.name,
            lastName: formObject.lastName,
            documentType: formObject.documentType,
            documentNumber: documentNumber,
            departamento: departamento,
            provincia: provincia,
            distrito: distrito,
            address: formObject.address,
            phone: phoneNumber,
            email: formObject.email,
            representative: formObject.representative,
            requestDetails: formObject.requestDetails,
            requestNumber: +formObject.requestNumber,
            requestPrice: +formObject.requestPrice,
            claimDetails: formObject.claimDetails,
            claimDescription: formObject.claimDescription,
            clientOrder: formObject.clientOrder,
            providerActions: formObject.providerActions,
        };
        e.preventDefault();
        submitForm(objectToSubmit);
    };

    /*listener to load initial stores from base file */
    useEffect(() => {
        let storeNames = TiendasElPeru.map((item: any) => {
            return item.name;
        });
        setOpcionesTiendas(storeNames);
    }, []);

    /*function to filter stores */
    let handleStores = (e: any) => {
        let storeName = e.target.value;
        let storeCode = TiendasElPeru.filter((item: any) => {
            return item.name === storeName;
        })[0].cod;
        let storeAddress = TiendasElPeru.filter((item: any) => {
            return item.name === storeName;
        })[0].address;
        setStoreName(storeName);
        setStoreCode(storeCode);
        setStoreAddress(storeAddress);
    };

    /*function to handle the change of values in the main state of the form*/
    let handleChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'departamento') {
            setDepartamento(value);
        }
        if (name === 'provincia') {
            setProvincia(value);
        }
        if (name === 'distrito') {
            setDistrito(value);
        }
        setFormObject((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    /*function to handle change of values in phone and document (only numbers with a maximum of characters 'like text') */
    let handleDocumentPhoneChange = (e: any) => {
        let value = e.target.value.replace(/\D/g, '');
        const name = e.target.name;
        if (name === 'documentNumber') {
            value = +value;
            setDocumentNumber(value);
        }
        if (name === 'phone') {
            value = +value;
            setPhoneNumber(value);
        }
    };

    /*listener to change provincias  */
    useEffect(() => {
        let provincias = Array.from(
            new Set(
                DistritosPeruJSON.filter(
                    (item: ComplaintsBookProvinciasJSON) => {
                        return item.departamento === departamento
                            ? item.provincia
                            : null;
                    }
                ).map((item: ComplaintsBookProvinciasJSON) => item.provincia)
            )
        );
        setOpcionesProvincias(provincias);
        if (provincias) {
            if (typeof provincias[0] === 'string') {
                setProvincia(provincias[0]);
            }
        }
    }, [departamento]);

    /*listener to change distritos*/
    useEffect(() => {
        let distritos = Array.from(
            new Set(
                DistritosPeruJSON.filter(
                    (item: ComplaintsBookProvinciasJSON) => {
                        return item.provincia === provincia
                            ? item.distrito
                            : null;
                    }
                ).map((item: ComplaintsBookProvinciasJSON) => item.distrito)
            )
        );
        setOpcionesDistritos(distritos);
        if (distritos) {
            if (typeof distritos[0] === 'string') {
                setDistrito(distritos[0]);
            }
        }
    }, [provincia]);

    return (
        <React.Fragment>
            <div className={`${handles.complaintsBookContainer}`}>
                <div
                    className={`t-heading-3 flex tc items-center justify-center ${handles.complaintsBookTitle}`}
                >
                    LIBRO DE RECLAMACIONES
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div
                        className={`${handles.complaintsBookInitialInfo} w-100`}
                    >
                        <div
                            className={`flex items-center justify-start ${handles.complaintsBookMainRow} w-100`}
                        >
                            <span
                                className={`${handles.complaintsBookInitialInfoLabel}`}
                            >
                                Fecha y Hora de reclamo:
                            </span>
                            <Timer />
                        </div>
                        <div
                            className={`flex items-center justify-start ${handles.complaintsBookMainRow} w-100`}
                        >
                            <span
                                className={`${handles.complaintsBookInitialInfoLabel}`}
                            >
                                Número correlativo:
                            </span>
                            <div
                                className={`${handles.complaintsBookInitialInfoValue}`}
                            >
                                {correlativeNumber}
                            </div>
                        </div>
                        <div
                            className={`flex items-center justify-start ${handles.complaintsBookMainRow} w-100`}
                        >
                            <span
                                className={`${handles.complaintsBookInitialInfoLabel}`}
                            >
                                Nombre de Tienda:
                            </span>
                            <div
                                className={`${handles.complaintsBookInitialInfoSelectForm}`}
                            >
                                <FormSelectBlock
                                    name="storeName"
                                    label=""
                                    isRequired={false}
                                    handleChange={handleStores}
                                    value={storeName}
                                    options={opcionesTiendas}
                                    isLocation={false}
                                />
                            </div>
                        </div>
                        <div
                            className={`flex items-center justify-start ${handles.complaintsBookMainRow} w-100`}
                        >
                            <span
                                className={`${handles.complaintsBookInitialInfoLabel}`}
                            >
                                Código de Tienda:
                            </span>
                            <div
                                className={`${handles.complaintsBookInitialInfoValue}`}
                            >
                                {storeCode}
                            </div>
                        </div>
                        <div
                            className={`flex items-center justify-start ${handles.complaintsBookMainRow} w-100`}
                        >
                            <span
                                className={`${handles.complaintsBookInitialInfoLabel}`}
                            >
                                Dirección de Tienda:
                            </span>
                            <div
                                className={`${handles.complaintsBookInitialInfoValue}`}
                            >
                                {storeAddress}
                            </div>
                        </div>
                    </div>

                    <div className={`${handles.complaintsBookRUCText}`}>
                        EL S.A. RUC 20100108705
                    </div>
                    <h3 className={`${handles.complaintsBookSubtitle}`}>
                        Datos del cliente
                    </h3>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormBlock
                            name="name"
                            label="Nombre(s)"
                            isRequired={true}
                            type="text"
                            handleChange={handleChange}
                            value={formObject.name}
                            isDocument={false}
                            isPhone={false}
                        />
                        <FormBlock
                            name="lastName"
                            label="Apellidos"
                            isRequired={true}
                            type="text"
                            handleChange={handleChange}
                            value={formObject.lastName}
                            isDocument={false}
                            isPhone={false}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormSelectBlock
                            name="documentType"
                            label="Tipo de documento"
                            isRequired={true}
                            handleChange={handleChange}
                            value={formObject.documentType}
                            options={documentTypes}
                            isLocation={false}
                        />
                        <FormBlock
                            name="documentNumber"
                            label="Número de documento"
                            isRequired={true}
                            type="text"
                            handleChange={handleDocumentPhoneChange}
                            value={documentNumber}
                            isDocument={true}
                            isPhone={false}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookFormLocationLine}`}
                    >
                        <FormSelectBlock
                            name="departamento"
                            label="Departamento"
                            isRequired={true}
                            handleChange={handleChange}
                            value={departamento}
                            options={departamentos}
                            isLocation={true}
                        />
                        <FormSelectBlock
                            name="provincia"
                            label="Provincia"
                            isRequired={true}
                            handleChange={handleChange}
                            value={provincia}
                            options={opcionesProvincias}
                            isLocation={true}
                        />
                        <FormSelectBlock
                            name="distrito"
                            label="Distrito"
                            isRequired={true}
                            handleChange={handleChange}
                            value={distrito}
                            options={opcionesDistritos}
                            isLocation={true}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormBlock
                            name="address"
                            label="Dirección"
                            isRequired={true}
                            type="text"
                            handleChange={handleChange}
                            value={formObject.address}
                            isDocument={false}
                            isPhone={false}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormBlock
                            name="phone"
                            label="Teléfono"
                            isRequired={true}
                            type="text"
                            handleChange={handleDocumentPhoneChange}
                            value={phoneNumber}
                            isDocument={false}
                            isPhone={true}
                        />
                        <FormBlock
                            name="email"
                            label="E-mail"
                            isRequired={true}
                            type="email"
                            handleChange={handleChange}
                            value={formObject.email}
                            isDocument={false}
                            isPhone={false}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormBlock
                            name="representative"
                            label="Padre o Madre / Representante (en el caso que usted sea menor de edad):"
                            isRequired={false}
                            type="text"
                            handleChange={handleChange}
                            value={formObject.representative}
                            isDocument={false}
                            isPhone={false}
                        />
                    </div>
                    <h3 className={`${handles.complaintsBookSubtitle}`}>
                        DETALLES DE LA SOLICITUD
                    </h3>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100 ${handles.complaintsBookRequestDetails}`}
                    >
                        <FormRadioBlock
                            name="requestDetails"
                            labels={requestDetailsLabels}
                            handleChange={handleChange}
                            value={formObject.requestDetails}
                            options={requestDetailsTypes}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormBlock
                            name="requestNumber"
                            label="Número de pedido"
                            isRequired={false}
                            type="number"
                            handleChange={handleChange}
                            value={formObject.requestNumber}
                            isDocument={false}
                            isPhone={false}
                        />

                        <FormBlock
                            name="requestPrice"
                            label="Monto reclamado"
                            isRequired={false}
                            type="number"
                            handleChange={handleChange}
                            value={formObject.requestPrice}
                            isDocument={false}
                            isPhone={false}
                        />
                    </div>
                    <h3 className={`${handles.complaintsBookSubtitle}`}>
                        DETALLE DE LA RECLAMACIÓN
                    </h3>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} ${handles.complaintsBookClaimDetails} w-100`}
                    >
                        <FormRadioBlock
                            name="claimDetails"
                            labels={claimDetailsLabels}
                            handleChange={handleChange}
                            value={formObject.claimDetails}
                            options={claimDetailsTypes}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormTextAreaBlock
                            name="claimDescription"
                            label="Detalle"
                            max={1200}
                            isRequired={true}
                            handleChange={handleChange}
                            value={formObject.claimDescription}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormTextAreaBlock
                            name="clientOrder"
                            label="Pedido"
                            max={300}
                            isRequired={true}
                            handleChange={handleChange}
                            value={formObject.clientOrder}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center ${handles.complaintsBookMainRow} w-100`}
                    >
                        <FormTextAreaBlock
                            name="providerActions"
                            label="Observaciones y acciones adoptadas por el proveedor"
                            max={300}
                            isRequired={true}
                            handleChange={handleChange}
                            value={formObject.providerActions}
                        />
                    </div>
                    <h3 className={`${handles.complaintsBookSubtitle}`}>
                        IMPORTANTE
                    </h3>
                    <FormImportantTextBlock />
                    <div className={`${handles.complaintsBookMainRow} w-100`}>
                        <button
                            className={`${handles.complaintsBookSubmitButton}`}
                            type="submit"
                        >
                            ENVIAR
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

/**
 * propiedades por defecto del componete
 */
ComplaintsBook.defaultProps = {};

/**
 * esquema base del componenete esto habilita el site editor desde el admin
 */
ComplaintsBook.schema = {
    title: 'ComplaintsBook Peru',
    type: 'object',
    properties: {},
};

export default ComplaintsBook;
