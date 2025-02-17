export function isNumber(n:any) {
    return !isNaN(Number(n))
}

export function abbNumber(n:number | undefined) {
    if (!n) return "0";
    if (n<1000) return n.toString();
    if (n<1000000) return (n/1000).toFixed(1)+"K";
    return (n/1000000).toFixed(1)+"M";
}