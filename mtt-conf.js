// 加载jello初始配置
fis.require('jello')(fis);

// 开发环境配置
fis
  //不加md5
  .match('**', {
    useHash: false
  })
  // 忽略目录
  .set('project.ignore', [
    'node_modules/**',
    '.idea/**',
    '.git/**'
  ])
  // jello 里面默认用的 commonjs 这里改成 amd 方案。
  .unhook('commonjs')
  .hook('amd', {
    packages: []
  })
  // 页面配置
  .match(/^\/views\/(.*\.(jsp|vm|html))$/i, {
    isMod: true,
    url: '$1',
    release: '${templates}/${namespace}/$1',
    extras: {
      isPage: true
    }
  })
  // 标记src下的js为es6和模块化
  .match('/src/(**.{js,es6,jsx})', {
    parser: fis.plugin('es6-babel', {
      //去掉严格模式，防止前端内联模版使用with时报错，参考：https://github.com/babel/babel/issues/388
      //blacklist: ["useStrict"]
    }),
    release: '${namespace}/static/$1',
    isMod: true,
    rExt: '.js'
  })
  // src下的css和less
  .match('/src/(**.{less,css})', {
    release: '${namespace}/static/$1',
    useSprite: true,
    postprocessor: fis.plugin('autoprefixer', {
      browsers: [
        "last 4 versions"
      ]
    })
  })
  .match('/components/**', {
    isMod: true
  })
  .match('/src/**.tmpl', {
    parser: fis.plugin('art-tmpl'),
    rExt: '.js'
  })
  // 使用相对路径 todo
  .hook('relative')
  .match('**', {
    relative: true
  });

// 生产环境
var prod = function(fisMedia) {
  fisMedia
    .match('**.{js,es6,jsx}', {
      optimizer: fis.plugin('uglify-js')
    })
    .match('**.{css,less}', {
      optimizer: fis.plugin('clean-css')
    })
    .match('::package', {
      // 关于打包配置，请参考：https://github.com/fex-team/fis3-packager-deps-pack
      packager: fis.plugin('deps-pack', {
        '/static/pkg/base.css': [
          '/components/bootstrap/css/bootstrap.css',
          '/src/common/common/**.less',
          '/src/widget/**.less'
        ],
        '/static/pkg/boot.js': [
          '/static/requirejs/require.js',
          '/components/jquery/jquery.js'
        ],
        '/static/pkg/common.js': [
          '/src/common/**.js',
          '/src/common/**.js:deps',
          '/src/widget/**.js',
          '/src/widget/**.js:deps'
        ],
        // 业务逻辑打包，如果需要，在这里单独配置
        '/static/pkg/demo/template.js': [
          '/src/demo/template.js',
          '/src/demo/template.js:deps'
        ]
      })
    });
}

prod(fis.media('prod'));