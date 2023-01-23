import { createReadStream,  constants } from 'fs';
import { access } from 'fs/promises';

export const checkFileExists = async (path: string)  => {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
};

export const readfile = async (filePath: string, options: BufferEncoding): Promise<string> => {
  const readStream = createReadStream(filePath, options);
  const data = [];
  for await (const chunk of readStream) {
    data.push(chunk);
  }
  return data.join('');
};
