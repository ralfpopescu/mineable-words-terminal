const generateNonce = (length: number) => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1 ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    const nonce = result.join('');
   return nonce;
}

export const linkWallet = () => {

}