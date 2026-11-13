export async function generateMDP(nom: string, prenom: string, raisonSociale: string, siret: string): Promise<string> {
    const array = nom.trim() + siret.trim() + raisonSociale.trim() + prenom.trim() ;
    const arrayBuffer = array as string;
    const length = Math.max(16);

    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * arrayBuffer.length);
        password += arrayBuffer[randomIndex];
    }

    const result = password as string;


  return result;
}