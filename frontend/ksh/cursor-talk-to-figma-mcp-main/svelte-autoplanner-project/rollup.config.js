import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writedundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js', // 진입점 파일을 main.js로 변경합니다.
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// Svelte 컴파일러 옵션을 활성화하여 커스텀 요소 지원 등을 할 수 있습니다.
				dev: !production
			}
		}),
		// Svelte 파일에서 CSS를 추출하여 별도의 파일로 저장합니다.
		css({ output: 'bundle.css' }),

		// node_modules에서 써드파티 모듈을 찾을 수 있도록 합니다.
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// 개발 모드일 때: `public` 디렉토리에서 앱을 실행하고 변경사항을 감지하여 새로고침합니다.
		!production && serve(),
		!production && livereload('public'),

		// 프로덕션 모드일 때 (npm run build): 코드를 최소화합니다.
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}; 