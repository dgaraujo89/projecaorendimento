import React, { useState } from 'react'
import { Button, Card, Col, Form, Alert } from 'react-bootstrap';
import { PlusCircle, XOctagon } from 'react-bootstrap-icons';
import ResultPanel from '../ResultPanel';

import calcular from '../../Services/ProjetaRendimento'

const retiradaInitialValue = {
    valor: 0,
    ano: 0,
    mes: 0,
    ajustaTaxa: false,
    novaTaxa: 0.0
};

const initialValues = {
    capitalInicial: 1000,
    valorAplicacaoMensal: 1000,
    tempoAplicacao: 20,
    tempoContribuicao: 20,
    taxaRendimento: 1.1,
    inflacao: 3.7,
    retiradas: []
};

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function PanelConfig() {
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [result, setResult] = useState({ anos: null, meses: null });
    const [message, setMessage] = useState("");
    const [listaAnos, setListaAnos] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        setResult(calcular({
            capitalInicial: values.capitalInicial,
            valorAplicacaoMensal: values.valorAplicacaoMensal,
            periodoAplicacao: values.tempoAplicacao,
            tempoAplicacaoMensal: values.tempoContribuicao,
            taxa: values.taxaRendimento,
            retiradas: values.retiradas,
            inflacao: values.inflacao
        }));
    };

    const handleChangeTempoAplicacao = (e) => {
        var tempo = parseInt(e.target.value);

        var listaAnos = [];
        for(var i=1; i <= tempo; i++) {
            listaAnos.push(i);
        }

        setListaAnos(listaAnos)
        setValues({ ...values, tempoAplicacao: tempo})
    }

    const handleAdicionaRetirada = () => {
        if(values.tempoAplicacao <= 0) {
            setMessage("Você deve informar o tempo da aplicação.");

            setTimeout(() => setMessage(""), 10000);

            return;
        }

        values.retiradas.push({ ...retiradaInitialValue });

        setValues({ ...values });
    }

    const handleChangeRetiradas = (index, prop, value) => {
        values.retiradas[index][prop] = value;
        setValues({ ...values });
    };

    const handleRemoveRetirada = (index) => {
        values.retiradas = values.retiradas.filter((_, i) => i != index);
        setValues({ ...values });
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Configurações</Card.Title>
                    <Card.Text>
                        <Alert show={message.length > 0} variant="danger">{message}</Alert>

                        <Form validated={validated} onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Capital Inicial</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        required
                                        value={values.capitalInicial}
                                        onChange={(e) => setValues({ ...values, capitalInicial: parseInt(e.target.value) })} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Valor Aplicação Mensal</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        required
                                        value={values.valorAplicacaoMensal}
                                        onChange={(e) => setValues({ ...values, valorAplicacaoMensal: parseInt(e.target.value) })} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Tempo da Aplicação (anos)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        required
                                        value={values.tempoAplicacao}
                                        onChange={handleChangeTempoAplicacao} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Tempo Contribuição (anos)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        required
                                        value={values.tempoContribuicao}
                                        onChange={(e) => setValues({ ...values, tempoContribuicao: parseInt(e.target.value) })} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Taxa Rendimento (% ano)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        max="100"
                                        min="0"
                                        required
                                        step=".01"
                                        value={values.taxaRendimento}
                                        onChange={(e) => setValues({ ...values, taxaRendimento: parseFloat(e.target.value.replace(',', '.')) })} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Inflação (% ano)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        max="100"
                                        min="0"
                                        required
                                        step=".01"
                                        value={values.inflacao}
                                        onChange={(e) => setValues({ ...values, inflacao: parseFloat(e.target.value.replace(',', '.')) })} />
                                        <Form.Text className="text-muted">
                                            Utilizado para calcular o valor de reajuste na aplicação mensal.
                                        </Form.Text>
                                </Form.Group>
                            </Form.Row>

                            <hr />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h5>Retiradas</h5>
                                <Button type="button" onClick={handleAdicionaRetirada}>
                                    Adicionar <PlusCircle />
                                </Button>
                            </div>

                            <hr />

                            {values.retiradas.map((r, index) =>
                                <Form.Row key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Group as={Col}>
                                        <Form.Label>Valor</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            required
                                            value={r.valor}
                                            onChange={e => handleChangeRetiradas(index, 'valor', parseInt(e.target.value))} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Mês</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            onChange={e => handleChangeRetiradas(index, 'mes', parseInt(e.target.value) + 1)}>
                                                {meses.map((mes, index) => <option value={index} selected={r.mes - 1 == index}>{mes}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Ano</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            onChange={e => handleChangeRetiradas(index, 'ano', parseInt(e.target.value) - 1)}>
                                                {listaAnos.map(ano => <option value={ano} selected={r.ano === ano - 1}>{ano}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Ajustar a taxa de rendimento?</Form.Label>
                                        <div className="form-control" style={{ border: 0 }}>
                                            <Form.Check
                                                type="radio"
                                                inline
                                                label="Sim"
                                                checked={r.ajustaTaxa}
                                                onClick={e => handleChangeRetiradas(index, 'ajustaTaxa', true)} />
                                            <Form.Check
                                                type="radio"
                                                inline
                                                label="Não"
                                                checked={!r.ajustaTaxa}
                                                onClick={e => handleChangeRetiradas(index, 'ajustaTaxa', false)} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Taxa de rendimento (% ano)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            max="100"
                                            min="0"
                                            required
                                            step=".01"
                                            value={r.novaTaxa}
                                            disabled={!r.ajustaTaxa}
                                            onChange={e => handleChangeRetiradas(index, 'novaTaxa', parseFloat(e.target.value.replace(',', '.')))} />
                                    </Form.Group>
                                    <Button
                                        variant="danger"
                                        type="button"
                                        size="sm"
                                        style={{ marginLeft: '20px', marginTop: '10px' }}
                                        onClick={() => handleRemoveRetirada(index)}>
                                        <XOctagon />
                                    </Button>
                                </Form.Row>
                            )}

                            <Button type="submit">Calcular</Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>

            <ResultPanel
                anos={result.anos}
                meses={result.meses} />
        </>
    )
}

export default PanelConfig;
