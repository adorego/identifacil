import Cryptr from "cryptr";

export function encrypt(text: any) {
  const secretKey = process.env.NEXTAUTH_SECRET;
  // @ts-ignore
    const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decrypt(encryptedString: any) {
    const secretKey = process.env.NEXTAUTH_SECRET;
    // @ts-ignore
    const cryptr : any = new Cryptr(secretKey);

    const text = cryptr.decrypt(encryptedString);
    return text;
  }