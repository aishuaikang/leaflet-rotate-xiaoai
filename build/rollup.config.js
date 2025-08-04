import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const plugin = require("../package.json");

let input = "src/index.js";
let output = {
    file: "dist/leaflet-rotate-xiaoai.js",
    format: "umd",
    sourcemap: true,
    name: "LeafletRotate",
    globals: {
        leaflet: "L",
    },
};

let plugins = [
    resolve(),
    commonJS({
        include: "../node_modules/**",
    }),
];

export default [
    {
        input: input,
        output: Object.assign({}, output, {
            file: "dist/leaflet-rotate-xiaoai-src.js",
        }),
        external: ["leaflet"],
        plugins: plugins,
    },
    {
        input: input,
        output: output,
        external: ["leaflet"],
        plugins: plugins.concat(terser()),
    },
];
