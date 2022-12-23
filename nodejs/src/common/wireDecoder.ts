const uuidParse = require('uuid-parse');
export default (buffer: Buffer) => ({
  magicByte: buffer.slice(0, 1),
  uuid: uuidParse.unparse(buffer.slice(1, 17)),
  payload: buffer.slice(17, buffer.length),
})
