module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.[jt]s?(x)'],
  // Testes de exemplo do professor desativados (os arquivos foram mantidos)
  testPathIgnorePatterns: [
    '/node_modules/',
    'test/deck_of_cards.spec.ts',
    'test/ded.spec.ts',
    'test/http_bin.spec.ts',
    'test/json_placeholder.spec.ts',
    'test/pet_store.spec.ts',
    'test/practicesoftwaretesting.spec.ts',
    'test/rick_and_morty.spec.ts',
    'test/serve_rest.spec.ts'
  ],
  verbose: true,
  testTimeout: 30000,
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './output',
        filename: 'report.html',
        pageTitle: 'Integration Tests with Jest and Pactum',
        logoImgPath: './assets/jest-logo.png',
        expand: false,
        openReport: false
      }
    ]
  ]
};
