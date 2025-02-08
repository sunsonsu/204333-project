import catchError from "../error";

interface Body {
    rates: { [key:string]: number } | undefined
}

export default async function ():Promise<[{ [key: string]: number } | undefined, null] | [null, Error]> {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGE_APP_ID}`
    const res_promise = fetch(url);
    const [res, err] = await catchError(res_promise);
    if (err) return [null, err];

    if (res.ok) {
        const json_body = res.json();
        const [body, err] = await catchError<Body>(json_body);
        if (err) return [null, err];
        return [body.rates, err];
    }
    return [null, new Error(`HTTP status error: ${res.status}`)];
}