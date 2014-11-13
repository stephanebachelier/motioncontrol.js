module.exports = {
  lib: {
    indent: '  ',
    src: 'dist/<%= pkg.name.replace(/\.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/\.js$/, "") %>.js'
  }
};
