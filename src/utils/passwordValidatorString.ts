
export default function passwordValidator(password: string): boolean {
    const arrayPassword = password.split('');
    const isValid = arrayPassword.some((value) => {
        const newValue = parseInt(value);
        return isNaN(newValue);
    });
    return isValid;
}