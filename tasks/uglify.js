module.exports = {
  options: {
    banner: '<%= banner %>'
  },
  dist: {
    src: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.min.js'
  }
};
