#!/bin/bash

# Script de test pour l'API MangaTracker
# Ce script vérifie si l'API est accessible et fonctionne correctement

# URL de l'API
API_URL="https://manga-tracker-api.onrender.com"

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Démarrage des tests de l'API MangaTracker${NC}"
echo "URL de l'API: $API_URL"
echo "-------------------------------------"

# Test 1: Vérifier si l'API est accessible
echo -e "${YELLOW}Test 1: Vérification de l'accessibilité de l'API${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)

if [ $response -eq 200 ] || [ $response -eq 404 ]; then
  echo -e "${GREEN}✓ L'API est accessible (code HTTP: $response)${NC}"
else
  echo -e "${RED}✗ L'API n'est pas accessible (code HTTP: $response)${NC}"
  echo "Vérifiez que le service est démarré sur Render"
fi
echo "-------------------------------------"

# Test 2: Vérifier l'endpoint de recherche externe
echo -e "${YELLOW}Test 2: Vérification de l'endpoint de recherche${NC}"
search_response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/external/search?query=one%20piece")

if [ $search_response -eq 200 ]; then
  echo -e "${GREEN}✓ L'endpoint de recherche fonctionne correctement${NC}"
else
  echo -e "${RED}✗ L'endpoint de recherche ne fonctionne pas (code HTTP: $search_response)${NC}"
fi
echo "-------------------------------------"

# Test 3: Vérifier la connexion à MongoDB
echo -e "${YELLOW}Test 3: Vérification indirecte de la connexion à MongoDB${NC}"
echo -e "${YELLOW}Tentative d'accès à un endpoint qui nécessite MongoDB${NC}"

db_response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/library")

if [ $db_response -eq 200 ] || [ $db_response -eq 401 ]; then
  echo -e "${GREEN}✓ La connexion à MongoDB semble fonctionner (code HTTP: $db_response)${NC}"
  if [ $db_response -eq 401 ]; then
    echo -e "${YELLOW}Note: Code 401 indique que l'authentification est requise, ce qui est normal${NC}"
  fi
else
  echo -e "${RED}✗ Problème potentiel avec la connexion MongoDB (code HTTP: $db_response)${NC}"
fi
echo "-------------------------------------"

echo -e "${YELLOW}Résumé des tests:${NC}"
echo "1. Accessibilité de l'API: $([ $response -eq 200 ] || [ $response -eq 404 ] && echo -e "${GREEN}OK${NC}" || echo -e "${RED}ÉCHEC${NC}")"
echo "2. Endpoint de recherche: $([ $search_response -eq 200 ] && echo -e "${GREEN}OK${NC}" || echo -e "${RED}ÉCHEC${NC}")"
echo "3. Connexion MongoDB: $([ $db_response -eq 200 ] || [ $db_response -eq 401 ] && echo -e "${GREEN}OK${NC}" || echo -e "${RED}ÉCHEC${NC}")"

echo -e "\n${YELLOW}Remarques importantes:${NC}"
echo "- Le premier accès à l'API peut prendre jusqu'à 30 secondes si le service était en veille"
echo "- Vérifiez les variables d'environnement sur Render si des problèmes persistent"
echo "- Consultez les logs sur Render pour plus de détails en cas d'erreur"
