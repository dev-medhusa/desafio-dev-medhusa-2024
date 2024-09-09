class RecintosZoo {
    constructor() {
      // Recintos existentes no zoológico
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
      ];
  
      this.animais = {
        'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
        'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
        'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
        'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
        'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
  
      if (isNaN(quantidade) || quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }

      const recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        let espacoOcupado = recinto.animais.reduce((total, { especie, quantidade }) => {
          const tamanho = this.animais[especie].tamanho;
          return total + tamanho * quantidade;
        }, 0);
        
  
        const possuiOutrasEspecies = recinto.animais.length > 0 && !recinto.animais.every(a => a.especie === animal);
        if (possuiOutrasEspecies) espacoOcupado += 1;
  
        const espacoNecessario = this.animais[animal].tamanho * quantidade;
        const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

        if (!this.animais[animal].biomas.includes(recinto.bioma) && !(recinto.bioma === 'savana e rio' && this.animais[animal].biomas.includes('savana'))) {
          continue;
        }
  
        if (this.animais[animal].carnivoro) {
          if (recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== animal)) {
            continue;
          }
        }
  
        if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
          continue;
        }
  
        if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) {
          continue;
        }
  
        if (espacoDisponivel >= espacoNecessario) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      if (recintosViaveis.length > 0) {
        return { recintosViaveis };
      } else {
        return { erro: 'Não há recinto viável' };
      }
    }
  }
  
  export { RecintosZoo as RecintosZoo };
