const uuidParse = require('uuid-parse');
// const DEFAULT_OFFSET = 0

export const MAGIC_BYTE = Buffer.alloc(1)

export const encode = (uuid: string, payload: Buffer) => {
  // const uuidBuffer = Buffer.alloc(16)
 
  const bytes = uuidParse.parse(uuid); // 
  const buf = Buffer.from(bytes);
  // uuidBuffer.write(bytes, DEFAULT_OFFSET);
  return Buffer.concat([MAGIC_BYTE, buf, payload])
}
