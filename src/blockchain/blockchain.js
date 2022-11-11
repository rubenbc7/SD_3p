import Block from './block';
import validate from './modules/validate';
// eslint-disable-next-line linebreak-style

class Blockchain {
  constructor() {
    this.blocks = [Block.genesis];
  }

  addBlock(data) {
    const previousBlock = this.blocks[this.blocks.length - 1];
    const block = Block.mine(previousBlock, data);

    this.blocks.push(block);

    return block;
  }

  replace(newBlocks = []) {
    if (newBlocks.length < this.blocks.length) throw Error('Cadena recibida no tiene la longitud correcta.');
    try {
      validate(newBlocks);
    } catch (error) {
      throw Error('Cadena recibida invalida');
    }

    this.blocks = newBlocks;

    return this.blocks;
  }
}

export default Blockchain;
