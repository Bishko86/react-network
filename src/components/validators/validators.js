export const required = value => (value ? undefined : 'Required');
export const maxLengthInput = maxLength => value => (
    value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
)
export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);