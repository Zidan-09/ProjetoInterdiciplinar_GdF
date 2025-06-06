import { EmployersConstrollerTest } from "./../ControllersForTest/hospitalStaffControllerTest";
import { chichi, bulma, goku, whis, chichiActivate, bulmaActivate, gokuActivate, whisActivate} from "./../parsesJson";
import { waitTime } from "./../ControllersForTest/utilTest";

export async function RegisterEmployeeTest() {
    console.log('###################################################################################\nCadastrando empregados...\n###################################################################################\n')
    await waitTime(3000);

    console.log('Cadastrando Recepcionista...');
    await EmployersConstrollerTest.register(chichi);
    console.log('Cadastro concluído!\n');
    await waitTime(5000);
    
    console.log('Cadastrando Enfermeira...');
    await EmployersConstrollerTest.register(bulma);
    console.log('Cadastro concluído!\n');
    await waitTime(5000);
    
    console.log('Cadastrando Médico...');
    await EmployersConstrollerTest.register(goku);
    console.log('Cadastro concluído!\n');
    await waitTime(5000);
    
    console.log('Cadastrando Administrador...');
    await EmployersConstrollerTest.register(whis);
    console.log('Cadastro concluído!\n');
    await waitTime(5000);
    
    console.log('###################################################################################\nAutenticando empregados...\n###################################################################################\n')
    await waitTime(3000);
    
    await EmployersConstrollerTest.authAccount(chichiActivate);
    await waitTime(2000)
    await EmployersConstrollerTest.authAccount(bulmaActivate);
    await waitTime(2000)
    await EmployersConstrollerTest.authAccount(gokuActivate);
    await waitTime(2000)
    await EmployersConstrollerTest.authAccount(whisActivate);
    await waitTime(2000)
    console.log('Empregados autenticados!\n')
}