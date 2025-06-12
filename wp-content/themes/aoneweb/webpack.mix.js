const fs = require( 'fs' );
const path = require( 'path' );
const mix = require( 'laravel-mix' );
const svgtofont = require( 'svgtofont' );
const extractSvgToFontVars = require( '@designcontainer/extract-svg-to-font-vars' );
const productionSourceMaps = false;
const packageName = process.env.npm_package_name;
const mixProxy = process.env.MIX_PROXY || `http://${ packageName }.test:8888`;

/**
 * Configure webpack.
 */
mix.setPublicPath( './dist' );
mix.webpackConfig( {
	resolve: {
		extensions: [ '.js', '.vue' ],
		alias: {
			'@dc-post-grid': path.resolve( '../../plugins/dc-post-grid/src' ),
			'@dc-block-library': path.resolve( '../../plugins/dc-block-library' ),
			'@dc-skeleton-assets': path.resolve( 'dist' ),
		},
	},
	externals: {
		jquery: 'jQuery',
		wp: 'wp',
	},
	module: {
		rules: [
			{
				test: /.scss/,
				enforce: 'pre',
				use: [
					{
						loader: 'sass-loader',
						options: {
							additionalData: `@import "src/scss/abstracts/_all.scss";`
						}
					},
				],
			},
		],
	},
} );

/**
 * For handing directories in ie. font-face.
 */
mix.options( {
	processCssUrls: false,
} );

/**
 * Browsersync setup.
 */
if ( mixProxy ) {
	mix.browserSync( {
		proxy: mixProxy,
		injectChanges: true,
		open: false,
		files: [
			'dist/**/*.{css,js}',
			{
				match: [ './**/*.php' ],
			},
		],
		watch: [],
	} );
}

/**
 * Compile icon svg's to font files on production.
 * It is important that the fonts get generated before the SCSS gets compiled.
 */
let icons = [];
const icons_src = path.resolve( 'src', 'images/icons' );
function compileFonts () {
	// Skip icon compiling if there are no changes made.
	if ( JSON.stringify( icons ) === JSON.stringify( fs.readdirSync( icons_src ) ) ) return;

	svgtofont( {
		src: icons_src,
		dist: path.resolve( 'dist', 'fonts', 'icons' ),
		fontName: 'icon',
		startUnicode: 0x0410,
		svgicons2svgfont: {
			fontHeight: 1000,
			fontWeight: 'bold',
			normalize: true,
		},
		css: {
			output: 'src/scss/vendor/',
			fileName: '_icons',
			cssPath: `/wp-content/themes/${ packageName }/dist/fonts/icons/`,
			include: '\\.(scss)$',
		},
	} )
		.then( async () => {
			await extractSvgToFontVars( 'src/scss/vendor/_icons.scss', 'src/scss/vendor/_icons-vars.scss' );
			console.log( 'Icon font generated!' );
		} )
		.then( () => {
			icons = fs.readdirSync( icons_src );
		} );
}

/**
 * Import js and scss.
 */
mix.js( 'src/js/app.js', 'js' )
	.js( 'src/js/admin.js', 'js' )
	.js( 'src/js/admin-blocks.js', 'js' )
	.vue()
	.sourceMaps( productionSourceMaps, productionSourceMaps ? 'source-map' : 'eval-cheap-source-map' );

mix.sass( 'src/scss/app.scss', 'css' )
	.sass( 'src/scss/admin.scss', 'css' )
	// .sass( 'src/scss/editor.scss', 'css' )
	.sourceMaps( productionSourceMaps, productionSourceMaps ? 'source-map' : 'eval-cheap-source-map' );


/**
 * Scan blocks for scss and js files,
 * import them to mix if they exist.
 */
const blocksPath = path.join( 'src', 'blocks' );
// Get all the blocks directories.
const blocks = fs
	.readdirSync( blocksPath, { withFileTypes: true } )
	.filter( ( dirent ) => dirent.isDirectory() )
	.map( ( dirent ) => dirent.name );

for ( const block of blocks ) {
	const blockAssetsPath = path.join( blocksPath, block, 'assets' );
	// Import scss file.
	const scss = path.join( blockAssetsPath, `${ block }.scss` );
	if ( fs.existsSync( scss ) ) {
		mix.sass( scss, 'css/blocks' );
	}
	// Import js file.
	const js = path.join( blockAssetsPath, `${ block }.js` );
	if ( fs.existsSync( js ) ) {
		mix.js( js, 'js/blocks' );
	}
}


/*
	When production, it copies all used assets as well.
*/
if ( mix.inProduction() ) {
	mix.copyDirectory( 'src/images', 'dist/images' );
	mix.copyDirectory( 'node_modules/@material-design-icons', 'dist/images/icons/material-icons' );
	compileFonts();
	mix.after( () => compileFonts() );

	/* Don't log all */
	mix.after( ( stats ) => {
		const assets = { ...stats.compilation.assets }
		stats.compilation.assets = {}

		for ( const [ path, asset ] of Object.entries( assets ) ) {
			if ( path.endsWith( '.js' ) || path.endsWith( '.css' ) ) {
				stats.compilation.assets[ path ] = asset
			}
		}
	} )
}


/**
 * Disable the Laravel Mix system notification
 */
// mix.disableNotifications();
// mix.disableSuccessNotifications();
