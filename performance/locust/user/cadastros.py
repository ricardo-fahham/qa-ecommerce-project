from locust import HttpUser, task, between
import random
import time

class Usuario(HttpUser):
    wait_time = between(1, 3)

    @task
    def criar_usuario(self):
        payload = {
            "nome": "Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa",
            "email": f"horadoqa-{int(time.time() * 1000)}-{random.randint(1, 99999)}@horadoqa.com.br",
            "password": "1q2w3e4r",
            "administrador": "true"
        }

        headers = {
            "Content-Type": "application/json"
        }

        with self.client.post(
            "/usuarios",
            json=payload,
            headers=headers,
            catch_response=True
        ) as response:
            if response.status_code == 201:
                response.success()
            else:
                response.failure(
                    f"Status: {response.status_code} - {response.text}"
                )

# locust -f cadastros.py --host=https://serverest.dev