import { BsExclamationCircle } from "react-icons/bs";

export const required = value => (value ? undefined : <BsExclamationCircle />);
export const maxLengthInput = maxLength => value => (
    value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
)
export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);