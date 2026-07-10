import http from 'k6/http';
import { check } from 'k6';

const API_URL = __ENV.API_URL || 'https://serverest.dev';

export default function () {
  const email = `horadoqa-${Date.now()}-${Math.floor(Math.random() * 100000)}@test.com`;

  const payload = JSON.stringify({
    nome: 'Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa',
    email,
    password: '1q2w3e4r',
    administrador: 'true',
  });

  const res = http.post(`${API_URL}/usuarios`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  check(res, {
    'status é 201': (r) => r.status === 201,
  });

  console.log(`Usuário criado: ${email}`);
  console.log(res.body);
}

// To run this test, use the following command: k6 run -e API_URL=https://serverest.dev script.js