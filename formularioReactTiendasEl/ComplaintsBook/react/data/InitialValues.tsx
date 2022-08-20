import { ComplaintsBookForm } from '../typings/complaints-book';

/*Initial component state to handle most of the inputs*/
let initialState: ComplaintsBookForm = {
    time: '',
    correlativeNumber: '',
    storeName: 'TIENDA EL ON-LINE',
    storeCode: 'V-000',
    storeAddress: 'TIENDA EL ON-LINE',
    rucStoreNumber: '20100108705',
    name: '',
    lastName: '',
    documentType: 'DNI',
    documentNumber: null,
    departamento: '',
    provincia: '',
    distrito: '',
    address: '',
    phone: null,
    email: '',
    representative: '',
    requestDetails: 'producto',
    requestNumber: null,
    requestPrice: null,
    claimDetails: 'reclamo',
    claimDescription: '',
    clientOrder: '',
    providerActions: '',
};

/*initial option values for select inputs*/
let documentTypes = ['DNI', 'carnet de extranjeria'];
let requestDetailsTypes = ['producto', 'servicio'];
let requestDetailsLabels = ['Producto', 'Servicio'];
let claimDetailsTypes = ['reclamo', 'queja'];
let claimDetailsLabels = [
    'Reclamo (disconformidad relacionada a los productos o servicios).',
    'Queja (disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público).',
];
let departamentos = [
    'Amazonas',
    'Ancash',
    'Apurimac',
    'Arequipa',
    'Ayacucho',
    'Cajamarca',
    'Callao',
    'Cusco',
    'Huancavelica',
    'Huanuco',
    'Ica',
    'Junin',
    'La Libertad',
    'Lambayeque',
    'Lima',
    'Loreto',
    'Tumbes',
    'Ucayali',
    'Moquegua',
    'San Martin',
    'Madre De Dios',
    'Pasco',
    'Piura',
    'Puno',
    'Tacna',
];

let rucStoreNumber = '20100108705';

export {
    initialState,
    documentTypes,
    requestDetailsTypes,
    requestDetailsLabels,
    claimDetailsTypes,
    claimDetailsLabels,
    departamentos,
    rucStoreNumber,
};
