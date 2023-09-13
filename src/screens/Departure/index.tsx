import { TextInput, ScrollView, Alert } from "react-native";
import { useUser } from "@realm/react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlaceInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Container, Content, Message } from "./styles";
import { useEffect, useRef, useState } from "react";
import { licensePlateValidate } from "../../utils/licensePlateValidate";
import { useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForegroundPermissions } from "expo-location";

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const [locationForegroundPermission, requestForegroundPermission] =
    useForegroundPermissions();

  const { goBack } = useNavigation();
  const realm = useRealm();
  const user = useUser();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert(
          "Placa inválida",
          "A placa é inválida. Por favor, informe a placa correta do veículo."
        );
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert(
          "Finalidade",
          "Por favor, informe a finalidade da utilização do veículo."
        );
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            description,
            license_plate: licensePlate.toUpperCase(),
            user_id: user!.id,
          })
        );
      });

      Alert.alert("Saída", "Saída do veículo registrada com sucesso!");
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível registrar a saída do veículo.");
      setIsRegistering(false);
    }
  }

  useEffect(() => {
    requestForegroundPermission();
  }, []);

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          utilizar essa funcionalidade, por favor, acesse as configurações do
          seu dispositivo para conceder essa permissão ao aplicativo.
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
