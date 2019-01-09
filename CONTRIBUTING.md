# Contributing

All contributions are welcome here!
We especially appreciate those in the form of bug reports, feature requests, and pull requests on github.

## Testing

To run tests locally, you must manually install a particular version of typescript:
```bash
npm install
npm install typescript@3.0.3

npm test
```
To run tests against all supported versions of typescript:
```bash
npm install
npm run test:all
```

All contributions need to be accompanied with a test case.
If fixing a bug provide a test case that would fail before the bug fix, but passes now that the bug has been fixed.
As this library primarily deals with compile-time types, most test cases will be trivial at runtime so it is critical that the `tsc` build passes without errors for the tests to do their job.

## Documentation

All new features need to provide documentation in the form of js-docs.
The `README.md` is automatically generated based on the js-docs (so don't edit it manually!), and will pick up any changes on the `pre-push` hook.
Any helper types that do not need public facing documentation can be ignored by adding `no-doc` to the first line of the js-doc comment.
For example:
```typescript
/**
 * no-doc
 * This helpful helper helps do anything.
 */
export type HelpfulHelper = any;
```

## Commitlint

All commit messages are linted to ensure that they meet "conventional commit" standards.
More information can be found on the linter [here](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) and on the standard [here](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).

## Publishing and Versioning

Publishing and versioning are done automatically using semantic-release.
More information can be found [here](https://semantic-release.gitbook.io/semantic-release/).
New versions of the library will be published moments after a PR is merged.
