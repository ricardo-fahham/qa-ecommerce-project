from locust import HttpUser, task, between

class Usuario(HttpUser):
    wait_time = between(1, 3)

    email = "horadoqa@test.com"
    password = "1q2w3e4r"
    token = None

    def on_start(self):
        self.login()

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
                print("Login realizado com sucesso")
            else:
                response.failure(
                    f"Erro no login: {response.status_code} - {response.text}"
                )

    @task
    def consultar_usuarios(self):
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


# locust -f login.py --host=https://serverest.dev