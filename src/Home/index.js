import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// chamando a imagem
import capa from "../../assets/capa.jpg";

export default function Home() {
  const [resposta, setResposta] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [corDeFundoCategoria, setCorDeFundoCategoria] = useState("");
  const [corDeFundoResposta, setCorDeFundoResposta] = useState("");
  const [imc, setImc] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  function calcularImc(altura, peso) {
    if (!peso || !altura || isNaN(altura) || isNaN(peso)) {
      alert("insira todos os dados corretamente");
      return;
    }

    const converterParaCm = altura / 100;
    const formulaimc = peso / (converterParaCm * converterParaCm);

    setImc(formulaimc.toFixed(1));
    setResposta(true);

    if (formulaimc < 18.5) {
      setCategoria("Abaixo do peso");
      setCorDeFundoResposta("#3b82f6");
      setCorDeFundoCategoria("#629bf8");
      setMensagem(
        "Abaixo do peso. Você está abaixo do peso ideal. Considere procurar um nutricionista para orientação."
      );
    } else if (formulaimc >= 18.5 && formulaimc < 24.9) {
      setCategoria("Peso Normal");
      setCorDeFundoResposta("#22C55E");
      setCorDeFundoCategoria("#4ED17E");
      setMensagem(
        "Peso normal. Parabéns, você está com o peso ideal! Continue mantendo hábitos saudáveis."
      );
    } else if (formulaimc >= 30.0 && formulaimc <= 34.9) {
      setCategoria("Excesso de peso");
      setCorDeFundoResposta("#EAB308");
      setCorDeFundoCategoria("#FDE68A");
      setMensagem(
        "Você esta acima do peso ideal. Uma reedução alimentar e atividade fisica podem ajudar."
      );
    } else if (formulaimc >= 30.0 && formulaimc <= 34.9) {
      setCategoria("Obesidade classe 1");
      setCorDeFundoResposta("#F97316");
      setCorDeFundoCategoria("#FDBA74");
      setMensagem(
        "Nivel de obesidade inicial. É importante procurar orientação médica e nutricional."
      );
    } else if (formulaimc >= 35.0 && formulaimc <= 39.0) {
      setCategoria("Obesidade classe 2");
      setCorDeFundoResposta("#EF4444");
      setCorDeFundoCategoria("#FCA5A5");
      setMensagem(
        "Obessidade moderada. Procure acompanhamento médico para cuidar da saúde"
      );
    } else {
      setCategoria("Obesidade classe 3");
      setCorDeFundoResposta("#B91C1C");
      setCorDeFundoCategoria("#FCA5A5");
      setMensagem(
        "Obesidade grave. É essencial procurar acompanhamento médico com urgência."
      );
    }

    setAltura("");
    setPeso("");
  }

  return (
    <ImageBackground
      style={styles.capaDeFundo}
      resizeMode="cover"
      source={capa}
    >
      <View style={styles.container}>
        <View style={styles.caixa}>
          <Text style={styles.titulo}>Calculadora de IMC</Text>

          <Text style={styles.subtitulo}>
            Insira seus dados para calcular seu Índice de Massa Corporal. Gênero
          </Text>

          <View style={styles.formulario}>
            <View>
              <Text>Altura</Text>
              <TextInput
                value={altura}
                onChangeText={setAltura}
                style={styles.campo}
                placeholder="cm"
              ></TextInput>
            </View>
            <View>
              <Text>Peso</Text>
              <TextInput
                value={peso}
                onChangeText={setPeso}
                style={styles.campo}
                placeholder="kg"
              ></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => calcularImc(Number(altura), Number(peso))}
              style={styles.botao}
            >
              <Text style={styles.texto}>Calcular IMC</Text>
            </TouchableOpacity>
          </View>

          {resposta && (
            <View
              style={[styles.resposta, { backgroundColor: corDeFundoResposta }]}
            >
              <Text style={styles.tituloImc}>Seu IMC é: </Text>
              <Text style={styles.calculo}>{imc}</Text>
              <Text
                style={[
                  styles.categoria,
                  { backgroundColor: corDeFundoCategoria },
                ]}
              >
                {categoria}
              </Text>
            </View>
          )}
          <Text style={styles.mensagem}>{mensagem}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  capaDeFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
  },

  caixa: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 4,
  },

  subtitulo: {
    textAlign: "center",
    color: "gray",
    fontWeight: "semibold",
    lineHeight: 20,
  },

  formulario: {
    gap: 10,
  },

  campo: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 4,
    width: "100%",
  },

  botao: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  resposta: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginTop: 20,
    padding: 40,
    borderRadius: 12,
  },

  calculo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },

  categoria: {
    backgroundColor: "",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },

  tituloImc: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },

  mensagem: {
    color: "#444",
    lineHeight: 24,
    marginTop: 12,
    textAlign: "center",
    fontSize: 18,
  },
});
