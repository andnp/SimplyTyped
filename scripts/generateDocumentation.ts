import * as tsc from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

interface TypeInfo {
    typeName: string;
    parameterDocs: Array<{ name: string, text: string }>;
    returnDocs: string;
    description: string;
    fileName: string;
}

const tsConfig = {
    baseUrl: "src/",
};

const TEST_BASE = 'test';
const REGRESSION_SEPARATOR = '/* Regression Tests */';

// order dictates the order these appear in the generated markdown
const files = [
    { file: 'objects', test: `${TEST_BASE}/objects`, header: 'Objects' },
    { file: 'utils', test: `${TEST_BASE}/utils`, header: 'Utils' },
    { file: 'functions', test: `${TEST_BASE}/functions`, header: 'Functions' },
    { file: 'strings', test: `${TEST_BASE}/strings`, header: 'Strings' },
    { file: 'tuples', test: `${TEST_BASE}/tuples`, header: 'Tuples' },
    { file: 'numbers', test: `${TEST_BASE}/numbers`, header: 'Numbers' },
    { file: 'conditionals', test: `${TEST_BASE}/conditionals`, header: 'Conditionals' },
    { file: 'predicates', test: `${TEST_BASE}/predicates`, header: 'Predicates' },
    { file: 'src/impl/objects', test: `${TEST_BASE}/impl/objects`, header: 'Runtime' },
];

const generateMarkdown = (fileName: string, testPath: string) => {
    const program = tsc.createProgram([fileName], tsConfig);
    const checker = program.getTypeChecker();

    for (const sourceFile of program.getSourceFiles()) {
        if (sourceFile.fileName !== fileName) continue; // we don't care about imported source files, only the single file we are inspecting

        const sourceDocs = [] as TypeInfo[];

        tsc.forEachChild(sourceFile, (node) => {
            if (!isNodeExported(node)) return; // we only need to document exported types
            if (!(tsc.isTypeAliasDeclaration(node) || tsc.isFunctionDeclaration(node))) return; // we only need to document types and functions

            const symbol = checker.getSymbolAtLocation(node.name!);
            if (!symbol) return; // we should never get into this state because we aren't dealing with .d.ts files

            // Get the JSDoc description
            const description = tsc.displayPartsToString(symbol.getDocumentationComment(checker));

            // Don't document things with `no-doc` at start of description
            if (description.trim().startsWith('no-doc')) return;

            const typeName = symbol.name;

            const jsDocTags = symbol.getJsDocTags();

            const parameterDocs = jsDocTags
                .filter(tag => tag.name === 'param')
                .map(tag => tag.text)
                .filter(text => !!text)
                .map(text => {
                    const [ name, ...docWords] = text!.split(' ');
                    return {
                        name,
                        text: docWords.join(' '),
                    };
                });

            const returnDocs = jsDocTags
                .filter(tag => tag.name === 'returns')
                .map(tag => tag.text)
                .filter(text => !!text);

            const typeInfo: TypeInfo = {
                typeName,
                parameterDocs,
                returnDocs: returnDocs.length > 0 ? returnDocs[0]! : '',
                description,
                fileName,
            };

            sourceDocs.push(typeInfo);
        });

        const renderedSections = sourceDocs
            .sort((a, b) => a.typeName.localeCompare(b.typeName))
            .map(typeInfo => {
                const header = `### ${typeInfo.typeName}`;
                const description = `${typeInfo.description}`;

                const codeExamplePath = path.join(testPath, `${typeInfo.typeName}.test.ts`);

                const testFile = fs.existsSync(codeExamplePath) && fs.readFileSync(codeExamplePath).toString();
                const testCases = testFile && removeImports(removeRegressionTests(testFile)).trim();

                const codeExample = testFile ? `\`\`\`ts\n${testCases}\n\`\`\`` : '';

                return header + '\n' + description + '\n' + codeExample;
            });

        const markdown = renderedSections.join('\n\n');
        const toc = sourceDocs
            .sort((a, b) => a.typeName.localeCompare(b.typeName))
            .map(typeInfo => ({ name: typeInfo.typeName, link: typeInfo.typeName.toLowerCase() }));

        return {
            toc,
            markdown,
        };
    }
};

let headerString =
`# SimplyTyped

[![Greenkeeper badge](https://badges.greenkeeper.io/andnp/SimplyTyped.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/andnp/SimplyTyped.svg?branch=NumberPerformance)](https://travis-ci.org/andnp/SimplyTyped)

Yet another typing library.
This differs by aiming to be less experimental than others, driven by industry use cases.

Many of the exposed types are a very thin layer above built in functionality.
The goal is to provide all of the building blocks necessary to make concise, yet complex types.

\`\`\`
npm install --save-dev simplytyped
\`\`\`

## Table of Contents

`;

const docString = files.map(file => {
    const fileName = file.file.includes(path.sep)
        ? `${file.file}.ts`
        : path.join('src', 'types', `${file.file}.ts`);

    const doc = generateMarkdown(fileName, file.test)!;

    let header = `**[${file.header}](#${file.header.toLowerCase()})**\n\n`;

    header += doc.toc.map(t => `[${t.name}](#${t.link})`).join(' - ');

    headerString += header + '\n\n';

    return `## ${file.header}\n\n${doc.markdown}\n`;
}).join('\n');

const markdown = headerString + docString;
console.log(markdown);


/** True if this is visible outside this file, false otherwise */
function isNodeExported(node: tsc.Node | tsc.Declaration): boolean {
    const declaration: tsc.Declaration = {
        _declarationBrand: 'branded',
        ...node,
    };
    return (tsc.getCombinedModifierFlags(declaration) & tsc.ModifierFlags.Export) !== 0 || (!!declaration.parent && declaration.parent.kind === tsc.SyntaxKind.SourceFile); // tslint:disable-line no-bitwise
}

/**
 * Takes a unit (regression) test file and removes the regression tests.
 * This way we don't clutter up the documentation with regression test cases.
 */
function removeRegressionTests(testCode: string): string {
    if (!testCode.includes(REGRESSION_SEPARATOR)) return testCode;

    const [ before, ] = testCode.split(REGRESSION_SEPARATOR);
    return before;
}

// TODO: make this less atrocious
function removeImports(fileString: string): string {
    const lines = fileString.split('\n');

    return lines.reduce((final, line, i) => {
        const end = i === lines.length - 1 ? '' : '\n';

        if (final !== '') return final + line + end;
        if (line.indexOf('import') === 0) return final;
        if (line.trim() === '') return final;

        return final + line + end;
    }, '');
}
