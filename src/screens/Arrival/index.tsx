import { useRoute } from "@react-navigation/native";
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { X } from "phosphor-react-native";

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>XXX0000</LicensePlate>

        <Label>Finalidade</Label>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          explicabo nulla sint quod, ducimus in voluptas, amet illum sequi
          delectus atque excepturi deserunt sunt ea. Facere pariatur possimus
          amet voluptatum!
        </Description>

        <Footer>
          <ButtonIcon icon={X} />
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
