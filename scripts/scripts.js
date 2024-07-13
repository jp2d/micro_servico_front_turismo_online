/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/get_produtos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach(item => insertList(item.codigo, item.nome, item.tipo, item.valor, item.descricao))
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
  Função para popular um item da lista de acordo com o click no botão
  --------------------------------------------------------------------------------------
*/
const populateFields = (produto) => {
  
  // Obtém os elementos do formulário
  let idProduto = document.getElementById("id");
  let codigoProduto = document.getElementById("codigo");
  let nomeProduto = document.getElementById("nomeProduto");
  let tipoProduto = document.getElementById("tipoProduto");
  let valorProduto = document.getElementById("valorProduto");
  let descricaoProduto = document.getElementById("descricaoProduto");
  let cep = document.getElementById("cep");
  let endereco = document.getElementById("endereco");
  let numero = document.getElementById("numero");
  let complemento = document.getElementById("complemento");
  let localidade = document.getElementById("localidade");
  let uf = document.getElementById("uf");
  let bairro = document.getElementById("bairro");

  // Preenche os campos com os valores do produto
  idProduto.value = produto.id;
  codigoProduto.value = produto.codigo;
  nomeProduto.value = produto.nome;
  tipoProduto.value = produto.tipo;
  valorProduto.value = produto.valor;
  descricaoProduto.value = produto.descricao;
  cep.value = produto.cep;
  endereco.value = produto.logradouro;
  numero.value = produto.numero;
  complemento.value = produto.complemento;
  localidade.value = produto.localidade;
  uf.value = produto.uf; 
  bairro.value = produto.bairro;
}

const populateModal = (produto) => {
  
  // Obtém os elementos do formulário
  //let idProduto = document.getElementById("id");
  let codigoProduto = document.getElementById("codProduto");
  let nomeProduto = document.getElementById("nome");
  let tipoProduto = document.getElementById("tipo");
  let valorProduto = document.getElementById("valor");
  let descricaoProduto = document.getElementById("descricao");
  let cep = document.getElementById("cep");
  let endereco = document.getElementById("endereco");
  let localidade = document.getElementById("localidade");
  let uf = document.getElementById("uf");
  let bairro = document.getElementById("bairro");

  // Preenche os campos com os valores do produto
  //idProduto.value = produto.id;
  codigoProduto.value = produto.codigo;
  nomeProduto.value = produto.nome;
  tipoProduto.value = produto.tipo;
  valorProduto.value = produto.valor;
  descricaoProduto.value = produto.descricao;
  cep.value = produto.cep;
  endereco.value = produto.logradouro;
  localidade.value = produto.localidade;
  uf.value = produto.uf; 
  bairro.value = produto.bairro;

  var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {});
  myModal.show();
}

const populateAddress = (address) => {
  
  // Obtém os elementos do formulário
  let endereco = document.getElementById("endereco");
  let localidade = document.getElementById("localidade");
  let uf = document.getElementById("uf");
  let bairro = document.getElementById("bairro");

  // Preenche os campos com os valores
  endereco.value = address.logradouro;
  localidade.value = address.localidade;
  uf.value = address.uf; 
  bairro.value = address.bairro;
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a dados existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getProduct = async (codigo) => {
  let url = 'http://127.0.0.1:5000/get_produto?codigo=' + codigo;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      populateFields(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getProductDetail = async (codigo) => {
  let url = 'http://127.0.0.1:5000/get_produto?codigo=' + codigo;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      populateModal(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getAddress = async (cep) => {
  let url = 'http://127.0.0.1:5000/get_endereco?cep=' + cep;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      populateAddress(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduto, inputTipo, inputValor, inputDescricao, inputCep, inputEndereco, inputNumero, inputComplemento, inputBairro, inputLocalidade, inputUf) => {
  const formData = new FormData();
  formData.append('nome', inputProduto);
  formData.append('tipo', inputTipo);
  formData.append('valor', inputValor);
  formData.append('descricao', inputDescricao);
  formData.append('cep', inputCep);
  formData.append('logradouro', inputEndereco);
  formData.append('numero', inputNumero);
  formData.append('complemento', inputComplemento);
  formData.append('bairro', inputBairro);
  formData.append('localidade', inputLocalidade);
  formData.append('uf', inputUf);

  let url = 'http://127.0.0.1:5000/add_produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      insertList(data.codigo, data.nome, data.tipo, data.valor, data.descricao)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar um item na lista do servidor via requisição Put
  --------------------------------------------------------------------------------------
*/

const putItem = async (inputId, inputCodigo, inputProduto, inputTipo, inputValor, inputDescricao, inputCep, inputEndereco, inputNumero, inputComplemento, inputBairro, inputLocalidade, inputUf) => {
  const formData = new FormData();
  formData.append('id', inputId);
  formData.append('codigo', inputCodigo);
  formData.append('nome', inputProduto);
  formData.append('tipo', inputTipo);
  formData.append('valor', inputValor);
  formData.append('descricao', inputDescricao);
  formData.append('cep', inputCep);
  formData.append('logradouro', inputEndereco);
  formData.append('numero', inputNumero);
  formData.append('complemento', inputComplemento);
  formData.append('bairro', inputBairro);
  formData.append('localidade', inputLocalidade);
  formData.append('uf', inputUf);


  let url = 'http://127.0.0.1:5000/update_produto';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      updateList(data.codigo, data.nome, data.tipo, data.valor, data.descricao)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/

const insertButtonEdit = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("Edite");
  span.className = "edit btn btn-primary";
  span.appendChild(txt);
  parent.appendChild(span);
}

const insertButtonDelete = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("Delete");
  span.className = "close btn btn-danger";
  span.appendChild(txt);
  parent.appendChild(span);
}

const insertButtonDetail = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("Detalhe");
  span.className = "detail btn btn-info";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
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
  Função para ediar um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const editElement = () => {
  let edit = document.getElementsByClassName("edit");
  let i;
  for (i = 0; i < edit.length; i++) {
    edit[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      getProduct(nomeItem)
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para ediar um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const detailElement = () => {
  let detail = document.getElementsByClassName("detail");
  let i;
  for (i = 0; i < detail.length; i++) {
    detail[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      getProductDetail(nomeItem)
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/del_produto?codigo=' + item;
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
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let nomeProduto = document.getElementById("nomeProduto").value;
  let tipoProduto = document.getElementById("tipoProduto").value;
  let valorProduto = document.getElementById("valorProduto").value;
  let descricaoProduto = document.getElementById("descricaoProduto").value;
  let cep = document.getElementById("cep").value;
  let endereco = document.getElementById("endereco").value;
  let numero = document.getElementById("numero").value;
  let complemento = document.getElementById("complemento").value;
  let bairro = document.getElementById("bairro").value;
  let localidade = document.getElementById("localidade").value;
  let uf = document.getElementById("uf").value;
  

  if (nomeProduto === '') {
    alert("Forneça o nome do produto");
  } else if (tipoProduto === 'Selecione') {
    alert("Forneça o tipo do produto");
  } else if(isNaN(valorProduto) || valorProduto < 1){
    alert("Forneça um valor");
  }else {
    postItem(nomeProduto, tipoProduto, valorProduto, descricaoProduto, cep, endereco, numero, complemento, bairro, localidade, uf)
    alert("Item adicionado!");
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para editar um produto 
  --------------------------------------------------------------------------------------
*/
const updateItem = () => {
  let idProduto = document.getElementById("id").value;
  let codigoProduto = document.getElementById("codigo").value;
  let nomeProduto = document.getElementById("nomeProduto").value;
  let tipoProduto = document.getElementById("tipoProduto").value;
  let valorProduto = document.getElementById("valorProduto").value;
  let descricaoProduto = document.getElementById("descricaoProduto").value;
  let cep = document.getElementById("cep").value;
  let endereco = document.getElementById("endereco").value;
  let numero = document.getElementById("numero").value;
  let complemento = document.getElementById("complemento").value;
  let bairro = document.getElementById("bairro").value;
  let localidade = document.getElementById("localidade").value;
  let uf = document.getElementById("uf").value;

  if (isNaN(idProduto) || idProduto < 1){
    alert("Identificação doproduto inválida");
  }
  else if (codigoProduto === '') {
    alert("Codigo do produto inválido");
  }
  else if (nomeProduto === '') {
    alert("Forneça o nome do produto");
  } else if (tipoProduto === 'Selecione') {
    alert("Forneça o tipo do produto");
  } else if(isNaN(valorProduto) || valorProduto < 1){
    alert("Forneça um valor");
  }else {
    // insertList(nomeProduto, tipoProduto, valor, descricao)
    putItem(idProduto, codigoProduto, nomeProduto, tipoProduto, valorProduto, descricaoProduto, cep, endereco, numero, complemento, bairro, localidade, uf)
    alert("Item adicionado!");
  }
}

const save = () => {
  let codigoProduto = document.getElementById("codigo").value;
  
  if (codigoProduto === '')
  {
    newItem()
  }
  else
  {
    updateItem()
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (codigo, nome, tipo, valor, descricao) => {
  var item = [codigo, nome, tipo, valor, descricao]
  var table = document.getElementById('tableBody');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  
  insertButtonEdit(row.insertCell(-1))
  insertButtonDelete(row.insertCell(-1))
  limparInputs()

  
  editElement()
  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar items na lista apresentada
  --------------------------------------------------------------------------------------
*/

const updateList = (codigo, nome, tipo, valor, descricao) => {
  var table = document.getElementById('tableBody');
  for (var i = 0, row; row = table.rows[i]; i++) {
    // Itera sobre as linhas
    var col = row.cells[0]; // Ajuste o índice conforme necessário para sua tabela HTML
    if (col.textContent === codigo) {
      // Se o código corresponder, atualize a linha
      row.cells[1].textContent = nome;
      row.cells[2].textContent = tipo;
      row.cells[3].textContent = valor;
      row.cells[4].textContent = descricao;
      break; // Sai do loop após encontrar e atualizar a linha
    }
  }
  limparInputs()
}

const limparInputs = () => {
  // Seleciona todos os elementos de entrada
  const inputs = document.querySelectorAll('input');

  // Itera sobre cada elemento de entrada e limpa o valor
  inputs.forEach(input => {
    input.value = '';
  });
  
  document.getElementById("tipoProduto").value = "Selecione";
}