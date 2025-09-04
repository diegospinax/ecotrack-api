import { beforeAll, afterAll } from 'vitest';

declare global {
  var testPort: number;
}

beforeAll(() => {
  globalThis.testPort = 3001;
  
  process.env.NODE_ENV = 'test';
  process.env.PORT = globalThis.testPort.toString();
  
  console.log('🧪 Configuración de tests inicializada');
});

afterAll(() => {
  console.log('✅ Tests completados');
});