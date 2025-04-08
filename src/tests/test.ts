import { Register } from "../services/patientServices"

const Samuel = Register.register({
    name: 'Samuel da Penha Nascimento',
    dob: new Date('2006-04-19'),
    cpf: '100.165.043-30'
})

console.log(Samuel)