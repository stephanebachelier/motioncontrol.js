module.exports = {
  lib: {
    indent: '  ',
    objectToExport: 'motioncontrol',
    src: 'dist/<%= pkg.name.replace(/\.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/\.js$/, "") %>.js'
  }
};
