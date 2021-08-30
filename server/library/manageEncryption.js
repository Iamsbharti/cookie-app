const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY;

const iv = crypto.randomBytes(16);

const encryptInput = (input) => {
  const secretKey = process.env.SECRET_KEY;
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

  return { iv: iv.toString("hex"), content: encrypted.toString("hex") };
};

const decryptInput = (inputHash) => {
  const secretKey = process.env.SECRET_KEY;
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(inputHash.iv, "hex")
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(inputHash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
module.exports = {
  encryptInput,
  decryptInput,
};
