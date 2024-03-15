


export async function decodeBase(sourceUrl){
    const parts = sourceUrl.split(',');
    const base64EncodedString = parts[1];
    const jsonString = atob(base64EncodedString);
    const obj = JSON.parse(jsonString);
    
    console.log(obj);

}
