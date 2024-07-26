module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', ['lower-case']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'button',
      ],
    ],
    'subject-case': [
      1,
      'never',
      [
        'lower-case', // default
        'start-case', // Start Case
        'kebab-case', // kebab-case
        'sentence-case', // Sentence case
      ],
    ],
  },
};
