# =========================
# ServeRest API Test Suite
# CRUD Users + Products + Auth Token Persistence
# =========================

API_URL=https://serverest.dev
TOKEN_FILE=.token
NOME=Ricardo Fahham

# =========================
# HELP
# =========================

# Cores ANSI
GREEN  := \033[0;32m
BLUE   := \033[1;34m
YELLOW := \033[1;33m
CYAN   := \033[1;36m
RED    := \033[1;31m
WHITE  := \033[1;37m
RESET  := \033[0m

help:
	@echo "$(CYAN)====================================$(RESET)"
	@echo "$(GREEN)       ServeRest API Test Suite$(RESET)"
	@echo "$(CYAN)====================================$(RESET)"
	@echo ""
	@echo "$(YELLOW)AUTH:$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)login$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)show-token$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)clear-token$(RESET)"
	@echo ""
	@echo "$(YELLOW)USERS:$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)user-create$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)user-list$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)user-get-id$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)user-update$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)user-delete-id$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)user-delete-all$(RESET)"
	@echo ""
	@echo "$(YELLOW)PRODUCTS:$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)product-create$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)product-list$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)product-get$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)product-update$(RESET)"
	@echo "  $(WHITE)make$(RESET) $(GREEN)product-delete$(RESET)"
	@echo ""

# =========================
# AUTH - TOKEN MANAGEMENT
# =========================

login:
	@echo "Fazendo login..."
	@TOKEN=$$(curl -s --location "$(API_URL)/login" \
	--header "Content-Type: application/json" \
	--data-raw '{ "email":"horadoqa@horadoqa.com.br", "password":"1q2w3e4r" }' | jq -r '.authorization') ; \
	echo $$TOKEN > $(TOKEN_FILE) ; \
	echo "Token salvo com sucesso!"

show-token:
	@cat $(TOKEN_FILE)

clear-token:
	@rm -f $(TOKEN_FILE)
	@echo "Token removido"

# =========================
# USERS - CRUD (SEM TOKEN)
# =========================

user-create:
	curl --location "$(API_URL)/usuarios" \
	--header "Content-Type: application/json" \
	--data-raw '{ "nome":"Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa", "email":"horadoqa@horadoqa.com.br", "password":"1q2w3e4r", "administrador":"true" }'

user-list:
	curl --location "$(API_URL)/usuarios" | jq -r '.usuarios[] | select(.nome | contains("$(NOME)")) | ._id' > ids.txt | wc -l ids.txt

user-get-id:
	@echo "Informe o ID: "; \
	read id; \
	curl --location "$(API_URL)/usuarios/$$id"

user-update:
	@echo "Informe o ID: "; \
	read id; \
	curl --location --request PUT "$(API_URL)/usuarios/$$id" \
	--header "Content-Type: application/json" \
	--data-raw '{ "nome":"QA Updated", "email":"updated@test.com", "password":"123456", "administrador":"true" }'

user-delete-id:
	@echo "Informe o ID: "; \
	read id; \
	curl --location --request DELETE "$(API_URL)/usuarios/$$id"

user-delete-all: user-list
	@echo "Deletando todos os usuários com $(NOME) no nome..."; \
	while read id; do \
		curl --location --request DELETE "$(API_URL)/usuarios/$$id"; \
	done < ids.txt; \
	rm -f ids.txt; \
	echo "Todos os usuários deletados."

# =========================
# PRODUCTS - CRUD (COM TOKEN)
# =========================

product-create:
	curl --location "$(API_URL)/produtos" \
	--header "Content-Type: application/json" \
	--header "Authorization: $$(cat $(TOKEN_FILE))" \
	--data-raw '{ "nome":"Mouse QA", "preco":100, "descricao":"Produto de teste", "quantidade":10 }'

product-list:
	curl --location "$(API_URL)/produtos" \
	--header "Authorization: $$(cat $(TOKEN_FILE))"

product-get:
	@echo "Informe o ID: "; \
	read id; \
	curl --location "$(API_URL)/produtos/$$id" \
	--header "Authorization: $$(cat $(TOKEN_FILE))"

product-update:
	@echo "Informe o ID: "; \
	read id; \
	curl --location --request PUT "$(API_URL)/produtos/$$id" \
	--header "Content-Type: application/json" \
	--header "Authorization: $$(cat $(TOKEN_FILE))" \
	--data-raw '{ "nome":"Mouse QA Updated", "preco":150, "descricao":"Atualizado", "quantidade":20 }'

product-delete:
	@echo "Informe o ID: "; \
	read id; \
	curl --location --request DELETE "$(API_URL)/produtos/$$id" \
	--header "Authorization: $$(cat $(TOKEN_FILE))"