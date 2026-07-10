from locust import HttpUser, task, between
import random
import time


class Usuario(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """
        Executado quando cada usuário virtual inicia.
        Cria o usuário e realiza o login.
        """
        self.email = f"horadoqa-{int(time.time() * 1000)}-{random.randint(1, 99999)}@test.com"
        self.password = "1q2w3e4r"
        self.token = None

        self.criar_usuario()
        self.login()

    def criar_usuario(self):
        payload = {
            "nome": "Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa",
            "email": self.email,
            "password": self.password,
            "administrador": "true"
        }

        with self.client.post(
            "/usuarios",
            json=payload,
            catch_response=True
        ) as response:

            if response.status_code == 201:
                response.success()
                print(f"Usuário criado: {self.email}")
            else:
                response.failure(
                    f"Erro ao criar usuário: {response.status_code} - {response.text}"
                )

    def login(self):
        payload = {
            "email": self.email,
            "password": self.password
        }

        with self.client.post(
            "/login",
            json=payload,
            catch_response=True
        ) as response:

            if response.status_code == 200:
                self.token = response.json().get("authorization")
                response.success()
                print(f"Login realizado: {self.email}")
            else:
                response.failure(
                    f"Erro no login: {response.status_code} - {response.text}"
                )

    @task
    def consultar_usuarios(self):
        """
        Exemplo de chamada autenticada.
        """

        headers = {
            "Authorization": self.token
        }

        with self.client.get(
            "/usuarios",
            headers=headers,
            catch_response=True
        ) as response:

            if response.status_code == 200:
                response.success()
            else:
                response.failure(
                    f"Erro consulta usuários: {response.status_code}"
                )

# locust -f cadastro_login.py --host=https://serverest.dev