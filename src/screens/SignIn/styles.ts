import styled from "styled-components/native";
import { theme } from "../../theme";

export const Container = styled.ImageBackground`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 52px;
    background-color: ${theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
    color: ${theme.COLORS.BRAND_LIGHT};
    font-size: ${theme.FONT_SIZE.XXXL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    align-items: center;
`

export const Slogan = styled.Text`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    align-items: center;

    margin-bottom: 32px;
`