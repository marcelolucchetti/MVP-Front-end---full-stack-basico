/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/midias';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.midias.forEach(item => insertList(item.nome, item.tipo, item.stream))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar uma midia na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduct, inputType, inputStream) => {
  const formData = new FormData();
  formData.append('nome', inputProduct);
  formData.append('tipo', inputType);
  formData.append('stream', inputStream);

  let url = 'http://127.0.0.1:5000/midia';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada midia da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover uma midia da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar uma midia da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/midia?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova midia com nome, tipo e stream
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputProduct = document.getElementById("newInput").value;
  let inputType = document.getElementById("newType").value;
  let inputStream = document.getElementById("newStream").value;

  if (inputProduct === '') {
    alert("Escreva o nome de uma mídia!");
  } else if ((inputType)==="" && (inputStream)==="") {
    alert("Selecione um tipo de mídia e um aplicativo de streaming!");
  } else if ((inputType)==="") {
    alert("Selecione um tipo de mídia!");
  } else if ((inputStream)==="") {
    alert("Selecione um aplicativo de streaming!");
  } else {
    insertList(inputProduct, inputType, inputStream)
    postItem(inputProduct, inputType, inputStream)
    alert("Item adicionado!")
  }
}




/*
  --------------------------------------------------------------------------------------
  Função para inserir midias na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameProduct, type, stream) => {
  var item = [nameProduct, type, stream]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newType").value = "";
  document.getElementById("newStream").value = "";

  removeElement()
}