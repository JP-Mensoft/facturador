export const utilsRng = (digits: number): string => {
    let rn: string = "";
    for (let i = 0; i < digits; i++) {
        const number = Math.floor(Math.random() * 10);
        rn = rn + number.toString();
    }
    return rn;
}

