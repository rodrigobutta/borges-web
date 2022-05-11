import React from 'react';
import { Card, Table } from 'antd';

import Breadcrumb from 'components/Breadcrumb';

import FileUpload from 'components/FileUpload';

import { UuidLib } from 'libs';

const files = [
  { name: 'cartao-cnpj', key: 'cartao-cnpj', label: 'Cartão CNPJ' },
  {
    name: 'contrato-social',
    key: 'contrato-social',
    label: `Contrato Social e última alteração`,
  },
  {
    name: 'ultimo-balance',
    key: 'ultimo-balance',
    label: `Último Balanço Patrimonial`,
  },
  { name: 'dre', key: 'dre', label: `DRE` },
  { name: 'fluxo-de-caixa', key: '', label: `Demonstração de fluxo de caixa` },
  {
    name: 'declaracao-faturamento',
    label: `Declaração de faturamento assinada pelo contador`,
    key: 'declaracao-faturamento',
  },
  {
    name: 'procuracao-representantes',
    label: `Procuração dos representantes legais`,
    key: 'procuracao-representantes',
  },
  {
    name: 'autorizacao-scr',
    label: `Autorização de consulta SCR`,
    key: 'autorizacao-scr',
  },
  { name: 'outros-1', key: 'outros-1', label: `Outros 1` },
  { name: 'outros-2', key: 'outros-2', label: `Outros 2` },
];
// [
//   {
//     name: "dgi-certificate",
//     label: "Certificado DGI al Día",
//   },
//   {
//     name: "bps-certificate",
//     label: `Certificado BPS al Día`,
//   },
//   {
//     name: "legal-ci-1-front",
//     label: `Rep. Legal 1 - Cédula Identidad (Frente)`,
//   },
//   {
//     name: "legal-ci-1-back",
//     label: `Rep. Legal 1 - Cédula Identidad (Dorso)`,
//   },
//   {
//     name: "legal-ci-2-front",
//     label: `Rep. Legal 2 - Cédula Identidad (Frente)`,
//   },
//   {
//     name: "legal-ci-2-back",
//     label: `Rep. Legal 2 - Cédula Identidad (Dorso)`,
//   },
//   {
//     name: "account-balances",
//     label: `Balances Contables (Últimos 2 años)`,
//   },
//   {
//     name: "founds-projections",
//     label: `Flujos de Fondos Proyectados`,
//   },
//   {
//     name: "add-contract",
//     label: `Contrato de Adhesión`,
//   },
//   {
//     name: "social-contract",
//     label: `Contrato Social`,
//   },
//   {
//     name: "signing-powers",
//     label: `Poderes Firmante`,
//   },
//   {
//     name: "tax-sworn-declaration",
//     label: `Declaración Jurada Fiscal`,
//   },
// ];

function PreferencesFiles() {
  const routes = [{ to: '/preferences', label: 'Preferências' }, { label: 'Documentos' }];

  const [__cardKey, setCardKey] = React.useState(UuidLib.newId());

  const forceRefresh = React.useCallback(() => {
    setCardKey(UuidLib.newId());
  }, []);

  const columns = React.useMemo(() => {
    return [
      {
        title: 'Documentação Concessionaria',
        key: 'label',
        dataIndex: 'label',
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <FileUpload name={text} forceRefresh={forceRefresh} />,
      },
      {
        title: '',
        key: 'comment',
        dataIndex: 'comment',
      },
    ];
  }, [forceRefresh]);

  return (
    <Card key={__cardKey} title={<Breadcrumb routes={routes} />}>
      <Table columns={columns} dataSource={files} pagination={false} rowClassName={'row-document'} />
    </Card>
  );
}

export default PreferencesFiles;
