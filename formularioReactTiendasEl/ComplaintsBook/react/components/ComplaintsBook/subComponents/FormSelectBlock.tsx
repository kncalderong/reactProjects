import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../ComplaintsBook';
import { ComplaintsBookFormSelectBlock } from '../../../typings/complaints-book-form-select-block';

const FormSelectBlock: StorefrontFunctionComponent<
    ComplaintsBookFormSelectBlock
> = ({ name, label, isRequired, handleChange, value, options, isLocation }) => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div
            className={`${handles.complaintsBookFormBlock} flex flex-column w-100`}
        >
            {label && (
                <label
                    htmlFor={name}
                    className={`b ${handles.complaintsBookFormLabel}`}
                >
                    {label}
                </label>
            )}
            <select
                className={`${handles.complaintsBookFormSelectInput}`}
                name={name}
                onChange={handleChange}
                value={value}
                required
            >
                {isLocation && <option disabled selected></option>}
                {options?.map((item: string, idx: number) => {
                    return (
                        <option value={item} key={idx}>
                            {item}
                        </option>
                    );
                })}
            </select>

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

export default FormSelectBlock;
