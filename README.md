# Monalert
Script para google sheets para notificar monitores das monitorias

INSTALAÇÃO (leia tudo antes de instalar)

Pra usar esse script abra o editor de scripts do google sheets (Ferramentas > Editor de Scripts) e cole o código de main.gs no editor de texto. Salve o código abra o painel de acionadores do projeto (Editar > Acionadores do Projeto Atual). Clique em "+Adicionar Acionador" no canto inferior direito da página. Em "Escolha a função que será executada" selecione a função "sendEmails". Em "Selecione a origem do evento" selecione "Baseado no tempo". Em "Selecione o tipo de acionador com base no tempo" selecione "Contador de minutos". Em "Selecione o intervalo de minutos" selecione "A cada 1 minuto". Clique em salvar. Caso apareça alguma solicitação de permição durante o processo, conceda a permissão.

Depois adcione a função INIT_spreadsheet aos Macros e rode a mesma, ou rode diretamente pelo editor de scripts.
ATENÇÃO: Rodar essa função aparará todos os dados da planilha.

Após executar INIT_spreadsheet a planilha estará formatada para inserção dos dados.

UTILIZAÇÃO

Note que 2 páginas foram criadas: EVENTS e USERS.

Na página EVENTS há 3 colunas que devem ser preenchidas para o script mandar notificações sobre a monitoria ou outro evento.
Na coluna "Data e hora" devem ser inseridas a data e hora da monitoria separados por espaço. Segue exemplos de preenchimento:
11/07/2019 08:30
11/07 13:00

Na coluna "Descrição" deve ser inserida uma breve descrição do que se trata a monitoria ou evento.
Na coluna "Participantes" deve ser inseridos os logins dos monitores involvidos serparados por vírgula. Por exemplo:
rma6, mdo2
ou
rma6,mdo2
(a presença de espaços não interfere em nada)

Na página USERS há 2 colunas que descrevem as configurações de notificação de cada monitor.
Na coluna "login" devem ser inseridos os logins dos monitores.
Na coluna "horas antes do evento para ser notificado" devem ser inseridas o número de horas antes da monitoria ou evento para que o monitor seja notificado por e-mail. Multiplos horários podem ser especificados, cada um separado por vírgula. Por exemplo:
1,12,24
ou
1, 12, 24
(a presença de espaços não interfere em nada)
Esse monitor seria notificada 1, 12 e 24 horas antes da monitoria.
