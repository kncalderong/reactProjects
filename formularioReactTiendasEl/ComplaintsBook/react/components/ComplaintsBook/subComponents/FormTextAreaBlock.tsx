import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../ComplaintsBook';
import { ComplaintsBookFormTextareaBlock } from '../../../typings/complaints-book-fom-textarea';

const FormTextAreaBlock: StorefrontFunctionComponent<
    ComplaintsBookFormTextareaBlock
> = ({ name, label, isRequired, max, handleChange, value }) => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div
            className={`${handles.complaintsBookTextarea} flex flex-column w-100`}
        >
            <label
                htmlFor={name}
                className={`b ${handles.complaintsBookFormLabel}`}
            >
                {label}
            </label>
            <textarea
                className={`${handles.complaintsBookTextareaSpace}`}
                name={name}
                onChange={handleChange}
                value={value}
                required={isRequired}
                rows={5}
                maxLength={max}
            />
            {isRequired && (
                <label
                    htmlFor={name}
                    className={` ${handles.complaintsBookTextareaMaximum}`}
                >
                    {`${max} máx`}
                </label>
            )}
        </div>
    );
};

export default FormTextAreaBlock;
