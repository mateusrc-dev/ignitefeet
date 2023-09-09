import { TextInput } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlaceInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Container, Content } from "./styles";
import { useRef } from "react";

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log("ok!");
  }

  return (
    <Container>
      <Header title="Saída" />
      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA1234"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          returnKeyType="next"
        />

        <TextAreaInput
          ref={descriptionRef}
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
          onSubmitEditing={handleDepartureRegister}
          returnKeyType="send"
          blurOnSubmit
        />

        <Button title="Registrar Saída" onPress={handleDepartureRegister} />
      </Content>
    </Container>
  );
}
