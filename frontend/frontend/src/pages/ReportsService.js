import React from 'react';
import styled from 'styled-components';

// Estilos CSS para a tabela e as linhas
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.isEven ? '#FFFFFF' : '#F2F2F2')};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
`;

const TableCell = styled.td`
  padding: 10px;
`;

// Componente da tabela
const TabelaServicos = ({ servicos }) => {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Placa</TableHeader>
          <TableHeader>Tipo de Serviço</TableHeader>
          <TableHeader>Preço</TableHeader>
          <TableHeader>Data do Serviço</TableHeader>
          <TableHeader>Descrição do Serviço</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {
        // servicos.map((servico, index) => (
        //   <TableRow key={index} isEven={index % 2 === 0}>
        //     <TableCell>{servico.placa}</TableCell>
        //     <TableCell>{servico.tipo}</TableCell>
        //     <TableCell>{servico.preco}</TableCell>
        //     <TableCell>{servico.data}</TableCell>
        //     <TableCell>{servico.descricao}</TableCell>
        //   </TableRow>
        // ))
        }
      </tbody>
    </Table>
  );
};

export default TabelaServicos;
