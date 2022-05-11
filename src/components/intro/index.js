import { Col, Row } from 'antd';
import logo from '../../images/img/logoDealers.svg';
import img from '../../images/img/img-intro.png';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Demo() {
  return (
    <div className='intro'>
      <Row style={{ paddingTop: 20 }}>
        <Col lg={8} sm={0} xs={0}>
          <div className='centered'>
            <p>Blogging as a developer, done right!</p>
          </div>
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <div className='logo'>
            <img src={logo} />
          </div>
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <div className='register_and_login'>
            <div>
              <Link to='/login'>
                <a className='button_transparent'>Login</a>
              </Link>
            </div>
            <div>
              <a className='signup'>Criar uma conta</a>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={24} xs={24}>
          <div className='container-description'>
            <h1 className='intro-title'>Ajude a manter um ao outro seguro</h1>
            <p className='intro-p'>
              Ajudamos você a expandir seu negócio através de planos de gestão sólida e aumentando sua experiência de
              atendimento ao cliente para aumentar alcance de marketing e vendas. Tudo com a ajuda de tecnologia que
              garante excelentes resultados!
            </p>
            <button className='intro-button'>Saiba mais</button>
          </div>
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <div style={{ marginTop: 36 }}>
            <img className='img-intro' src={img} width='100%' />
          </div>
        </Col>
      </Row>
    </div>
  );
}
