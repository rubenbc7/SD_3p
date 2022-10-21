import Blockchain from '../blockchain';
import validate from './validate';

describe('validate()', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('Crear Cadena Valida', () => {
        blockchain.addBlock('transact0');
        blockchain.addBlock('transact1');

        expect(validate(blockchain.blocks)).toBe(true);
    });

    it('Invalidando cadena con un genesis block corrupto', () => {
        blockchain.blocks[0].data = 'h4ack-data';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Bloque Genesis Invalido');   
    });

    it('Invalidando una cadena con un previousHash corrupto en un block', () => {
        blockchain.addBlock('transact2');
        blockchain.blocks[1].previousHash = 'h4ack-previousHash';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('Hash previo invalido o corrupto');
    });

    it('Invalidando una cadena con un block con hash corrupto', () =>{
        blockchain.addBlock('transact3');
        blockchain.blocks[1].hash = 'h4ck-hash';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('Hash Invalido');
    });
});