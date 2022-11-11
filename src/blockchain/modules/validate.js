import Block from "../block";

export default (blockchain) =>
{
    const [genesisBlock, ...blocks] = blockchain;

    if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('Bloque Genesis Invalido');

    for (let i = 0; i < blocks.length; i += 1){
        const{
            previousHash, timestamp, hash, data,
        } = blocks[i];

        const previousBlock = blockchain [i];

        if (previousHash !== previousBlock.hash) throw Error ('Hash previo invalido o corrupto');
        if (hash !== Block.hash(timestamp, previousHash, data)) throw Error ('Hash Invalido');

        return true;

    }
    
};
