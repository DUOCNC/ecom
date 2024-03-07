const fs = require('fs');

const imageFileNames = () => {
  const array = [];
  readFolder('src/assets/images', array, '');
  return array;
};

const readFolder = (path, array, sub) => {
  fs.readdirSync(path).forEach(file => {
    if (!file.includes('.')) {
      readFolder(path + '/' + file, array, `${sub}/${file}`);
    } else {
      if (
        file.endsWith('.png') &&
        !file.includes('@2x') &&
        !file.includes('@3x')
      ) {
        let key = file.replace('.png', '');
        array.push({
          key: key,
          sub: sub,
        });
      }
    }
  });
};

const generate = () => {
  let properties = imageFileNames()
    .map(name => {
      return `const ${name.key} = require('.${name.sub}/${name.key}.png')`;
    })
    .join(';\n');
  properties = properties + ';\n';
  let data = imageFileNames()
    .map(name => {
      return '  ' + name.key;
    })
    .join(',\n');
  data = data + ',';
  const string = `${properties}
export {\n${data}\n};\n`;
  fs.writeFileSync('src/assets/images/index.ts', string, 'utf8');
};

generate();
