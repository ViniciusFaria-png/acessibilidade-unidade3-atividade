(function() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  const resumoErros = document.getElementById('resumo-erros');
  const listaResumoErros = document.getElementById('lista-resumo-erros');
  const textoResumoErros = document.getElementById('texto-resumo-erros');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');
  const honeypot = document.getElementById('website-honeypot');

  let tentativaEnvioRealizada = false;

  function validarCPF(valor) {
    const limpo = valor.replace(/\D/g, '');
    if (limpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(limpo)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += Number.parseInt(limpo.charAt(i), 10) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== Number.parseInt(limpo.charAt(9), 10)) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += Number.parseInt(limpo.charAt(i), 10) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    return resto === Number.parseInt(limpo.charAt(10), 10);
  }

  const definicoesCampos = [
    {
      chave: 'nome',
      rotulo: 'Nome completo',
      elemento: document.getElementById('nome'),
      alvoAncoraId: 'nome',
      dicaId: 'dica-nome',
      erroId: 'erro-nome',
      validar: function() {
        const val = document.getElementById('nome').value.trim();
        if (!val) return 'Informe seu nome completo.';
        if (/\d/.test(val)) return 'Não pode haver números';
        if (val.length < 3 || !val.includes(' ')) {
          return 'Informe seu nome e sobrenome completos.';
        }
        return '';
      }
    },
    {
      chave: 'email',
      rotulo: 'E-mail',
      elemento: document.getElementById('email'),
      alvoAncoraId: 'email',
      dicaId: 'dica-email',
      erroId: 'erro-email',
      validar: function() {
        const val = document.getElementById('email').value.trim();
        if (!val) return 'Informe seu endereço de e-mail.';
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(val)) {
          return 'E-mail inválido. Use o formato seuemail@dominio.com.';
        }
        return '';
      }
    },
    {
      chave: 'cpf',
      rotulo: 'CPF',
      elemento: document.getElementById('cpf'),
      alvoAncoraId: 'cpf',
      dicaId: 'dica-cpf',
      erroId: 'erro-cpf',
      validar: function() {
        const val = document.getElementById('cpf').value.trim();
        if (!val) return 'Informe seu CPF.';
        const formatoAceito = /^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/;
        if (!formatoAceito.test(val)) {
          return 'Formato de CPF inválido. Digite no formato 000.000.000-00 ou 11 números.';
        }
        if (!validarCPF(val)) {
          return 'CPF inválido. Verifique os dígitos informados.';
        }
        return '';
      }
    },
    {
      chave: 'nascimento',
      rotulo: 'Data de nascimento',
      elemento: document.getElementById('nascimento'),
      alvoAncoraId: 'nascimento',
      dicaId: 'dica-nascimento',
      erroId: 'erro-nascimento',
      validar: function() {
        const val = document.getElementById('nascimento').value;
        if (!val) return 'Informe sua data de nascimento.';
        const dataNasc = new Date(val + 'T00:00:00');
        const hoje = new Date();
        if (Number.isNaN(dataNasc.getTime()) || dataNasc > hoje) {
          return 'Informe uma data de nascimento válida no passado.';
        }
        const anoMinimo = 1900;
        if (dataNasc.getFullYear() < anoMinimo) {
          return 'Informe um ano de nascimento a partir de 1900.';
        }
        return '';
      }
    },
    {
      chave: 'telefone',
      rotulo: 'Telefone',
      elemento: document.getElementById('telefone'),
      alvoAncoraId: 'telefone',
      dicaId: 'dica-telefone',
      erroId: 'erro-telefone',
      validar: function() {
        const val = document.getElementById('telefone').value.trim();
        if (!val) return '';
        const regexTel = /^(\(\d{2}\)\s?\d{4,5}-?\d{4}|\d{10,11})$/;
        if (!regexTel.test(val)) {
          return 'Telefone inválido. Informe com DDD no formato (00) 00000-0000.';
        }
        return '';
      }
    },
    {
      chave: 'senha',
      rotulo: 'Senha',
      elemento: document.getElementById('senha'),
      alvoAncoraId: 'senha',
      dicaId: 'dica-senha',
      erroId: 'erro-senha',
      validar: function() {
        const val = document.getElementById('senha').value;
        if (!val) return 'Crie uma senha para sua conta.';
        if (val.length < 8) {
          return 'A senha deve ter no mínimo 8 caracteres.';
        }
        if (!/[A-Z]/.test(val) || !/[a-z]/.test(val) || !/\d/.test(val)) {
          return 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.';
        }
        return '';
      }
    },
    {
      chave: 'confirmar-senha',
      rotulo: 'Confirmação de senha',
      elemento: document.getElementById('confirmar-senha'),
      alvoAncoraId: 'confirmar-senha',
      dicaId: 'dica-confirmar-senha',
      erroId: 'erro-confirmar-senha',
      validar: function() {
        const val = document.getElementById('confirmar-senha').value;
        const senha = document.getElementById('senha').value;
        if (!val) return 'Confirme sua senha.';
        if (val !== senha) {
          return 'A confirmação de senha não coincide com a senha digitada.';
        }
        return '';
      }
    },
    {
      chave: 'genero',
      rotulo: 'Gênero',
      elemento: document.getElementById('grupo-genero'),
      alvoAncoraId: 'genero-feminino',
      dicaId: 'dica-genero',
      erroId: 'erro-genero',
      ehGrupo: true,
      seletorInputs: 'input[name="genero"]',
      validar: function() {
        const selecionado = document.querySelector('input[name="genero"]:checked');
        if (!selecionado) return 'Selecione uma opção de gênero.';
        return '';
      }
    },
    {
      chave: 'interesses',
      rotulo: 'Interesses musicais',
      elemento: document.getElementById('grupo-interesses'),
      alvoAncoraId: 'interesse-guitarras',
      dicaId: 'dica-interesses',
      erroId: 'erro-interesses',
      ehGrupo: true,
      seletorInputs: 'input[name="interesses"]',
      validar: function() {
        const marcados = document.querySelectorAll('input[name="interesses"]:checked');
        if (marcados.length === 0) {
          return 'Selecione pelo menos um interesse musical.';
        }
        return '';
      }
    },
    {
      chave: 'como-conheceu',
      rotulo: 'Como conheceu o site',
      elemento: document.getElementById('como-conheceu'),
      alvoAncoraId: 'como-conheceu',
      dicaId: 'dica-como-conheceu',
      erroId: 'erro-como-conheceu',
      validar: function() {
        const val = document.getElementById('como-conheceu').value;
        if (!val) return 'Selecione como você conheceu o site.';
        return '';
      }
    },
    {
      chave: 'termos',
      rotulo: 'Aceite dos termos',
      elemento: document.getElementById('termos'),
      alvoAncoraId: 'termos',
      dicaId: 'dica-termos',
      erroId: 'erro-termos',
      validar: function() {
        const marcado = document.getElementById('termos').checked;
        if (!marcado) {
          return 'Você precisa aceitar os termos de uso e privacidade para continuar.';
        }
        return '';
      }
    }
  ];

  function atualizarEstadoCampo(def, mensagemErro) {
    const elErro = document.getElementById(def.erroId);
    const temErro = Boolean(mensagemErro);

    if (temErro) {
      elErro.textContent = mensagemErro;
      elErro.hidden = false;
      def.elemento.setAttribute('aria-invalid', 'true');
      def.elemento.setAttribute('aria-describedby', def.dicaId + ' ' + def.erroId);
      if (def.ehGrupo) {
        document.querySelectorAll(def.seletorInputs).forEach(function(inp) {
          inp.setAttribute('aria-invalid', 'true');
          inp.setAttribute('aria-describedby', def.erroId);
        });
      }
    } else {
      elErro.textContent = '';
      elErro.hidden = true;
      def.elemento.removeAttribute('aria-invalid');
      def.elemento.setAttribute('aria-describedby', def.dicaId);
      if (def.ehGrupo) {
        document.querySelectorAll(def.seletorInputs).forEach(function(inp) {
          inp.removeAttribute('aria-invalid');
          inp.removeAttribute('aria-describedby');
        });
      }
    }
    return !temErro;
  }

  function atualizarResumoErros(focarResumo) {
    if (!tentativaEnvioRealizada) return;

    const errosAtuais = [];
    definicoesCampos.forEach(function(def) {
      const elErro = document.getElementById(def.erroId);
      if (!elErro.hidden && elErro.textContent) {
        errosAtuais.push({
          rotulo: def.rotulo,
          mensagem: elErro.textContent,
          alvoId: def.alvoAncoraId
        });
      }
    });

    listaResumoErros.innerHTML = '';

    if (errosAtuais.length > 0) {
      textoResumoErros.textContent =
        errosAtuais.length === 1
          ? 'Foi encontrado 1 erro no formulário. Use o link abaixo para ir diretamente ao campo:'
          : 'Foram encontrados ' + errosAtuais.length + ' erros no formulário. Use os links abaixo para ir diretamente a cada campo:';

      errosAtuais.forEach(function(item) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + item.alvoId;
        link.textContent = item.rotulo + ': ' + item.mensagem;
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const alvo = document.getElementById(item.alvoId);
          if (alvo) {
            alvo.focus();
            alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        li.appendChild(link);
        listaResumoErros.appendChild(li);
      });

      resumoErros.hidden = false;
      if (focarResumo) {
        resumoErros.focus();
      }
    } else {
      resumoErros.hidden = true;
    }
  }

  definicoesCampos.forEach(function(def) {
    if (def.ehGrupo) {
      const inputs = document.querySelectorAll(def.seletorInputs);
      inputs.forEach(function(inp) {
        inp.addEventListener('change', function() {
          const msg = def.validar();
          atualizarEstadoCampo(def, msg);
          atualizarResumoErros(false);
        });
        inp.addEventListener('blur', function() {
          setTimeout(function() {
            if (!def.elemento.contains(document.activeElement)) {
              const msg = def.validar();
              atualizarEstadoCampo(def, msg);
              atualizarResumoErros(false);
            }
          }, 10);
        });
      });
    } else {
      def.elemento.addEventListener('blur', function() {
        const msg = def.validar();
        atualizarEstadoCampo(def, msg);
        if (def.chave === 'senha') {
          const defConfirmar = definicoesCampos.find(function(d) { return d.chave === 'confirmar-senha'; });
          if (defConfirmar && defConfirmar.elemento.value) {
            atualizarEstadoCampo(defConfirmar, defConfirmar.validar());
          }
        }
        atualizarResumoErros(false);
      });

      const eventoTempoReal = def.elemento.tagName === 'SELECT' || def.elemento.type === 'checkbox' ? 'change' : 'input';
      def.elemento.addEventListener(eventoTempoReal, function() {
        const elErro = document.getElementById(def.erroId);
        if (!elErro.hidden || tentativaEnvioRealizada) {
          const msg = def.validar();
          atualizarEstadoCampo(def, msg);
          atualizarResumoErros(false);
        }
        if (def.chave === 'senha') {
          const defConfirmar = definicoesCampos.find(function(d) { return d.chave === 'confirmar-senha'; });
          const erroConfirmar = document.getElementById(defConfirmar.erroId);
          if (!erroConfirmar.hidden && defConfirmar.elemento.value) {
            atualizarEstadoCampo(defConfirmar, defConfirmar.validar());
            atualizarResumoErros(false);
          }
        }
      });
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    mensagemSucesso.hidden = true;

    if (honeypot && honeypot.value.trim() !== '') {
      return;
    }

    tentativaEnvioRealizada = true;
    let formularioValido = true;

    definicoesCampos.forEach(function(def) {
      const msg = def.validar();
      const valido = atualizarEstadoCampo(def, msg);
      if (!valido) {
        formularioValido = false;
      }
    });

    if (!formularioValido) {
      atualizarResumoErros(true);
    } else {
      resumoErros.hidden = true;
      mensagemSucesso.hidden = false;
      mensagemSucesso.focus();
      form.reset();
      tentativaEnvioRealizada = false;
      definicoesCampos.forEach(function(def) {
        atualizarEstadoCampo(def, '');
      });
    }
  });
})();

