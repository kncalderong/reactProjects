import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../ComplaintsBook';
import { ComplaintsBookFormBlock } from '../../../typings/complaints-book-form-block';

const FormBlock: StorefrontFunctionComponent<ComplaintsBookFormBlock> = ({
    name,
    label,
    isRequired,
    type,
    handleChange,
    value,
    isDocument,
    isPhone,
}) => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div
            className={`${handles.complaintsBookFormBlock} flex flex-column w-100`}
        >
            <label
                htmlFor={name}
                className={`b ${handles.complaintsBookFormLabel}`}
            >
                {label}
            </label>
            <input
                type={type}
                className={`${handles.complaintsBookFormInput}`}
                name={name}
                onChange={handleChange}
                value={value}
                required={isRequired}
                minLength={isDocument ? 8 : isPhone ? 7 : 0}
                maxLength={isDocument ? 12 : 100}
            />
            {isRequired && (
                <label
                    htmlFor={name}
                    className={` ${handles.complaintsBookFormLabelRequired}`}
                >
                    * Campo obligatorio
                </label>
            )}
        </div>
    );
};

export default FormBlock;
