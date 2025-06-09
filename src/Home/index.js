import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [resposta, setResposta] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [corDeFundoCategoria, setCorDeFundoCategoria] = useState("");
  const [corDeFundoResposta, setCorDeResposta] = useState("");
  const [imc, setImc] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  function calcularImc(altura, peso) {
    const converterParaCm = altura / 100;
    const imc = peso / (converterParaCm * converterParaCm);

    setImc(imc.toFixed(1));
    setResposta(true);

    if (imc < 18.5) {
      setCategoria("Abaixo do peso");
      setCorDeResposta("#3b82f6");
      setCorDeFundoCategoria("#629bf8");
      setMensagem(
        "Abaixo do peso. Você está abaixo do peso ideal. Considere procurar um nutricionista para orientação."
      );
    } else if (imc >= 18.5 && imc < 24.9) {
      setCategoria("Peso Normal");
      setCorDeResposta("#22C55E");
      setCorDeFundoCategoria("#4ED17E");
      setMensagem(
        "Peso normal. Parabéns, você está com o peso ideal! Continue mantendo hábitos saudáveis."
      );
    }

    setAltura("");
    setPeso("");
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
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
