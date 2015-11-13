// 加载jello初始配置，这里加载的实际是mtt-jello
fis.require("jello")(fis);

// 项目的静态资源路径
const STATICS = '/static';

fis.set('namespace', '');

// 开发环境配置
fis
   //使用相对路径 todo
  .hook('relative')
  .match('**', {
    relative: true
  })

  // src下的css和less配置autoprefixer
  .match('**.{less,css}', {
    postprocessor: fis.plugin('autoprefixer', {
      browsers: [
        "last 4 versions"
      ]
    })
  });

// 生产环境
var mttProd = function(fisMedia) {
  var packagers = {};
  packagers[STATICS + '/pkg/base.css'] = [
    '/components/bootstrap/css/bootstrap.css',
    '/src/common/common/**.less',
    '/src/widget/**.less'
  ];
  packagers[STATICS + '/pkg/boot.js'] = [
    '/static/requirejs/require.js',
    '/components/jquery/jquery.js'
  ];
  packagers[STATICS + '/pkg/common.js'] = [
    '/src/common/**.js',
    '/src/common/**.js:deps',
    '/src/widget/**.js',
    '/src/widget/**.js:deps'
  ];
  // 业务逻辑打包，如果需要，在这里单独配置
  packagers[STATICS + '/pkg/demo/template.js'] = [
    '/src/demo/template.js',
    '/src/demo/template.js:deps'
  ];

  return fisMedia
    .match('::package', {
      // 关于打包配置，请参考：https://github.com/fex-team/fis3-packager-deps-pack
      packager: fis.plugin('deps-pack', packagers)
    })
    .match('*.{less,css,js}', {
      useHash: true
    })
    .match('::image', {
      useHash: true
    })
}

// 生产环境
mttProd(fis.media("prod"));

// 本地部署
// 这个方法决定是否需要部署
var needDeploy = function(path) {
  //比如没有用到的components不打包过去
  if(/^\/static\/components\/underscore.*$/.test(path)) {
    return false;
  }
  return true;
}
mttProd(fis.media("deploy"))
  .match("**", {
    deploy: [
      function(options, modified, total, next) {
        for(var i = modified.length - 1; i >= 0; i--) {
          var path = modified[i].getHashRelease();
          !needDeploy(path) && modified.splice(i, 1);
        }
        next();
      },
      fis.plugin('local-deliver', {
        to: '../../mtt-deploy'
      })
    ]
  });
