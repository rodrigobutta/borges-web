import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const _Breadcrumb = ({ routes }: any) => {
  return (
    <Breadcrumb>
      {routes.map((r: any) => {
        if (r.to) {
          return (
            <Breadcrumb.Item key={r.label}>
              <Link to={r.to}>{r.label}</Link>
            </Breadcrumb.Item>
          );
        } else {
          return <Breadcrumb.Item key={r.label}>{r.label}</Breadcrumb.Item>;
        }
      })}
    </Breadcrumb>
  );
};
export default _Breadcrumb;
