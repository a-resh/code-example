/**
 *
 * AccountRewards
 *
 */
import React, {memo} from 'react';
import styled from 'styled-components/macro';
import {useTranslation} from 'react-i18next';

interface Props {
}

export const AccountRewards = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {t, i18n} = useTranslation();
    const values = [{totem: 'fox'}]
    return (
        <Div>
            <h1>{t('Pools and rewards')}</h1>
            <TableHeader>
              <IconColumn>
              </IconColumn>
              <TimeLeftColumn>
                <h3>{t('Time left')}</h3>
              </TimeLeftColumn>
              <StakeColumn>
                <h3>{t('Stake')}</h3>
              </StakeColumn>
              <YourPredictionColumn>
                <h3>{t('Your prediction')}</h3>
              </YourPredictionColumn>
              <ProjectedReturnsColumn>
                <h3>{t('Projected returns')}</h3>
              </ProjectedReturnsColumn>
              <ActualReturnsColumn>
                <h3>{t('Actual returns')}</h3>
              </ActualReturnsColumn>
              <RoiColumn>
                <h3>{t('ROI')}</h3>
              </RoiColumn>
              <ButtonsColumn>
              </ButtonsColumn>
            </TableHeader>
            <TableBody>
              { values.map( (value, index) =>
                (<TableRow key={index}>
                  <IconColumn>
                  </IconColumn>
                  <TimeLeftColumn>
                    <h3>{t('Time left')}</h3>
                  </TimeLeftColumn>
                  <StakeColumn>
                    <h3>{t('Stake')}</h3>
                  </StakeColumn>
                  <YourPredictionColumn>
                    <h3>{t('Your prediction')}</h3>
                  </YourPredictionColumn>
                  <ProjectedReturnsColumn>
                    <h3>{t('Projected returns')}</h3>
                  </ProjectedReturnsColumn>
                  <ActualReturnsColumn>
                    <h3>{t('Actual returns')}</h3>
                  </ActualReturnsColumn>
                  <RoiColumn>
                    <h3>{t('ROI')}</h3>
                  </RoiColumn>
                  <ButtonsColumn>
                  </ButtonsColumn>
                </TableRow>
              ))}
            </TableBody>
        </Div>
    );

});

const Div = styled.div`
  color: white;
  width: 820px;
  h1 {
    font-size: 50px;
    font-weight: 100;
    margin: 0 0 15px 0;
  }
  h3 {
    font-size: 15px;
    font-weight: 100;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  div {
    height: 30px;
  }
  h3 {
    margin: 0;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const TableRow = styled.div``;

const IconColumn = styled.div`
  border-right: 2px solid white;
  width: 70px;
`;
const TimeLeftColumn = styled.div`
  border-right: 2px solid white;
  width: 70px;
`;
const StakeColumn = styled.div`
  border-right: 2px solid white;
  width: 120px;
`;
const YourPredictionColumn = styled.div`
  border-right: 2px solid white;
  width: 120px;
`;
const ProjectedReturnsColumn = styled.div`
  border-right: 2px solid white;
  width: 120px;
`;
const ActualReturnsColumn = styled.div`
  border-right: 2px solid white;
  width: 120px;
`;
const RoiColumn = styled.div`
  border-right: 2px solid white;
  width: 90px;
`;
const ButtonsColumn = styled.div`
  width: 90px;
`;
