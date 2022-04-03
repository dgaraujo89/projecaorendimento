import React from 'react'
import { Table } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'
import NumberFormat from 'react-number-format';

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function MonthTable({ list }) {

    const calcAno = (mes) => {
        return Math.ceil(mes / 12);
    }

    const calcMes = (mes) => {
        return (mes % 12) == 0 ? 12 : (mes % 12);
    }

    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th className="text-left">Ano</th>
                    <th className="text-left">Mês</th>
                    <th className="text-right">Valor Aplicado no mês</th>
                    <th className="text-right">Taxa</th>
                    <th className="text-right">Rendimento</th>
                    <th className="text-right">Valor Total Aplicado</th>
                    <th className="text-right">Valor Total Rendido</th>
                    <th className="text-right">% Total Rendido</th>
                    <th className="text-right">Saldo</th>
                </tr>
            </thead>
            <tbody>
                {list.map((v, i) =>
                    <tr key={i + 1}>
                        <td className="text-left">{calcAno(i + 1)}</td>
                        <td className="text-left">{meses[calcMes(i + 1) - 1]}</td>
                        <td className="text-right">
                            <Dinheiro valor={v.valorAplicadoMes} />
                        </td>
                        <td className="text-right">
                            <NumberFormat
                                value={v.taxa}
                                displayType={'text'}
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                            /> %
                        </td>
                        <td className="text-right">
                            <Dinheiro valor={v.rendimento} />
                        </td>
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

export default MonthTable