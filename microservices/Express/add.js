const axios = require('axios')

const data = [
    {name: 'mleko', surname: 'mleczne', job: 'farmer'}
];

const addPerson = async() => {
    const url = 'http://localhost:3000/create';
    for (const person of data) {
        const response = await axios.post(url, person)
    }
}
