//Criar acionador (trigger) para essa função para rodar a cada 1 minuto.
function sendEmails() 
{
  var cache = CacheService.getScriptCache();
  
  var logins = [];
  var configs = [];
  var dates = [];
  var descriptions = [];
  var attendants = [];
  
  var now = new Date();
  var users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("USERS").getDataRange().getValues();
  var events = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVENTS").getDataRange().getValues();
  
  for(var i=1; i<users.length; i++)
  {
    if(users[i][0].length != 0 && users[i][1].length != 0)
    {
      logins[logins.length] = users[i][0];
      configs[configs.length] = users[i][1].toString().replace(/\s+/g, '').split(",").sort(sortNumber);
    }    
  }
  
  for(var i=1; i<events.length; i++)
  {
    if(typeof events[i][0] !== "string" && events[i][1].length != 0 && events[i][2].length != 0)
    {
      dates[dates.length] = events[i][0];
      descriptions[descriptions.length] = events[i][1];
      attendants[attendants.length] = events[i][2].replace(/\s+/g, '').split(",");
    }    
  }
  
  for(var i=0; i<dates.length; i++)
  {
    var hoursLeft = Math.abs(dates[i]-now)/36e5;
    for(var j=0; j<attendants[i].length; j++)
    {
      var index = logins.indexOf(attendants[i][j]);     
      for(var k=0; index!=-1 && k<configs[index].length; k++)
      {
        if(hoursLeft>0 && hoursLeft-parseInt(configs[index][k])<=0 && hoursLeft-parseInt(configs[index][k])>-1)
        {
          var cached = cache.get(attendants[i][j]+dates[i].getTime());
          if (cached == null)
          {
            cache.put(attendants[i][j]+dates[i].getTime(), "", 3600);
            MailApp.sendEmail(attendants[i][j]+"@cin.ufpe.br", "Lembrete: "+descriptions[i], "Lembrete de "+descriptions[i]+" na data "+doubleDigit(dates[i].getDate())+"/"+doubleDigit(dates[i].getMonth()+1)+"/"+dates[i].getFullYear()+" horário "+doubleDigit(dates[i].getHours())+":"+doubleDigit(dates[i].getMinutes()));
          }          
        }        
      }
    }
  }
}

//inicia a planilha com campos e formatação adequada
//ATENÇÂO: executar essa função apagará todos os dados da planilha
function INIT_spreadsheet()
{
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheets = ss.getSheets();
  
  var temp = ss.insertSheet("temp");
  for(var i=0; i<sheets.length; i++)
  {
    ss.deleteSheet(sheets[i]);
  }  
  
  var events = ss.insertSheet("EVENTS");
  events.getRange("A1").setValue("Data e hora");
  events.getRange("B1").setValue("Descrição");
  events.getRange("C1").setValue("Participantes (separado por vírgula)");
  events.getRange("A2:A").setNumberFormat('dd"/"mm" ("ddd") "hh":"mm');
  
  var config = ss.insertSheet("USERS");
  config.getRange("A1").setValue("login");
  config.getRange("B1").setValue("horas antes do evento para ser notificado (separado por vírgulas)");
  config.getRange("B2:B").setNumberFormat("@");
  
  ss.deleteSheet(temp);
}


//funções auxiliares
function sortNumber(a,b)
{
  return parseInt(a) - parseInt(b);
}

function doubleDigit(x)
{
  x = x.toString()
  return x.length==1?0+x:x
}
