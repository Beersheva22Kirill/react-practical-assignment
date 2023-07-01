
export function toDateTimeISOString(milisecond){
    
    const res = new Date(Number.parseInt(milisecond)).toISOString().split('T')
    res[1] = res[1].substring(0,5)
    return `${res[0]} ${res[1]}`;
}