/**
 *
 * Menu
 *
 */
import React, {useState} from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from 'react-i18next';
import {MenuButton} from './MenuButton';
import {TotemsData} from "../../../types/enums";

interface Props {
    isMobile: boolean;
    isLogin?: boolean;
}

export const Menu = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {t, i18n} = useTranslation();
    const pathname = new URL(document.location.href).pathname;
    const urn = pathname && pathname !== '/' ? pathname.substr(1) : 'fox';
    const [active, setActive] = useState(urn);
    let menuValues = Object.keys(TotemsData);
    console.log(active)
    if (!props.isLogin) {
        menuValues = menuValues.filter(v => v !== 'USER');
    }
    return (
        <Div>
            <ButtonsContainer {...props}>
                {menuValues.map((v, index) => (
                    <MenuButton key={index} name={v} isActive={active === v.toLowerCase()} setActive={setActive}/>
                ))}
            </ButtonsContainer>
            {t('')}
            {/*  {t(...messages.someThing)}  */}
        </Div>
    );
};

const Div = styled.div``;

const ButtonsContainer = styled.div<Props>`
  height: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
  };
`;
