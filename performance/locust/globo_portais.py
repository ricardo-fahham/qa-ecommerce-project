from locust import HttpUser, task, between
import random

class GloboUser(HttpUser):
    # wait_time = between(2, 5) # Tempo de espera entre as requisições

    portais = [
        "https://www.globo.com/",
        "https://g1.globo.com/",
        "https://ge.globo.com/",
        "https://gshow.globo.com/",
    ]

    @task
    def acessar_portais(self):
        portal = random.choice(self.portais)

        with self.client.get(
            portal,
            name=portal,
            catch_response=True
        ) as response:

            if response.status_code == 200:
                response.success()
            else:
                response.failure(
                    f"Erro {response.status_code} acessando {portal}"
                )