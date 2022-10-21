import {SHA256} from 'crypto-js';

class Block {
    constructor(timestamp, previousHash, hash, data){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
    }

    static get genesis(){
        const timestamp = (new Date(2019,0,1)).getTime();
        return new this(timestamp, undefined, 'g3n3sis - h4sh', 'g3n3sis-d4t4');
    }

    static mine(previousBlock, data){
        const timestamp = Date.now();
        const { hash: previousHash } = previousBlock;
        const hash = Block.hash(timestamp, previousHash, data);

        return new this(timestamp, previousHash, hash, data);
    }  

    static hash(timestamp, previousHash, data){
        return SHA256(`${timestamp},${previousHash},${data}`).toString();
    }

    toString(){
        const {
            timestamp, previousHash, hash, data,
    } = this;

    return `Block -
    timestamp   : ${timestamp}
    previoushash: ${previousHash}
    hash        : ${hash}
    data        : ${data}
    `;
    }
}

export default Block;
