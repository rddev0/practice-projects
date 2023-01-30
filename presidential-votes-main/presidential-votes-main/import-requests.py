import requests
import json
import pandas as pd
import time 

data = requests.get(
	'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
json_data = json.loads(data.content)

candidato = []
partido = []
votos = []
porcentagem = []

for dados_JSON in json_data['cand']:
	
	if dados_JSON ['seq'] == '1' or dados_JSON ['seq'] == '2' or dados_JSON['seq'] == '3' or dados_JSON ['seq'] == '4' or dados_JSON ['seq'] == '5' or dados_JSON ['seq'] == '6':
		candidato.append(dados_JSON['nm'])
		votos.append(dados_JSON['vap'])
		porcentagem.append(dados_JSON['pvap'])

def printdf_eleicao():
	df_eleicao = pd.DataFrame(list(zip(candidato, votos, porcentagem)), columns =[
								'Candidato', 'nº Votos', 'Porcentagem'])
	print(df_eleicao)
	time.sleep(60)
	

while True:
    printdf_eleicao()
