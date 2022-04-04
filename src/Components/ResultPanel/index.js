import React from 'react'
import { Card, Tabs } from 'react-bootstrap';
import YearTable from './YearTable';
import MonthTable from './MonthTable';
import { Tab } from 'bootstrap';
import ChartLine from '../Charts/Line';

function ResultPanel({ anos, meses }) {
    if (anos == null) {
        return <></>;
    }

    const profitChartData = [];

    anos.forEach((e, i) => {
        profitChartData.push({
            year: (i + 1),
            contribution: e.valorTotalAplicado,
            evolution:  Math.round(e.saldo)
        });
    });

    return (
        <div style={{ marginTop: '20px' }}>
            <Tabs defaultActiveKey="anual" id="result">
                <Tab eventKey="charts" title="Projeção Gráfica">
                    <Card>
                        <Card.Body>
                            <ChartLine data={profitChartData} show={true} />
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="anual" title="Projeção Anual">
                    <Card>
                        <Card.Body>
                            <YearTable list={anos} />
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="mensal" title="Projeção Mensal">
                    <Card>
                        <Card.Body>
                            <MonthTable list={meses} />
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}

export default ResultPanel;