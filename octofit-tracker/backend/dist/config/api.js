"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoot = exports.baseUrl = void 0;
const codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.apiRoot = `${exports.baseUrl}/api`;
