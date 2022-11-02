/* eslint-disable */
import * as path from "path";

import * as uuid from "uuid";

class FileService {
  saveFile(file: any) {
    try {
      const fileName = `${uuid.v4()}.jpg`;
      const filePath = path.resolve("static", fileName);

      file.mv(filePath);

      return fileName;

      // const fileName = uuid.v4() + '.jpg';
      // const filePath = file.map(f => path.resolve('static', fileName));
      // file.mv(filePath);
      // return file;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
