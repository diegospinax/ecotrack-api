module.exports = {
  // Usa ts-jest para manejar TypeScript
  preset: 'ts-jest',
  
  // Entorno de Node.js
  testEnvironment: 'node',
  
  // Carpetas donde buscar tests
  roots: ['<rootDir>/src'],
  
  // Patrones de archivos de test
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/*.test.ts',
    '**/*.spec.ts'
  ],
  
  // Extensiones de archivo
  moduleFileExtensions: ['ts', 'js', 'json'],
  
  // Transformaciones
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  
  // Coverage (opcional)
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
  ],
  
  // Timeout para tests (opcional)
  testTimeout: 10000,
};