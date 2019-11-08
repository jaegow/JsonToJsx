import React, { useState } from 'react';
import { useField } from 'formik';
import uniqueId from 'lodash/uniqueId';
import { buildLoggers } from '../../utils/log';

const { log } = buildLoggers('CheckboxGroup');

const CheckboxGroup = ({ label, options = [], setFieldValue, placeholder, success, ...props }) => {
  const [id] = useState(() => uniqueId('checkbox-group-id-'));
  const [field, meta] = useField(props);

  return (
    <fieldset className="field">
      <legend>{label}</legend>
      <div className="field--horizontal">
        {
          options.map(({ value, text }) => {
            const radio_item_id = `${id}${value}`;
            const is_selected = field.value === value;
            const is_selected_class = is_selected ? 'is-selected' : '';
            // log({radio_item_id, is_selected, is_selected_class})
            return (
              <div className={`checkbox-set ${is_selected_class}`} key={`${id}-${text}-${value}`}>
                <input
                  type="checkbox"
                  id={radio_item_id}
                  name={field.name}
                  value={value}
                  checked={is_selected}
                  onBlur={field.onBlur}
                  onChange={() => setFieldValue(field.name, value)}
                />
                <label htmlFor={radio_item_id}>{text}</label>
              </div>
            );
          })
        }
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
