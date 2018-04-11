var gulp = require('gulp');
  nodemon= require('gulp-nodemon');

gulp.task('default', function(){
  // place code for your default task here
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT:8001
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function(){
    console.log('Restarted');
  });
});
