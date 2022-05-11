import { Col, Row, Tag } from 'antd';
import React from 'react';

interface UserProfileTagsProps {
  profiles: any;
  onClick: any;
}

export default function UserProfileTags({ profiles = [], onClick = null }: UserProfileTagsProps) {
  const handleProfileClick = (profile: any) => onClick && typeof onClick === 'function' && onClick(profile);

  const getProfileColor = (profile: any) => {
    switch (profile.accountId) {
      case 1:
        return 'cyan';
      case 2:
        return 'magenta';
      default:
        return 'blue';
    }
  };

  return (
    <>
      {profiles.map((p: any, ix: number) => (
        <Row key={ix} style={{ marginBottom: 4 }}>
          <Col span={24}>
            <Tag style={{ cursor: 'pointer' }} color={getProfileColor(p)} onClick={() => handleProfileClick(p)}>
              {p.name}
            </Tag>
          </Col>
        </Row>
      ))}
    </>
  );
}
