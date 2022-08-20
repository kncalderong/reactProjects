import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../ComplaintsBook';
import { ComplaintsBookFormRadioBlock } from '../../../typings/complaints-book-form-radio-block';

const FormRadioBlock: StorefrontFunctionComponent<
    ComplaintsBookFormRadioBlock
> = ({ name, labels, handleChange, value, options }) => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div
            className={`flex flex-wrap ${handles.complaintsBookRadioContainer} w-100`}
        >
            {options.map((item: string, idx: number) => {
                return (
                    <label htmlFor={item}>
                        <input
                            type="radio"
                            name={name}
                            value={item}
                            id={item}
                            required
                            onChange={handleChange}
                            checked={value === item}
                            className={`${handles.complaintsBookRadioItem}`}
                        />
                        {labels[idx]}
                    </label>
                );
            })}
        </div>
    );
};

export default FormRadioBlock;
