export function ValidadeCPF(cpf: string): Boolean {
    const temp: string = cpf.replace(/\D/g,'');
    const base: number[] = [];
    let rep: number = 0;

    for (let i of temp) {
        if (rep === 9) {
            break
        } else {
            base.push(parseInt(i))
            rep++
        }
    }
    rep = 0;
    let total_1: number = 0
    for (let i: number = 10; i >= 2; i--) {
        total_1 += base[rep] * i;
        rep++
    }
    total_1 = total_1 % 11;
    if (total_1 === 11 || total_1 === 10 || total_1 < 2) {
        total_1 = 0;
    } else {
        total_1 = 11 - total_1
    }
    base.push(total_1);


    rep = 0;
    let total_2: number = 0
    for (let i: number = 11; i >= 2; i--) {
        total_2 += base[rep] * i;
        rep++
    }
    total_2 = total_2 % 11;
    if (total_2 === 11 || total_2 === 10 || total_2 < 2) {
        total_2 = 0;
    } else {
        total_2 = 11 - total_2
    }
    if (total_1 === parseInt(temp[9]) && total_2 === parseInt(temp[10])) {
        return true;
    } else {
        return false;
    }
}