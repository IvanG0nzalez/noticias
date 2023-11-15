let URL = "https://computacion.unl.edu.ec/pdml/noticias/";
export function url_api() {
  return URL;
}
//noticias
//recursos

export async function obtener(recurso) {
  const response = await fetch(URL + recurso);
  return await response.json();
}

export async function enviar(recurso, data, key='') {
  let headers = []
  if(key !== '') {
    headers = {
      "Accept": "application/json",
    };
  } else {
    headers = {
      "Accept": "application/json",
      "API-KEY": key
    };
  }
  

  const response = await fetch(URL + recurso, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  return await response.json();
}