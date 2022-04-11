import { validate } from 'gerador-validador-cpf'

export default function cpfValidator(value: string): boolean {
    return validate(value);
}