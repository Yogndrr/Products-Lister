import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  text-align: center;
  background-color: gray;
  color: white;
  font-size: 0.8rem;
  box-sizing: border-box;
`;

const Footer = () => {
    return (
        <FooterContainer>
            &copy; 2023 Ecommerce - All rights reserved
        </FooterContainer>
    )
};

export default Footer;
