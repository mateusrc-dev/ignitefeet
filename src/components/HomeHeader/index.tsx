import { Container, Greeting, Message, Name } from "./styles";
import { TouchableOpacity } from "react-native";
import { Power } from "phosphor-react-native";
import { theme } from "../../theme";

export function HomeHeader() {
  return (
    <Container>
      <Greeting>
        <Message>Olá</Message>
        <Name>Mateus Raimundo</Name>
      </Greeting>

      <TouchableOpacity>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
