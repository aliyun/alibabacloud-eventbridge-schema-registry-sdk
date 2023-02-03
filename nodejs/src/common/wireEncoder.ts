const uuidParse = require('uuid-parse');
// const DEFAULT_OFFSET = 0
export const ALICLOUD_MAGIC_BYTE = Buffer.alloc(1).fill(0xFF);
export const CONFLUENT_MAGIC_BYTE = Buffer.alloc(1).fill(0x00);
export const encode = (uuid: string, payload: Buffer) => {
  // const uuidBuffer = Buffer.alloc(16)
  const bytes = uuidParse.parse(uuid); // 
  const buf = Buffer.from(bytes);
  // uuidBuffer.write(bytes, DEFAULT_OFFSET);
  return Buffer.concat([ALICLOUD_MAGIC_BYTE, buf, payload]);
}
