const moment = require('moment');

export default function calculateAge(day: string, month: string, year: string) {
    const age = moment().diff(`${year}-${month}-${day}`, 'years');
    return age;
}