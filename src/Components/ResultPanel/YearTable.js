import React from 'react'
import { Table } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'
import NumberFormat from 'react-number-format';

function YearTable({ list }) {
    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th>Ano</th>
                    <th className="text-right">Valor Aplicado</th>
                    <th className="text-right">Valor Rendido</th>
                    <th className="text-right">% Rendido</th>
                    <th className="text-right">Saldo</th>
                </tr>
            </thead>
            <tbody>
                {list.map((v, i) =>
                    <tr key={i + 1}>
                        <td>{i + 1}</td>
                        <td className="text-right">
                            <Dinheiro valor={v.valorTotalAplicado} />
                        </td>
                        <td className="text-right">
                            <Dinheiro valor={v.valorTotalRendido} />
                        </td>
                        <td className="text-right">
                            <NumberFormat
                                value={v.percentualTotalRendido}
                                displayType={'text'}
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                            /> %
                        </td>
                        <td className="text-right">
                            <Dinheiro valor={v.saldo} />
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

function Dinheiro({ valor }) {
    return <CurrencyFormat
        value={valor}
        displayType={'text'}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale={true}
        prefix="R$ " />
}

export default YearTable